'use strict';

const OSS = require('ali-oss');

const DEFAULT_MESSAGES = [
  {
    id: 'seed-message-1',
    name: '榴莲编辑部',
    body: '欢迎来到隐藏果园。现在这块留言板已经可以从云端读取,像挂在同一棵树上的便签。',
    createdAt: '2026-05-06T00:00:00.000Z',
  },
  {
    id: 'seed-message-2',
    name: '一颗会发光的果核',
    body: '如果你看见这块板,说明你已经在旧标本纸上看见那句很小的暗语。请把你的祝福、吐槽、下一版 demo 愿望留在这里。',
    createdAt: '2026-05-06T00:01:00.000Z',
  },
];

const MAX_MESSAGES = Number(process.env.MAX_MESSAGES || 80);
const MAX_NAME_LENGTH = Number(process.env.MAX_NAME_LENGTH || 20);
const MAX_BODY_LENGTH = Number(process.env.MAX_BODY_LENGTH || 180);
const OBJECT_KEY = process.env.OSS_OBJECT_KEY || 'durian-hackathon-gallery/secret-grove/messages.json';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'https://paofuxiaomiao.github.io,http://localhost:3000,http://127.0.0.1:3000')
  .split(',')
  .map((item) => item.trim())
  .filter(Boolean);

let ossClient;

function createId() {
  if (globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }
  return `grove-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getOrigin(request) {
  return request.headers?.origin || request.headers?.Origin || '';
}

function getAllowedOrigin(request) {
  const origin = getOrigin(request);
  if (origin && ALLOWED_ORIGINS.includes(origin)) return origin;
  return ALLOWED_ORIGINS[0] || '*';
}

function setCors(request, response) {
  response.setHeader('Access-Control-Allow-Origin', getAllowedOrigin(request));
  response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  response.setHeader('Vary', 'Origin');
}

function sendJson(request, response, statusCode, payload) {
  setCors(request, response);
  response.setStatusCode(statusCode);
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.send(JSON.stringify(payload));
}

function getClient() {
  if (ossClient) return ossClient;

  const region = process.env.OSS_REGION;
  const bucket = process.env.OSS_BUCKET;
  const accessKeyId = process.env.OSS_ACCESS_KEY_ID || process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
  const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET || process.env.ALIBABA_CLOUD_ACCESS_KEY_SECRET;
  const stsToken = process.env.OSS_STS_TOKEN || process.env.ALIBABA_CLOUD_SECURITY_TOKEN;

  if (!region || !bucket || !accessKeyId || !accessKeySecret) {
    throw new Error('OSS is not configured. Required: OSS_REGION, OSS_BUCKET, OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET.');
  }

  ossClient = new OSS({
    region,
    bucket,
    accessKeyId,
    accessKeySecret,
    stsToken,
    secure: true,
  });
  return ossClient;
}

function normalizeMessages(value) {
  if (!Array.isArray(value)) return DEFAULT_MESSAGES;
  return value
    .filter((item) => item && typeof item.name === 'string' && typeof item.body === 'string' && typeof item.createdAt === 'string')
    .map((item) => ({
      id: String(item.id || createId()).slice(0, 80),
      name: item.name.trim().slice(0, MAX_NAME_LENGTH) || '匿名榴莲',
      body: item.body.trim().slice(0, MAX_BODY_LENGTH),
      createdAt: item.createdAt,
    }))
    .filter((item) => item.body)
    .slice(0, MAX_MESSAGES);
}

async function readMessages() {
  const client = getClient();
  try {
    const result = await client.get(OBJECT_KEY);
    const content = Buffer.isBuffer(result.content) ? result.content.toString('utf8') : String(result.content || '');
    return normalizeMessages(JSON.parse(content));
  } catch (error) {
    const status = error && (error.status || error.statusCode || error.code);
    if (status === 404 || status === 'NoSuchKey' || status === 'NoSuchBucket') {
      await writeMessages(DEFAULT_MESSAGES);
      return DEFAULT_MESSAGES;
    }
    throw error;
  }
}

async function writeMessages(messages) {
  const client = getClient();
  await client.put(OBJECT_KEY, Buffer.from(JSON.stringify(messages, null, 2), 'utf8'), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

function parseBody(request) {
  if (!request.body) return {};
  const raw = Buffer.isBuffer(request.body) ? request.body.toString('utf8') : String(request.body);
  if (!raw.trim()) return {};
  return JSON.parse(raw);
}

function sanitizeIncomingMessage(payload) {
  const name = String(payload.name || '').trim().slice(0, MAX_NAME_LENGTH) || '匿名榴莲';
  const body = String(payload.body || '').trim().slice(0, MAX_BODY_LENGTH);
  if (!body) {
    const error = new Error('留言内容不能为空。');
    error.statusCode = 400;
    throw error;
  }
  return {
    id: createId(),
    name,
    body,
    createdAt: new Date().toISOString(),
  };
}

module.exports.handler = async function handler(request, response, context) {
  try {
    if (request.method === 'OPTIONS') {
      setCors(request, response);
      response.setStatusCode(204);
      response.send('');
      return;
    }

    if (request.method === 'GET') {
      const messages = await readMessages();
      sendJson(request, response, 200, { ok: true, messages });
      return;
    }

    if (request.method === 'POST') {
      const payload = parseBody(request);
      const nextMessage = sanitizeIncomingMessage(payload);
      const currentMessages = await readMessages();
      const messages = [nextMessage, ...currentMessages].slice(0, MAX_MESSAGES);
      await writeMessages(messages);
      sendJson(request, response, 201, { ok: true, message: nextMessage, messages });
      return;
    }

    sendJson(request, response, 405, { ok: false, error: 'Method Not Allowed' });
  } catch (error) {
    const statusCode = error && Number(error.statusCode || error.status) >= 400 ? Number(error.statusCode || error.status) : 500;
    const message = statusCode === 500 ? '云端留言服务暂时不可用。' : error.message;
    console.error('[guestbook-api]', error && error.stack ? error.stack : error);
    sendJson(request, response, statusCode, { ok: false, error: message });
  }
};
