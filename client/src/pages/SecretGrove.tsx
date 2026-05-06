import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { CornerStamp, DurianSpike, MonoTag, RuleLine, SectionLabel } from "@/components/Editorial";
import { PageLayout } from "@/components/PageLayout";

type GroveMessage = {
  id: string;
  name: string;
  body: string;
  createdAt: string;
};

type SpecimenObject = {
  id: string;
  ariaLabel: string;
  fragment: string;
  whisper: string;
  shape: "leaf" | "spike" | "tag";
  restClassName: string;
  placedClassName: string;
  slotClassName: string;
};

const UNLOCK_KEY = "durian.secretGrove.unlocked";
const LOCAL_MESSAGES_KEY = "durian.secretGrove.messages";
const GUESTBOOK_API_URL = (import.meta.env.VITE_SECRET_GROVE_API_URL || "").trim().replace(/\/+$/, "");

type GuestbookStatus = "local" | "loading" | "cloud" | "offline";

const specimenObjects: SpecimenObject[] = [
  {
    id: "leaf",
    ariaLabel: "拾起一片带有榴莲气味的叶片",
    fragment: "榴莲",
    whisper: "叶脉覆住了第一道淡痕。",
    shape: "leaf",
    restClassName: "left-3 top-14 rotate-[-12deg] md:left-8 md:top-20",
    placedClassName: "left-[27%] top-[29%] rotate-[-4deg] scale-90",
    slotClassName: "left-[24%] top-[28%] h-24 w-28 rotate-[-5deg] rounded-[52%_48%_48%_52%/62%_45%_55%_38%]",
  },
  {
    id: "thorn",
    ariaLabel: "拾起一枚从果壳落下的果刺",
    fragment: "有",
    whisper: "尖刺压住了纸里极细的一横。",
    shape: "spike",
    restClassName: "right-3 top-36 rotate-[14deg] md:right-9 md:top-40",
    placedClassName: "left-[45%] top-[45%] rotate-[6deg] scale-90",
    slotClassName: "left-[43%] top-[44%] h-20 w-24 rotate-[6deg] rounded-full",
  },
  {
    id: "tag",
    ariaLabel: "拾起一张写着机读符号的纸签",
    fragment: "AI",
    whisper: "纸签把最后一处空白照亮。",
    shape: "tag",
    restClassName: "bottom-8 left-12 rotate-[6deg] md:left-20 md:bottom-10",
    placedClassName: "left-[59%] top-[60%] rotate-[2deg] scale-90",
    slotClassName: "left-[58%] top-[59%] h-16 w-28 rotate-[2deg] rounded-sm",
  },
];

const initialMessages: GroveMessage[] = [
  {
    id: "seed-message-1",
    name: "榴莲编辑部",
    body: "欢迎来到隐藏果园。云端 API 配好后,这里的留言会挂在同一棵树上;未配置前会先留在当前浏览器里。",
    createdAt: "2026-05-06T00:00:00.000Z",
  },
  {
    id: "seed-message-2",
    name: "一颗会发光的果核",
    body: "如果你看见这块板,说明你已经在旧标本纸上看见那句很小的暗语。请把你的祝福、吐槽、下一版 demo 愿望留在这里。",
    createdAt: "2026-05-06T00:01:00.000Z",
  },
];

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `grove-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeMessages(value: unknown): GroveMessage[] {
  if (!Array.isArray(value)) return initialMessages;
  const safeMessages = value
    .filter((item): item is Partial<GroveMessage> => Boolean(item) && typeof item === "object")
    .map((item) => ({
      id: String(item.id || createId()).slice(0, 80),
      name: String(item.name || "匿名榴莲").trim().slice(0, 20) || "匿名榴莲",
      body: String(item.body || "").trim().slice(0, 180),
      createdAt: String(item.createdAt || new Date().toISOString()),
    }))
    .filter((item) => item.body);
  return safeMessages.length ? safeMessages.slice(0, 80) : initialMessages;
}

function readLocalMessages(): GroveMessage[] {
  if (typeof window === "undefined") return initialMessages;
  try {
    const raw = window.localStorage.getItem(LOCAL_MESSAGES_KEY);
    if (!raw) return initialMessages;
    return normalizeMessages(JSON.parse(raw));
  } catch {
    return initialMessages;
  }
}

function cacheLocalMessages(messages: GroveMessage[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOCAL_MESSAGES_KEY, JSON.stringify(messages));
}

function getGuestbookApiUrl() {
  return GUESTBOOK_API_URL;
}

function formatTime(value: string) {
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(value));
  } catch {
    return "刚刚";
  }
}

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function SpecimenShape({ piece, placed }: { piece: SpecimenObject; placed: boolean }) {
  if (piece.shape === "leaf") {
    return (
      <span
        className="relative block h-24 w-28 rounded-[52%_48%_48%_52%/62%_45%_55%_38%] border-[1.5px]"
        style={{
          borderColor: placed ? "var(--spike)" : "var(--ink)",
          background: placed
            ? "linear-gradient(135deg, color-mix(in oklab, var(--spike) 28%, var(--paper)) 0%, color-mix(in oklab, var(--flesh) 24%, var(--paper)) 100%)"
            : "linear-gradient(135deg, color-mix(in oklab, var(--paper) 84%, white) 0%, color-mix(in oklab, var(--spike) 12%, var(--paper)) 100%)",
          boxShadow: placed ? "0 12px 28px color-mix(in oklab, var(--spike) 16%, transparent)" : "6px 7px 0 color-mix(in oklab, var(--ink) 10%, transparent)",
        }}
      >
        <span className="absolute left-1/2 top-2 h-20 w-px -translate-x-1/2 rotate-[18deg]" style={{ background: "color-mix(in oklab, var(--ink) 34%, transparent)" }} />
        <span className="absolute left-9 top-9 h-px w-12 rotate-[24deg]" style={{ background: "color-mix(in oklab, var(--ink) 20%, transparent)" }} />
      </span>
    );
  }

  if (piece.shape === "spike") {
    return (
      <span className="relative grid h-24 w-24 place-items-center">
        <span
          className="absolute h-16 w-16 rotate-45 border-[1.5px]"
          style={{
            borderColor: placed ? "var(--spike)" : "var(--ink)",
            background: placed ? "color-mix(in oklab, var(--spike) 18%, var(--paper))" : "color-mix(in oklab, var(--paper) 82%, white)",
            boxShadow: placed ? "0 10px 22px color-mix(in oklab, var(--spike) 18%, transparent)" : "5px 5px 0 color-mix(in oklab, var(--ink) 10%, transparent)",
          }}
        />
        <span className="absolute h-5 w-5 rounded-full border" style={{ borderColor: "color-mix(in oklab, var(--ink) 46%, transparent)", background: "var(--paper)" }} />
      </span>
    );
  }

  return (
    <span
      className="relative block h-16 w-28 border-[1.5px] px-3 py-2 text-left font-mono text-[0.62rem] uppercase tracking-[0.18em]"
      style={{
        borderColor: placed ? "var(--spike)" : "var(--ink)",
        color: "var(--ink-soft)",
        background: placed ? "color-mix(in oklab, var(--flesh) 22%, var(--paper))" : "color-mix(in oklab, var(--paper) 88%, white)",
        boxShadow: placed ? "0 10px 22px color-mix(in oklab, var(--spike) 14%, transparent)" : "5px 6px 0 color-mix(in oklab, var(--ink) 9%, transparent)",
      }}
    >
      botanical
      <span className="mt-2 block h-px w-full" style={{ background: "color-mix(in oklab, var(--ink) 24%, transparent)" }} />
      <span className="mt-2 block h-px w-2/3" style={{ background: "color-mix(in oklab, var(--ink) 18%, transparent)" }} />
    </span>
  );
}

function SecretGrove() {
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);
  const [messages, setMessages] = useState<GroveMessage[]>(initialMessages);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [posted, setPosted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [guestbookStatus, setGuestbookStatus] = useState<GuestbookStatus>(GUESTBOOK_API_URL ? "loading" : "local");
  const [guestbookNotice, setGuestbookNotice] = useState(GUESTBOOK_API_URL ? "正在连接云端留言板。" : "尚未配置云端 API,留言会暂存本机。");
  const [lastWhisper, setLastWhisper] = useState("纸页很安静。几件东西散在边上。");

  useEffect(() => {
    if (typeof window === "undefined") return;

    setUnlocked(window.localStorage.getItem(UNLOCK_KEY) === "true");
    const cachedMessages = readLocalMessages();
    setMessages(cachedMessages);

    const apiUrl = getGuestbookApiUrl();
    if (!apiUrl) {
      setGuestbookStatus("local");
      setGuestbookNotice("尚未配置云端 API,留言会暂存本机。");
      return;
    }

    let active = true;
    setGuestbookStatus("loading");
    setGuestbookNotice("正在从阿里云函数计算读取共享便签。");

    fetch(apiUrl, { method: "GET", headers: { Accept: "application/json" } })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({}));
        if (!response.ok || payload.ok === false) {
          throw new Error(payload.error || "云端留言读取失败。");
        }
        return normalizeMessages(payload.messages);
      })
      .then((cloudMessages) => {
        if (!active) return;
        setMessages(cloudMessages);
        cacheLocalMessages(cloudMessages);
        setGuestbookStatus("cloud");
        setGuestbookNotice("已连接云端留言板,所有访客会看到同一组便签。");
      })
      .catch(() => {
        if (!active) return;
        setGuestbookStatus("offline");
        setGuestbookNotice("暂时连不上云端留言板,正在显示本机缓存。");
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    cacheLocalMessages(messages);
  }, [messages]);

  const allPlaced = placedPieces.length === specimenObjects.length;

  const arrangedPhrase = useMemo(() => {
    return specimenObjects.map((piece) => (placedPieces.includes(piece.id) ? piece.fragment : "")).join("");
  }, [placedPieces]);

  function placePiece(piece: SpecimenObject) {
    if (placedPieces.includes(piece.id)) return;
    setPlacedPieces((current) => [...current, piece.id]);
    setLastWhisper(piece.whisper);
  }

  function openGate() {
    setUnlocked(true);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(UNLOCK_KEY, "true");
    }
    window.setTimeout(() => {
      document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  async function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeName = name.trim().slice(0, 20) || "匿名榴莲";
    const safeBody = body.trim().slice(0, 180);
    if (!safeBody || submitting) return;

    const apiUrl = getGuestbookApiUrl();
    setSubmitting(true);

    try {
      if (!apiUrl) throw new Error("未配置云端 API。");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: safeName, body: safeBody }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || payload.ok === false) {
        throw new Error(payload.error || "云端留言保存失败。");
      }
      const nextMessages = normalizeMessages(payload.messages || (payload.message ? [payload.message, ...messages] : messages));
      setMessages(nextMessages);
      cacheLocalMessages(nextMessages);
      setGuestbookStatus("cloud");
      setGuestbookNotice("留言已写进云端果园,所有访客刷新后都能看见。");
    } catch {
      const next: GroveMessage = {
        id: createId(),
        name: safeName,
        body: safeBody,
        createdAt: new Date().toISOString(),
      };
      const nextMessages = [next, ...messages].slice(0, 80);
      setMessages(nextMessages);
      cacheLocalMessages(nextMessages);
      setGuestbookStatus(apiUrl ? "offline" : "local");
      setGuestbookNotice(apiUrl ? "云端暂时不可用,这条留言已先保存在本机缓存。" : "这条留言已保存在本机缓存。配置云端 API 后即可共享给所有访客。");
    } finally {
      setBody("");
      setPosted(true);
      setSubmitting(false);
      window.setTimeout(() => setPosted(false), 1800);
    }
  }

  function resetLocalMessages() {
    setMessages(initialMessages);
    cacheLocalMessages(initialMessages);
    if (guestbookStatus === "cloud") {
      setGuestbookNotice("已重置本机缓存。云端留言不会被这个按钮删除,刷新后会重新读取云端数据。");
    } else {
      setGuestbookNotice("已重置本机留言缓存。");
    }
  }

  return (
    <PageLayout>
      <section className="relative overflow-hidden border-y-[1.5px]" style={{ borderColor: "var(--ink)" }}>
        <div className="absolute inset-0 grain opacity-60" aria-hidden />
        <div className="absolute -right-14 -top-16 hidden h-72 w-72 rounded-full md:block" style={{ border: "1px solid color-mix(in oklab, var(--spike) 36%, transparent)" }} />
        <div className="container relative grid min-h-[68vh] grid-cols-1 gap-10 py-14 md:grid-cols-[0.92fr_1.08fr] md:items-center md:py-20">
          <div>
            <MonoTag>Secret Grove · Observation Room</MonoTag>
            <h1 className="mt-5 max-w-3xl text-5xl leading-none md:text-7xl" style={{ color: "var(--ink)" }}>
              隐藏果园
              <span className="block italic" style={{ fontFamily: "var(--font-serif)", color: "var(--spike)" }}>
                Herbarium Table
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 md:text-lg" style={{ color: "var(--ink-soft)" }}>
              这不是一张试卷,也没有需要输入的答案。旧标本纸躺在桌面中央,几件掉落的东西在边缘等着被看见。让它们回到纸上,果园门会自己露出一道缝。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#puzzle" className="inline-flex items-center border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5" style={{ borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }}>
                走近桌面 →
              </a>
              <Link href="/" className="inline-flex items-center border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
                返回封面
              </Link>
            </div>
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-md border-[1.5px] p-5" style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--paper) 72%, white)" }}>
            <CornerStamp className="absolute -left-5 top-8 z-10 opacity-75" />
            <div className="flex h-full flex-col justify-between border p-6" style={{ borderColor: "color-mix(in oklab, var(--ink) 38%, transparent)" }}>
              <div>
                <MonoTag>Botanical file / no. 404</MonoTag>
                <div className="mt-8 flex justify-center">
                  <DurianSpike className="h-44 w-44 opacity-90" />
                </div>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.24em]" style={{ color: "var(--ink-soft)" }}>
                  from the margin:
                </p>
                <p className="mt-3 text-3xl leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  “别急着读。先让纸面安静下来。”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="puzzle" className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div>
            <SectionLabel kicker="Puzzle level" title="旧标本桌面" />
            <p className="mt-5 leading-8" style={{ color: "var(--ink-soft)" }}>
              桌面上没有编号,也没有答题框。只要观察纸上的淡痕和周围的小物件,轻触你觉得该归位的东西。
            </p>
            <div className="mt-8 border p-5" style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--paper-deep) 66%, transparent)" }}>
              <MonoTag>Field note</MonoTag>
              <p className="mt-4 min-h-12 text-sm leading-7" style={{ color: "var(--ink-soft)" }}>
                {allPlaced ? "暗字在纸纤维里合拢,门缝变亮了。" : lastWhisper}
              </p>
            </div>
          </div>

          <div className="relative min-h-[34rem] overflow-hidden border-[1.5px] p-4 md:min-h-[40rem] md:p-6" style={{ borderColor: "var(--ink)", background: "radial-gradient(circle at 30% 20%, color-mix(in oklab, var(--flesh) 22%, transparent), transparent 26%), color-mix(in oklab, var(--paper-deep) 72%, var(--paper))" }}>
            <div className="absolute inset-0 grain opacity-50" aria-hidden />
            <div
              className="absolute left-1/2 top-1/2 h-[74%] w-[70%] -translate-x-1/2 -translate-y-1/2 rotate-[-1.5deg] border-[1.5px] p-5 transition duration-700 md:w-[64%]"
              style={{
                borderColor: allPlaced ? "var(--spike)" : "color-mix(in oklab, var(--ink) 72%, transparent)",
                background: "linear-gradient(180deg, color-mix(in oklab, var(--paper) 88%, white), color-mix(in oklab, var(--paper-deep) 72%, var(--paper)))",
                boxShadow: "14px 18px 0 color-mix(in oklab, var(--ink) 8%, transparent)",
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <MonoTag>no. 404 / herbarium</MonoTag>
                <span className="h-8 w-8 rounded-full border" style={{ borderColor: "color-mix(in oklab, var(--ink) 30%, transparent)" }} />
              </div>

              <div className="relative mt-10 h-[78%] border border-dashed" style={{ borderColor: "color-mix(in oklab, var(--ink) 28%, transparent)" }}>
                <div className="absolute left-5 top-5 h-20 w-16 border-l border-t" style={{ borderColor: "color-mix(in oklab, var(--ink) 24%, transparent)" }} />
                <div className="absolute bottom-5 right-5 h-20 w-16 border-b border-r" style={{ borderColor: "color-mix(in oklab, var(--ink) 24%, transparent)" }} />
                {specimenObjects.map((piece) => {
                  const placed = placedPieces.includes(piece.id);
                  return (
                    <div
                      key={piece.id}
                      className={classNames("absolute border border-dashed transition duration-500", piece.slotClassName)}
                      style={{
                        borderColor: placed ? "color-mix(in oklab, var(--spike) 52%, transparent)" : "color-mix(in oklab, var(--ink) 22%, transparent)",
                        background: placed ? "color-mix(in oklab, var(--spike) 5%, transparent)" : "transparent",
                      }}
                      aria-hidden
                    >
                      <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-3xl transition duration-700"
                        style={{
                          color: placed ? "var(--spike)" : "transparent",
                          opacity: placed ? 0.78 : 0,
                          fontFamily: "var(--font-display)",
                          textShadow: placed ? "0 0 16px color-mix(in oklab, var(--spike) 20%, transparent)" : "none",
                        }}
                      >
                        {piece.fragment}
                      </span>
                    </div>
                  );
                })}

                <div className="absolute inset-x-0 bottom-8 flex flex-col items-center px-6 text-center">
                  <p
                    className="text-4xl leading-none transition duration-700 md:text-5xl"
                    style={{
                      color: allPlaced ? "var(--ink)" : "transparent",
                      fontFamily: "var(--font-display)",
                      opacity: allPlaced ? 1 : 0,
                      letterSpacing: allPlaced ? "0.02em" : "0.18em",
                    }}
                    aria-live="polite"
                  >
                    {arrangedPhrase || "榴莲有AI"}
                  </p>
                  <button
                    type="button"
                    onClick={openGate}
                    className={classNames(
                      "mt-5 border px-5 py-2 text-sm font-bold transition duration-500 hover:-translate-y-0.5",
                      allPlaced ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                    )}
                    style={{ borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }}
                    aria-hidden={!allPlaced}
                  >
                    推开果园门
                  </button>
                </div>
              </div>
            </div>

            {specimenObjects.map((piece) => {
              const placed = placedPieces.includes(piece.id);
              return (
                <button
                  key={piece.id}
                  type="button"
                  onClick={() => placePiece(piece)}
                  className={classNames(
                    "absolute z-10 transition-all duration-700 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    placed ? piece.placedClassName : piece.restClassName,
                  )}
                  style={{ "--tw-ring-color": "var(--spike)" } as React.CSSProperties}
                  aria-label={piece.ariaLabel}
                >
                  <SpecimenShape piece={piece} placed={placed} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="guestbook" className="container pb-20 md:pb-28">
        <RuleLine />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel kicker="Unlocked board" title="自由留言板" />
            <p className="mt-5 leading-8" style={{ color: "var(--ink-soft)" }}>
              解开隐藏果园后,这块板会记录你写下的便签。它现在优先连接阿里云函数计算留言 API,把便签写入云端对象存储;如果云端地址还没配置,或短暂不可用,就自动退回本机缓存,不打断果园体验。
            </p>
            <div className="mt-5 inline-flex items-center gap-3 border px-4 py-2 text-xs font-bold uppercase tracking-[0.24em]" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
              {guestbookStatus === "cloud" ? "Cloud board" : guestbookStatus === "loading" ? "Connecting" : guestbookStatus === "offline" ? "Offline cache" : "Local cache"}
            </div>
          </div>

          <div className="border-[1.5px] p-5 md:p-7" style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--paper-deep) 58%, transparent)" }}>
            {!unlocked ? (
              <div className="flex min-h-[18rem] flex-col items-center justify-center border border-dashed p-8 text-center" style={{ borderColor: "color-mix(in oklab, var(--ink) 48%, transparent)" }}>
                <MonoTag>Board locked</MonoTag>
                <p className="mt-4 max-w-md leading-8" style={{ color: "var(--ink-soft)" }}>
                  留言板还在树影后面。等旧标本纸自己显出暗语,门缝就会变亮。
                </p>
              </div>
            ) : (
              <div>
                <p className="mb-4 border px-4 py-3 text-sm leading-7" style={{ borderColor: "color-mix(in oklab, var(--ink) 32%, transparent)", color: "var(--ink-soft)", background: "color-mix(in oklab, var(--paper) 72%, white)" }}>
                  {guestbookNotice}
                </p>
                <form onSubmit={submitMessage} className="grid grid-cols-1 gap-4">
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    maxLength={20}
                    placeholder="署名,可留空"
                    className="border bg-transparent px-4 py-3 outline-none"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                  />
                  <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    maxLength={180}
                    placeholder="写一句想留给黑客松、榴莲或下一位解谜者的话……"
                    rows={4}
                    className="resize-none border bg-transparent px-4 py-3 leading-7 outline-none"
                    style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
                  />
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-xs" style={{ color: "var(--ink-soft)" }}>{body.length}/180</span>
                    <div className="flex gap-3">
                      <button type="button" onClick={resetLocalMessages} className="border px-4 py-2 text-sm transition hover:-translate-y-0.5" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
                        重置本机缓存
                      </button>
                      <button type="submit" disabled={submitting} className="border px-5 py-2 text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60" style={{ borderColor: "var(--ink)", background: "var(--spike)", color: "var(--paper)" }}>
                        {submitting ? "正在保存" : "贴上便签"}
                      </button>
                    </div>
                  </div>
                  {posted && <p className="text-sm" style={{ color: "var(--spike)" }}>便签已贴上。</p>}
                </form>

                <div className="mt-8 grid grid-cols-1 gap-4">
                  {messages.map((message) => (
                    <article key={message.id} className="border p-4" style={{ borderColor: "color-mix(in oklab, var(--ink) 42%, transparent)", background: "color-mix(in oklab, var(--paper) 78%, white)" }}>
                      <div className="flex items-center justify-between gap-4">
                        <strong style={{ color: "var(--ink)" }}>{message.name}</strong>
                        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em]" style={{ color: "var(--ink-soft)" }}>{formatTime(message.createdAt)}</span>
                      </div>
                      <p className="mt-3 whitespace-pre-wrap leading-7" style={{ color: "var(--ink-soft)" }}>{message.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

export default SecretGrove;
