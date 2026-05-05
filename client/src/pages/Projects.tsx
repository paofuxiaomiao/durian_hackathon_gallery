// Tropical Editorial · 作品目录页 — 杂志栏目索引
// 暖象牙白 + 墨绿 + 果肉金 + 刺红 / Noto Serif SC + Fraunces

import { useMemo, useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { MonoTag, RuleLine } from "@/components/Editorial";
import { projects } from "@/data/projects";

export default function Projects() {
  const [tool, setTool] = useState<string>("ALL");
  const [view, setView] = useState<"grid" | "list">("grid");

  const allTools = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tools.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)];
  }, []);

  const filtered = useMemo(
    () => (tool === "ALL" ? projects : projects.filter((p) => p.tools.includes(tool))),
    [tool],
  );

  return (
    <PageLayout>
      <section className="container pt-8 md:pt-14">
        <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-end">
          <div className="md:col-span-7">
            <MonoTag>Page 02 · 目录</MonoTag>
            <h1
              className="mt-3 leading-[0.95] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                color: "var(--ink)",
                fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
              }}
            >
              作品<span style={{ color: "var(--spike)" }}>·</span>目录
              <br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 800 }}>
                The Index
              </span>
            </h1>
          </div>
          <p className="md:col-span-5 text-base md:text-lg leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            11 篇报道,从 NO.01 到 NO.11。点选一张封面卡,即可翻到该作品的杂志跨页:项目介绍、参赛感想、vibe coding 心得,以及一键直达在线 Demo。
          </p>
        </div>

        <RuleLine className="my-8" />

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <MonoTag className="mr-2">Filter / 工具</MonoTag>
            {allTools.map((t) => {
              const active = t === tool;
              return (
                <button
                  key={t}
                  onClick={() => setTool(t)}
                  className="px-3 py-1.5 text-sm transition-all"
                  style={{
                    border: `1.5px solid ${active ? "var(--spike)" : "var(--ink)"}`,
                    background: active ? "var(--spike)" : "transparent",
                    color: active ? "var(--paper)" : "var(--ink)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                  }}
                >
                  {t === "ALL" ? "全部 · All" : t}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            <MonoTag>View</MonoTag>
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 text-sm transition-all"
                style={{
                  border: `1.5px solid var(--ink)`,
                  background: view === v ? "var(--ink)" : "transparent",
                  color: view === v ? "var(--paper)" : "var(--ink)",
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 mono-tag">
          共 {filtered.length} 篇 · 来源:飞书多维表格 · {new Date().toLocaleDateString("zh-CN")}
        </div>
      </section>

      <section className="container py-10 md:py-14">
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "var(--ink)" }}>
            {filtered.map((p, i) => (
              <li key={p.id} className="py-6">
                <a
                  href={`/projects/${p.id}`}
                  className="grid grid-cols-12 gap-4 items-baseline group"
                >
                  <div
                    className="col-span-2 md:col-span-1 issue-plate text-2xl"
                    style={{ color: "var(--spike)" }}
                  >
                    {p.issueNo}
                  </div>
                  <div className="col-span-10 md:col-span-6">
                    <h3
                      className="text-2xl md:text-3xl leading-tight group-hover:underline underline-offset-4"
                      style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                    >
                      {p.projectTitle}
                    </h3>
                    <p
                      className="mt-1 text-base leading-relaxed"
                      style={{ color: "var(--ink-soft)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
                    >
                      {p.tagline}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-2 mono-tag">{p.teamName}</div>
                  <div className="col-span-6 md:col-span-2 mono-tag text-right md:text-left">{p.completionDate.replace(/-/g, ".")}</div>
                  <div className="col-span-12 md:col-span-1 text-right mono-tag">→ {String(i + 1).padStart(2, "0")}</div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </PageLayout>
  );
}
