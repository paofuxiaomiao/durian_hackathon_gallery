// Tropical Editorial · 现场片段金句横幅
// 设计要点:
//   1. 内容:从 16 条 Field Notes 中抽取"标题 + 文案首句 / 引言",形成可循环的金句池
//   2. 两行反向滚动(上行向左,下行向右),每行都通过"内容 × 2 + translateX(-50%)"实现无缝循环
//   3. 整条横幅有报头(MARQUEE / 现场片段 NO.05)与右侧"→ READ MORE",并在中间间或穿插红色「★」点装饰
//   4. 鼠标悬停整条横幅时暂停,聚焦阅读
//   5. 颜色:深墨绿底 + 暖象牙白文字 + 刺红强调 — 与首页其它区块形成强对比

import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { fieldNotes } from "@/data/fieldNotes";

type Cell = {
  id: string;
  /** 主文案,通常 1 句 */
  text: string;
  /** 可选的来源(ROLL 编号 / 场次) */
  meta?: string;
  /** 是否为引言 — 引言用斜体 + 红色强调 */
  isQuote?: boolean;
};

/**
 * 把 fieldNotes 拆解成两行金句池。
 * - 上行:每条 note 的"小标题 — caption 首句"
 * - 下行:有 quote 的优先放 quote;否则用 caption 的第二句
 */
function buildLanes() {
  const upper: Cell[] = [];
  const lower: Cell[] = [];

  fieldNotes.forEach((n) => {
    const sentences = splitSentences(n.caption);
    upper.push({
      id: `u-${n.id}`,
      text: `${n.title}.  ${sentences[0] ?? n.caption}`,
      meta: n.rollLabel,
    });
    if (n.quote) {
      lower.push({
        id: `l-${n.id}`,
        text: stripBrackets(n.quote),
        meta: n.section,
        isQuote: true,
      });
    } else if (sentences[1]) {
      lower.push({
        id: `l-${n.id}`,
        text: sentences[1],
        meta: n.section,
      });
    } else {
      lower.push({
        id: `l-${n.id}`,
        text: `${n.section} · ${n.dateLabel}`,
        meta: n.rollLabel,
      });
    }
  });

  return { upper, lower };
}

function splitSentences(s: string): string[] {
  return s
    .replace(/\s+/g, " ")
    .split(/(?<=[。!?!?])/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function stripBrackets(s: string): string {
  return s.replace(/^[「『"“"《]+/, "").replace(/[」』"”"》]+$/, "");
}

function Lane({
  cells,
  direction,
  duration,
}: {
  cells: Cell[];
  direction: "left" | "right";
  duration: number;
}) {
  // 内容跑两遍以实现 50% 无缝循环
  const items = [...cells, ...cells];
  return (
    <div className="relative overflow-hidden">
      <div
        className="flex items-center gap-10 whitespace-nowrap will-change-transform"
        style={{
          width: "max-content",
          animation: `fq-marquee-${direction} ${duration}s linear infinite`,
        }}
      >
        {items.map((c, i) => (
          <span key={`${c.id}-${i}`} className="inline-flex items-center gap-4 shrink-0">
            <Star />
            <span
              className="text-base md:text-lg leading-none"
              style={{
                fontFamily: c.isQuote ? "var(--font-display)" : "var(--font-body)",
                fontStyle: c.isQuote ? "italic" : "normal",
                fontWeight: c.isQuote ? 700 : 500,
                color: c.isQuote ? "var(--gold)" : "var(--paper)",
                letterSpacing: "0.005em",
              }}
            >
              {c.text}
            </span>
            {c.meta && (
              <span
                className="text-[11px] tracking-[0.18em] uppercase"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--paper)",
                  opacity: 0.55,
                }}
              >
                / {c.meta}
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

function Star() {
  return (
    <span
      aria-hidden
      className="inline-block"
      style={{
        width: 8,
        height: 8,
        background: "var(--spike)",
        transform: "rotate(45deg)",
        boxShadow: "0 0 0 2px rgba(199,78,60,0.18)",
      }}
    />
  );
}

export function FieldQuotesMarquee({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const { upper, lower } = buildLanes();

  const bg = variant === "dark" ? "var(--ink)" : "var(--paper)";
  const fg = variant === "dark" ? "var(--paper)" : "var(--ink)";

  return (
    <section
      className={`relative ${className}`}
      style={{ background: bg, color: fg }}
      aria-label="现场片段金句横幅"
    >
      {/* keyframes inline 避免改全局 css */}
      <style>{`
        @keyframes fq-marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fq-marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .fq-pause:hover [style*="fq-marquee-left"],
        .fq-pause:hover [style*="fq-marquee-right"] {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* 头条:左侧栏头 / 右侧 CTA */}
      <div
        className="relative z-10 flex items-center justify-between gap-4 px-4 md:px-8 py-3 border-b"
        style={{ borderColor: "rgba(245,239,224,0.18)" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block px-2 py-0.5 text-[11px] tracking-[0.22em]"
            style={{
              fontFamily: "var(--font-mono)",
              background: "var(--spike)",
              color: "var(--paper)",
            }}
          >
            ON THE WALL
          </span>
          <span
            className="hidden sm:inline text-[11px] tracking-[0.22em]"
            style={{ fontFamily: "var(--font-mono)", opacity: 0.65 }}
          >
            FIELD NOTES · NO.05 · 16 FRAMES · 4 DAYS
          </span>
        </div>
        <Link
          href="/field-notes"
          className="group inline-flex items-center gap-1.5 text-[12px] tracking-[0.18em]"
          style={{
            fontFamily: "var(--font-mono)",
            color: fg,
            opacity: 0.85,
          }}
        >
          <span>READ THE PHOTO ESSAY</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* 双行滚动 */}
      <div className="relative fq-pause">
        {/* 左右淡出遮罩 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10"
          style={{
            background: `linear-gradient(to right, ${bg} 0%, transparent 100%)`,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10"
          style={{
            background: `linear-gradient(to left, ${bg} 0%, transparent 100%)`,
          }}
        />

        <div className="py-4 md:py-5">
          <Lane cells={upper} direction="left" duration={70} />
        </div>

        <div
          aria-hidden
          className="mx-4 md:mx-8 h-px"
          style={{ background: "rgba(245,239,224,0.16)" }}
        />

        <div className="py-4 md:py-5">
          <Lane cells={lower} direction="right" duration={60} />
        </div>
      </div>
    </section>
  );
}

export default FieldQuotesMarquee;
