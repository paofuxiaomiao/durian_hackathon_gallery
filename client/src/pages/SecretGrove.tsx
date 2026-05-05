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

const UNLOCK_KEY = "durian.secretGrove.unlocked";
const MESSAGES_KEY = "durian.secretGrove.messages";
const ANSWERS = ["榴莲有ai", "榴莲有AI", "榴莲有 ai", "榴莲有 AI", "durian ai", "ai durian"];

const specimenCards = [
  {
    id: "root",
    no: "01",
    title: "根 · Root",
    prompt: "把第一枚印章放在泥土里读。",
    clue: "榴莲",
    note: "树根记住入口,也记住这本刊物的主角。",
  },
  {
    id: "canopy",
    no: "02",
    title: "冠 · Canopy",
    prompt: "把第二枚印章放到树冠的阴影里读。",
    clue: "有",
    note: "线索不是名词,而是一个正在发生的连接。",
  },
  {
    id: "seed",
    no: "03",
    title: "核 · Seed",
    prompt: "把第三枚印章藏进果核,它会发出一点电子光。",
    clue: "AI",
    note: "最后的答案用两个英文字母收束,像 demo 跑通时亮起的光标。",
  },
];

const initialMessages: GroveMessage[] = [
  {
    id: "seed-message-1",
    name: "榴莲编辑部",
    body: "欢迎来到隐藏果园。这里的留言会先保存在你当前浏览器里,像夹在纸刊里的便签。",
    createdAt: "2026-05-06T00:00:00.000Z",
  },
  {
    id: "seed-message-2",
    name: "一颗会发光的果核",
    body: "如果你看见这块板,说明你已经把三枚线索拼成一句话。请把你的祝福、吐槽、下一版 demo 愿望留在这里。",
    createdAt: "2026-05-06T00:01:00.000Z",
  },
];

function normalizeAnswer(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `grove-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function readMessages(): GroveMessage[] {
  if (typeof window === "undefined") return initialMessages;
  try {
    const raw = window.localStorage.getItem(MESSAGES_KEY);
    if (!raw) return initialMessages;
    const parsed = JSON.parse(raw) as GroveMessage[];
    if (!Array.isArray(parsed)) return initialMessages;
    return parsed.filter((item) => item && typeof item.name === "string" && typeof item.body === "string");
  } catch {
    return initialMessages;
  }
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

function SecretGrove() {
  const [openedCards, setOpenedCards] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [messages, setMessages] = useState<GroveMessage[]>(initialMessages);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(window.localStorage.getItem(UNLOCK_KEY) === "true");
    setMessages(readMessages());
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  const cluePhrase = useMemo(() => {
    return specimenCards
      .filter((card) => openedCards.includes(card.id))
      .map((card) => card.clue)
      .join(" · ");
  }, [openedCards]);

  const progress = Math.round((openedCards.length / specimenCards.length) * 100);

  function toggleCard(id: string) {
    setOpenedCards((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    setError("");
  }

  function submitAnswer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeAnswer(answer);
    const matched = ANSWERS.some((item) => normalizeAnswer(item) === normalized);
    if (!matched) {
      setError("果核还没有亮。提示:按 01 → 02 → 03 的顺序,把三枚印章读成一句话。");
      return;
    }
    setUnlocked(true);
    setError("");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(UNLOCK_KEY, "true");
    }
    window.setTimeout(() => {
      document.getElementById("guestbook")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function submitMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const safeName = name.trim().slice(0, 20) || "匿名榴莲";
    const safeBody = body.trim().slice(0, 180);
    if (!safeBody) return;
    const next: GroveMessage = {
      id: createId(),
      name: safeName,
      body: safeBody,
      createdAt: new Date().toISOString(),
    };
    setMessages((current) => [next, ...current].slice(0, 24));
    setBody("");
    setPosted(true);
    window.setTimeout(() => setPosted(false), 1600);
  }

  function resetLocalMessages() {
    setMessages(initialMessages);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(MESSAGES_KEY, JSON.stringify(initialMessages));
    }
  }

  return (
    <PageLayout>
      <section className="relative overflow-hidden border-y-[1.5px]" style={{ borderColor: "var(--ink)" }}>
        <div className="absolute inset-0 grain opacity-60" aria-hidden />
        <div className="absolute -right-14 -top-16 hidden h-72 w-72 rounded-full md:block" style={{ border: "1px solid color-mix(in oklab, var(--spike) 36%, transparent)" }} />
        <div className="container relative grid min-h-[68vh] grid-cols-1 gap-10 py-14 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-20">
          <div>
            <MonoTag>Secret Grove · Easter Egg</MonoTag>
            <h1 className="mt-5 max-w-3xl text-5xl leading-none md:text-7xl" style={{ color: "var(--ink)" }}>
              隐藏果园
              <span className="block italic" style={{ fontFamily: "var(--font-serif)", color: "var(--spike)" }}>
                Her Trees Mode
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 md:text-lg" style={{ color: "var(--ink-soft)" }}>
              这是夹在《榴莲特别号》纸页里的一个小关卡。它借用安静观察、逐层翻找线索的解谜气质,但谜面完全属于这场 AI 榴莲黑客松。请打开三枚标本印章,按编号读出一句话,果园门就会打开。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#puzzle" className="inline-flex items-center border px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5" style={{ borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }}>
                开始解谜 →
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
                  tree says:
                </p>
                <p className="mt-3 text-3xl leading-tight" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  “先看根,再看冠,最后看果核。”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="puzzle" className="container py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel kicker="Puzzle level" title="三枚标本印章" />
            <p className="mt-5 leading-8" style={{ color: "var(--ink-soft)" }}>
              点开每张标本卡片,收集被树影挡住的词。你不需要外部资料,也不需要猜谜典故;只要按编号把词连起来,就能打开留言板。
            </p>
            <div className="mt-8 border p-5" style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--paper-deep) 66%, transparent)" }}>
              <div className="flex items-center justify-between gap-4">
                <MonoTag>Clue progress</MonoTag>
                <span className="font-mono text-sm" style={{ color: "var(--spike)" }}>{progress}%</span>
              </div>
              <div className="mt-3 h-2 border" style={{ borderColor: "var(--ink)" }}>
                <div className="h-full transition-all duration-500" style={{ width: `${progress}%`, background: "var(--spike)" }} />
              </div>
              <p className="mt-4 min-h-6 font-mono text-sm tracking-[0.14em]" style={{ color: "var(--ink)" }}>
                {cluePhrase || "等待第一枚印章被翻开……"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {specimenCards.map((card) => {
              const opened = openedCards.includes(card.id);
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => toggleCard(card.id)}
                  className="group min-h-[23rem] border-[1.5px] p-5 text-left transition duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: opened ? "var(--spike)" : "var(--ink)",
                    background: opened ? "color-mix(in oklab, var(--flesh) 22%, var(--paper))" : "color-mix(in oklab, var(--paper) 88%, white)",
                    boxShadow: opened ? "8px 8px 0 color-mix(in oklab, var(--spike) 20%, transparent)" : "none",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <MonoTag>{card.no}</MonoTag>
                    <span className="text-xs uppercase tracking-[0.22em]" style={{ color: opened ? "var(--spike)" : "var(--ink-soft)" }}>
                      {opened ? "opened" : "sealed"}
                    </span>
                  </div>
                  <h3 className="mt-6 text-2xl" style={{ color: "var(--ink)" }}>{card.title}</h3>
                  <p className="mt-4 text-sm leading-7" style={{ color: "var(--ink-soft)" }}>{card.prompt}</p>
                  <div className="mt-8 flex aspect-square items-center justify-center rounded-full border" style={{ borderColor: opened ? "var(--spike)" : "color-mix(in oklab, var(--ink) 42%, transparent)", color: opened ? "var(--spike)" : "transparent" }}>
                    <span className="text-4xl" style={{ fontFamily: "var(--font-display)", textShadow: opened ? "0 0 0 transparent" : "0 0 18px var(--ink)" }}>
                      {opened ? card.clue : "?"}
                    </span>
                  </div>
                  <p className="mt-6 text-xs leading-6" style={{ color: opened ? "var(--ink)" : "var(--ink-soft)" }}>
                    {opened ? card.note : "轻触这页纸,让树影移开。"}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={submitAnswer} className="mt-12 border-[1.5px] p-6 md:p-8" style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--paper) 80%, white)" }}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto] md:items-end">
            <label className="block">
              <MonoTag>Final answer</MonoTag>
              <input
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                placeholder="输入三枚印章连成的话"
                className="mt-3 w-full border bg-transparent px-4 py-3 text-lg outline-none"
                style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-display)" }}
              />
            </label>
            <button type="submit" className="border px-6 py-3 font-bold transition hover:-translate-y-0.5" style={{ borderColor: "var(--ink)", background: "var(--ink)", color: "var(--paper)" }}>
              打开留言板
            </button>
          </div>
          {error && <p className="mt-4 text-sm" style={{ color: "var(--spike)" }}>{error}</p>}
          {unlocked && <p className="mt-4 text-sm" style={{ color: "var(--ink-soft)" }}>果园门已打开。你可以继续往下留言。</p>}
        </form>
      </section>

      <section id="guestbook" className="container pb-20 md:pb-28">
        <RuleLine />
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel kicker="Unlocked board" title="自由留言板" />
            <p className="mt-5 leading-8" style={{ color: "var(--ink-soft)" }}>
              解开隐藏果园后,这块板会记录你写下的便签。当前网站部署在 GitHub Pages 静态空间,所以留言先保存在当前浏览器本地;如果下一步要做成所有访客共享的公共留言墙,可以再接入云端数据库或评论服务。
            </p>
          </div>

          <div className="border-[1.5px] p-5 md:p-7" style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--paper-deep) 58%, transparent)" }}>
            {!unlocked ? (
              <div className="flex min-h-[18rem] flex-col items-center justify-center border border-dashed p-8 text-center" style={{ borderColor: "color-mix(in oklab, var(--ink) 48%, transparent)" }}>
                <MonoTag>Board locked</MonoTag>
                <p className="mt-4 max-w-md leading-8" style={{ color: "var(--ink-soft)" }}>
                  留言板还被树影挡着。回到上方,把三枚标本印章读成一句话后再来。
                </p>
              </div>
            ) : (
              <div>
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
                        重置本机留言
                      </button>
                      <button type="submit" className="border px-5 py-2 text-sm font-bold transition hover:-translate-y-0.5" style={{ borderColor: "var(--ink)", background: "var(--spike)", color: "var(--paper)" }}>
                        贴上便签
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
