# 隐藏果园云端留言板部署说明

本文档说明如何把隐藏果园的留言板从浏览器本地缓存升级为 **阿里云函数计算 + OSS 对象存储** 的共享留言板。前端仍然部署在 GitHub Pages，云端只负责提供两个 HTTP 接口：读取留言和新增留言。

> **安全原则**：任何阿里云 AccessKey、OSS Bucket 权限、数据库密码都不能写入 React 前端。前端只能保存公开的函数计算 HTTPS 地址；密钥必须放在函数计算的环境变量里。

## 一、当前架构

| 模块 | 位置 | 作用 |
|---|---|---|
| GitHub Pages 前端 | `client/src/pages/SecretGrove.tsx` | 展示隐藏果园、解谜和留言板界面，并通过 `VITE_SECRET_GROVE_API_URL` 调用云端 API。 |
| 函数计算 API | `aliyun/guestbook-api/index.js` | 提供 `GET` 和 `POST` HTTP 接口，负责读写留言。阿里云函数计算支持通过 HTTP 触发器处理请求，Node.js HTTP Handler 的入口函数通常由 `module.exports.handler` 暴露。[1] |
| OSS 对象存储 | 一个私有 Bucket 中的 JSON 文件 | 保存共享留言列表，例如 `durian-hackathon-gallery/secret-grove/messages.json`。OSS 是阿里云提供的对象存储服务，适合保存非结构化对象数据。[2] |

## 二、云端 API 行为

当前函数只开放三个方法：`OPTIONS` 用于跨域预检，`GET` 用于读取留言，`POST` 用于新增留言。函数会把留言写入同一个 OSS JSON 对象，因此所有访客看到的是同一组便签。

| 请求 | 用途 | 请求体 | 响应示例 |
|---|---|---|---|
| `GET /` | 读取留言 | 无 | `{ "ok": true, "messages": [...] }` |
| `POST /` | 新增留言 | `{ "name": "匿名榴莲", "body": "留言内容" }` | `{ "ok": true, "message": {...}, "messages": [...] }` |
| `OPTIONS /` | 浏览器跨域预检 | 无 | `204 No Content` |

函数会自动限制署名和正文长度。默认最多保留 `80` 条留言，每条正文最长 `180` 个字符，署名最长 `20` 个字符。第一次读取时，如果 OSS 中还没有留言 JSON 文件，函数会写入两条默认种子留言。

## 三、阿里云控制台配置步骤

请先登录阿里云控制台，再按下表完成资源配置。因为这些步骤会涉及账号、付费资源、AccessKey 和权限授权，建议由你本人在控制台完成。

| 步骤 | 操作 | 建议配置 |
|---|---|---|
| 1 | 创建 OSS Bucket | 区域尽量与函数计算相同，例如 `cn-hangzhou`；读写权限建议保持 **私有**。 |
| 2 | 准备 RAM 访问凭证 | 最好创建一个专用 RAM 用户或角色，只授予这个 Bucket 的读写权限，不要使用主账号 AccessKey。 |
| 3 | 创建函数计算服务与函数 | 运行环境选择 Node.js；入口函数填 `index.handler`；触发器选择 HTTP 触发器。 |
| 4 | 上传函数代码 | 在 `aliyun/guestbook-api` 目录执行 `npm run zip`，把生成的 `guestbook-api.zip` 上传到函数计算。 |
| 5 | 配置环境变量 | 按下一节填写 OSS 区域、Bucket、AccessKey 和跨域来源。 |
| 6 | 复制 HTTP 触发器 URL | 得到形如 `https://xxxxx.cn-hangzhou.fcapp.run` 的公开 HTTPS 地址。 |
| 7 | 配置前端构建变量 | 把函数地址写入 GitHub Pages 构建环境变量 `VITE_SECRET_GROVE_API_URL`，重新部署前端。 |

## 四、函数计算环境变量

| 变量名 | 是否必填 | 示例 | 说明 |
|---|---:|---|---|
| `OSS_REGION` | 是 | `oss-cn-hangzhou` | OSS SDK 使用的区域标识。 |
| `OSS_BUCKET` | 是 | `your-secret-grove-bucket` | 存留言 JSON 文件的 Bucket 名称。 |
| `OSS_ACCESS_KEY_ID` | 是 | `LTAI...` | 专用 RAM 用户或临时凭证的 AccessKey ID。 |
| `OSS_ACCESS_KEY_SECRET` | 是 | `***` | 专用 RAM 用户或临时凭证的 AccessKey Secret。 |
| `OSS_OBJECT_KEY` | 否 | `durian-hackathon-gallery/secret-grove/messages.json` | 留言 JSON 文件路径。 |
| `ALLOWED_ORIGINS` | 建议 | `https://paofuxiaomiao.github.io,http://localhost:3000` | 允许访问 API 的前端来源，用英文逗号分隔。 |
| `MAX_MESSAGES` | 否 | `80` | 最多保留多少条留言。 |
| `MAX_NAME_LENGTH` | 否 | `20` | 署名最大字符数。 |
| `MAX_BODY_LENGTH` | 否 | `180` | 留言正文最大字符数。 |

## 五、前端环境变量

前端只需要一个公开变量。它已经写入根目录 `.env.example`：

```bash
VITE_SECRET_GROVE_API_URL=https://your-function-url.cn-hangzhou.fcapp.run
```

如果在本地测试，可以新建 `.env.local` 并填入真实函数地址。构建到 GitHub Pages 时，需要在 GitHub 仓库的 Actions Secrets 或 Variables 中配置同名变量，并确保构建脚本能读取它。这个值可以公开，因为它只是 API 地址，不包含任何密钥。

## 六、本地打包命令

在项目根目录执行以下命令可以检查前端构建与函数语法：

```bash
pnpm run build
cd aliyun/guestbook-api
node --check index.js
npm install --package-lock-only
npm run zip
```

`npm run zip` 会把 `index.js`、`package.json`、`package-lock.json` 和 `node_modules` 打包为 `guestbook-api.zip`，用于上传到阿里云函数计算。

## 七、上线后验证

部署完成后，请先直接打开函数计算 HTTP URL。如果 `GET` 请求返回 `{"ok":true,"messages":[...]}`，说明函数已能读取 OSS。然后再访问隐藏果园页面，解锁留言板后贴一条测试便签；刷新页面后如果便签仍然存在，就说明云端存储已经生效。

若页面提示“云端暂时不可用”，一般优先检查以下三点：第一，函数计算环境变量是否填错；第二，RAM 用户是否拥有目标 Bucket 的 `GetObject` 与 `PutObject` 权限；第三，`ALLOWED_ORIGINS` 是否包含 `https://paofuxiaomiao.github.io`。

## References

[1]: https://help.aliyun.com/zh/functioncompute/fc-2-0/user-guide/http-handler "阿里云函数计算：HTTP Handler"
[2]: https://help.aliyun.com/zh/oss/product-overview/what-is-oss "阿里云对象存储 OSS 产品概述"
