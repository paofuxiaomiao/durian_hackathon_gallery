// Tropical Editorial · 现场片段 Field Notes
// 复古杂志拼贴风:宝丽来卡片 + 胶卷条 + 印章 + 趣味文案
// 设计要点:
//   1. 不要居中规整网格,改用错落 column 布局 + 微旋转 + 阴影,让页面像贴在杂志内页
//   2. 用咖啡渍 / 邮戳 / 胶卷孔点缀,增强复古感
//   3. 文案保留中文,每张图配 1–2 句俏皮解说,小标题用衬线显眼

import { useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import {
  IssueStamp,
  MonoTag,
  RuleLine,
  SectionLabel,
} from "@/components/Editorial";
import { fieldNotes, type FieldNote, type FieldNoteKind } from "@/data/fieldNotes";

type Filter = "all" | FieldNoteKind;

const FILTERS: { id: Filter; label: string; sub: string }[] = [
  { id: "all", label: "全部 · ALL", sub: `${fieldNotes.length} frames` },
  {
    id: "ai-mascot",
    label: "AI · 拼合现场",
    sub: `${fieldNotes.filter((n) => n.kind === "ai-mascot").length} frames`,
  },
  {
    id: "live",
    label: "真实 · IRL",
    sub: `${fieldNotes.filter((n) => n.kind === "live").length} frames`,
  },
];

export default function FieldNotes() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(
    () => (filter === "all" ? fieldNotes : fieldNotes.filter((n) => n.kind === filter)),
    [filter]
  );

  return (
    <PageLayout>
      {/* ---------------- Hero ---------------- */}
      <section className="container pt-10 md:pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end">
          <div className="md:col-span-8">
            <SectionLabel kicker="PHOTO ESSAY · NO.05" title="现场片段 / Field Notes" />
            <h1
              className="mt-6 text-[3rem] md:text-[5.6rem] leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)", fontWeight: 800 }}
            >
              当 16 帧 <em style={{ color: "var(--spike)", fontStyle: "italic" }}>带刺的</em>
              <br />
              春天,被钉进杂志内页。
            </h1>
            <p
              className="mt-6 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              这一栏不讨论代码,只看现场。一部分照片是 AI 把吉祥物 / 二次元角色 P 进了真实场景的「平行宇宙」;
              另一部分是组委会和参展观众的真人切片。两条胶卷叠在一起,大概就是这次 AI 榴莲节最完整的味道。
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    className="group relative px-4 py-2 transition"
                    style={{
                      background: active ? "var(--ink)" : "transparent",
                      color: active ? "var(--paper)" : "var(--ink)",
                      border: "1px solid var(--ink)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    <span>{f.label}</span>
                    <span className="ml-2 opacity-60 text-xs" style={{ fontFamily: "var(--font-mono)" }}>
                      {f.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-4">
            <div className="relative inline-block">
              <IssueStamp no="No.05" className="text-[var(--spike)]" />
              <div className="mt-4">
                <MonoTag>FRAMES PER ROLL · 04</MonoTag>
                <div className="mt-2 mono-tag">SHOT ON · IPHONE / GENERATED · GPT-IMAGE</div>
                <div className="mt-1 mono-tag">DEVELOPED · LARK BASE</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <RuleLine />
        </div>
      </section>

      {/* ---------------- Collage Wall ---------------- */}
      <section className="container mt-12 md:mt-16">
        <CollageWall list={list} key={filter} />
      </section>

      {/* ---------------- Closing Quote ---------------- */}
      <section className="container mt-20 md:mt-28">
        <div
          className="relative px-6 md:px-12 py-12 md:py-16"
          style={{
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          <div className="absolute -top-3 left-6 md:left-12 mono-tag" style={{ background: "var(--paper)", color: "var(--ink)", padding: "2px 8px" }}>
            CLOSING NOTE
          </div>
          <p
            className="text-2xl md:text-4xl leading-tight max-w-3xl"
            style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            「黑客松最难的不是写代码,是从写完到拍照——
            一秒钟的喘气,一颗榴莲的香味,一张照片的位置。」
          </p>
          <div className="mt-6 mono-tag" style={{ color: "var(--paper)", opacity: 0.7 }}>
            — FROM THE EDITOR · 2026 SPRING
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

/* ============== 复古拼贴墙 ============== */

function CollageWall({ list }: { list: FieldNote[] }) {
  // 用 css multi-column 实现 Pinterest 式错落墙,卡片本身做轻微旋转
  return (
    <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-8">
      {list.map((note, i) => (
        <FieldCard key={note.id} note={note} index={i} />
      ))}
    </div>
  );
}

function FieldCard({ note, index }: { note: FieldNote; index: number }) {
  // 决定卡片基础样式
  const isLive = note.kind === "live";
  const tape = (index + (isLive ? 1 : 0)) % 3; // 三种胶带颜色轮换
  const tapeColor =
    tape === 0 ? "rgba(214, 161, 53, 0.65)" : tape === 1 ? "rgba(199, 78, 60, 0.55)" : "rgba(35, 71, 59, 0.45)";

  return (
    <article
      className="break-inside-avoid mb-8 md:mb-12 group"
      style={{ transform: `rotate(${note.rotate}deg)` }}
    >
      <div
        className="relative bg-white p-3 md:p-4 pb-14 md:pb-16 transition duration-500 group-hover:!rotate-0 group-hover:scale-[1.02]"
        style={{
          boxShadow:
            "0 1px 0 rgba(0,0,0,0.04), 0 18px 36px -18px rgba(35, 71, 59, 0.45), 0 6px 14px -6px rgba(0,0,0,0.18)",
          borderRadius: 2,
        }}
      >
        {/* 顶部胶带 */}
        <div
          aria-hidden
          className="absolute -top-3 left-1/2 -translate-x-1/2 h-7 w-24"
          style={{
            background: tapeColor,
            mixBlendMode: "multiply",
            transform: `translateX(-50%) rotate(${(index % 5) - 2}deg)`,
            boxShadow: "0 4px 8px -3px rgba(0,0,0,0.12)",
          }}
        />
        {/* 角落胶卷孔(仅 live 类) */}
        {isLive && (
          <div aria-hidden className="absolute top-2 right-2 flex gap-[3px]">
            {[0, 1, 2].map((d) => (
              <span
                key={d}
                className="block h-1.5 w-1.5 rounded-full"
                style={{ background: "rgba(35,71,59,0.55)" }}
              />
            ))}
          </div>
        )}

        {/* 图片 */}
        <div className="relative overflow-hidden" style={{ background: "#0d1814" }}>
          <img
            src={note.src}
            alt={note.title}
            loading="lazy"
            className="block w-full h-auto"
            style={{
              filter: isLive ? "saturate(0.95) contrast(1.04)" : "saturate(1.02) contrast(1.02)",
            }}
          />
          {/* 红印章式 ROLL 标 */}
          <span
            className="absolute top-2 left-2 mono-tag px-2 py-0.5"
            style={{
              background: "rgba(245,239,224,0.92)",
              color: "var(--spike)",
              border: "1px solid var(--spike)",
              letterSpacing: "0.08em",
            }}
          >
            {note.rollLabel}
          </span>
          {/* 日期戳 */}
          <span
            className="absolute bottom-2 right-2 mono-tag px-2 py-0.5"
            style={{
              background: "rgba(245,239,224,0.85)",
              color: "var(--ink)",
              transform: "rotate(-3deg)",
              border: "1px dashed var(--ink)",
            }}
          >
            {note.dateLabel}
          </span>
        </div>

        {/* 文案 */}
        <div className="mt-4 px-1">
          <div className="mono-tag" style={{ color: "var(--ink-soft)" }}>
            {note.section}
          </div>
          <h3
            className="mt-1 text-lg md:text-xl leading-snug"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)", fontWeight: 700 }}
          >
            {note.title}
          </h3>
          <p
            className="mt-2 text-[13px] md:text-sm leading-relaxed"
            style={{ color: "var(--ink-soft)", fontFamily: "var(--font-body)" }}
          >
            {note.caption}
          </p>
          {note.quote && (
            <p
              className="mt-3 text-[13px] italic"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--spike)",
                borderLeft: "2px solid var(--spike)",
                paddingLeft: "0.6rem",
              }}
            >
              {note.quote}
            </p>
          )}
        </div>

        {/* 底部宝丽来手写编号区(仅 ai-mascot) */}
        {!isLive && (
          <div
            className="absolute left-4 right-4 bottom-3 flex items-center justify-between"
            style={{ color: "var(--ink-soft)" }}
          >
            <span className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>
              # {String(note.id).padStart(2, "0")} / 16
            </span>
            <span
              className="text-xs"
              style={{
                fontFamily: "'Caveat', 'Permanent Marker', cursive",
                fontSize: "16px",
                color: "var(--ink)",
              }}
            >
              — Durian {note.dateLabel.toLowerCase()}
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
