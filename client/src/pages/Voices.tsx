// Tropical Editorial · 感想合集页 — Voices
// 暖象牙白 + 墨绿 + 果肉金 + 刺红 / Noto Serif SC + Fraunces

import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { MonoTag, RuleLine } from "@/components/Editorial";
import { projects } from "@/data/projects";

type Tab = "vibe" | "feeling";

export default function Voices() {
  const [tab, setTab] = useState<Tab>("vibe");

  const items = useMemo(() => {
    return projects
      .map((p) => ({
        ...p,
        text: tab === "vibe" ? p.vibeCoding : p.feeling,
      }))
      .filter((it) => it.text && it.text.trim().length > 0);
  }, [tab]);

  // 用 hue 给每张 quote card 微差颜色
  const tone = (hue: number, alpha: number) => `hsla(${hue}, 35%, 60%, ${alpha})`;

  return (
    <PageLayout>
      <section className="container pt-8 md:pt-14">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="md:col-span-8">
            <MonoTag>Page 03 · 参赛者感想</MonoTag>
            <h1
              className="mt-3 leading-[0.95] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                color: "var(--ink)",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              }}
            >
              <span style={{ color: "var(--spike)" }}>“</span>
              他们说<span style={{ color: "var(--spike)" }}>”</span>
              <br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 800 }}>
                Voices
              </span>
              <span className="mx-3" style={{ color: "var(--spike)" }}>·</span>
              一手感想
            </h1>
          </div>
          <p className="md:col-span-4 text-base md:text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            收录每一支队伍写下的活动感受与 vibe coding 心得——他们用 AI 这把刀,剖开了一颗叫"工程效率"的榴莲。
          </p>
        </div>

        <RuleLine className="my-8" />

        <div className="flex flex-wrap items-center gap-2">
          <MonoTag className="mr-2">Channel</MonoTag>
          {([
            { v: "vibe", label: "vibe coding 心得" },
            { v: "feeling", label: "活动感受" },
          ] as const).map((c) => {
            const active = tab === c.v;
            return (
              <button
                key={c.v}
                onClick={() => setTab(c.v)}
                className="px-4 py-2 transition-all"
                style={{
                  border: `1.5px solid ${active ? "var(--spike)" : "var(--ink)"}`,
                  background: active ? "var(--spike)" : "transparent",
                  color: active ? "var(--paper)" : "var(--ink)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                }}
              >
                {c.label}
              </button>
            );
          })}
          <span className="mono-tag ml-auto">{items.length} 段引文</span>
        </div>
      </section>

      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it, i) => (
            <article
              key={it.id}
              className="relative p-7 md:p-8 border-2 fade-up flex flex-col"
              style={{
                borderColor: "var(--ink)",
                background:
                  i % 4 === 0
                    ? `color-mix(in oklab, ${tone(it.hue, 0.18)}, var(--paper))`
                    : "var(--card)",
                minHeight: 280,
              }}
            >
              <div className="flex items-baseline justify-between">
                <span className="issue-plate text-2xl" style={{ color: "var(--spike)" }}>
                  {it.issueNo}
                </span>
                <span className="mono-tag">{it.completionDate.replace(/-/g, ".")}</span>
              </div>
              <div
                className="mt-4 text-[6rem] leading-none -mb-6"
                style={{ fontFamily: "var(--font-serif)", color: "var(--spike)", fontStyle: "italic" }}
                aria-hidden
              >
                “
              </div>
              <p
                className="mt-2 text-[1.02rem] leading-[1.85] flex-1"
                style={{ fontFamily: "var(--font-sans)", color: "var(--ink)" }}
              >
                {it.text}
              </p>
              <div className="mt-6 pt-4 border-t flex items-center justify-between" style={{ borderColor: "var(--border)" }}>
                <div>
                  <div className="text-base" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                    {it.leader}
                  </div>
                  <div className="mono-tag mt-0.5">
                    {it.teamName} · {it.affiliation}
                  </div>
                </div>
                <Link
                  href={`/projects/${it.id}`}
                  className="inline-flex items-center gap-1 mono-tag hover:opacity-70"
                >
                  阅读 <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
