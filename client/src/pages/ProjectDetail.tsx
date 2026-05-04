// Tropical Editorial · 项目详情(跨页报道)
// 暖象牙白 + 墨绿 + 果肉金 + 刺红 / Noto Serif SC + Fraunces

import { Link, useParams } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ExternalLink,
  Hammer,
  Quote,
  Users,
} from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { MonoTag, RuleLine } from "@/components/Editorial";
import { projects } from "@/data/projects";
import NotFound from "./NotFound";

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const idx = projects.findIndex((p) => p.id === params.id);
  if (idx === -1) return <NotFound />;
  const project = projects[idx];
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];

  const accentBg =
    project.accent === "green"
      ? "color-mix(in oklab, var(--ink) 96%, var(--paper))"
      : project.accent === "gold"
      ? "color-mix(in oklab, var(--flesh) 78%, var(--ink))"
      : "color-mix(in oklab, var(--spike) 88%, var(--ink))";

  return (
    <PageLayout>
      {/* TOP: 跨页大标题 */}
      <section
        className="relative border-y"
        style={{ borderColor: "var(--ink)", background: accentBg }}
      >
        <div className="container py-12 md:py-20 relative">
          <div className="flex items-center gap-3 mono-tag" style={{ color: "var(--paper)" }}>
            <Link href="/projects" className="inline-flex items-center gap-1 hover:opacity-80">
              <ArrowLeft className="w-3.5 h-3.5" /> 目录
            </Link>
            <span>/</span>
            <span>{project.issueNo}</span>
            <span>/</span>
            <span>{project.category}</span>
          </div>
          <div className="grid md:grid-cols-12 gap-6 md:gap-12 mt-6 items-end">
            <div className="md:col-span-9">
              <div
                className="text-7xl md:text-[10rem] leading-none issue-plate"
                style={{ color: "color-mix(in oklab, var(--paper) 25%, transparent)" }}
              >
                {project.issueNo}
              </div>
              <h1
                className="mt-2 leading-[0.95] tracking-[-0.02em]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  color: "var(--paper)",
                  fontSize: "clamp(2.5rem, 7vw, 6rem)",
                }}
              >
                {project.projectTitle}
              </h1>
              <p
                className="mt-5 max-w-3xl text-lg md:text-2xl leading-snug"
                style={{
                  color: "color-mix(in oklab, var(--paper) 88%, transparent)",
                  fontFamily: "var(--font-serif)",
                  fontStyle: "italic",
                }}
              >
                “{project.tagline}”
              </p>
            </div>
            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-1 gap-4 text-sm" style={{ color: "var(--paper)" }}>
              <div>
                <div className="mono-tag" style={{ color: "color-mix(in oklab, var(--paper) 70%, transparent)" }}>
                  Team / 队伍
                </div>
                <div className="mt-1 text-lg" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                  {project.teamName}
                </div>
              </div>
              <div>
                <div className="mono-tag" style={{ color: "color-mix(in oklab, var(--paper) 70%, transparent)" }}>
                  Date / 完成
                </div>
                <div className="mt-1 text-lg" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>
                  {project.completionDate.replace(/-/g, ".")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* META BAND */}
      <section className="container py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-4 h-4" />,
              label: "队长 · 成员",
              value: (
                <>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>{project.leader}</div>
                  <div className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>{project.members}</div>
                </>
              ),
            },
            {
              icon: <Calendar className="w-4 h-4" />,
              label: "参赛单位 / 学校",
              value: <div style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>{project.affiliation}</div>,
            },
            {
              icon: <Hammer className="w-4 h-4" />,
              label: "AI 工具栈",
              value: (
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {project.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 text-xs"
                      style={{
                        border: "1px solid var(--ink)",
                        color: "var(--ink)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ),
            },
            {
              icon: <ExternalLink className="w-4 h-4" />,
              label: "在线访问",
              value:
                project.projectUrls.length > 0 ? (
                  <ul className="space-y-1.5 mt-0.5">
                    {project.projectUrls.map((u) => (
                      <li key={u.href}>
                        <a
                          href={u.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm hover:underline underline-offset-4 break-all"
                          style={{ color: "var(--spike)", fontFamily: "var(--font-display)", fontWeight: 700 }}
                        >
                          {u.label} <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                        <div className="mono-tag !text-[0.6rem] mt-0.5 break-all">
                          {u.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="mono-tag">本作未提交在线链接</span>
                ),
            },
          ].map((m) => (
            <div key={m.label} className="border-l-2 pl-4" style={{ borderColor: "var(--spike)" }}>
              <div className="flex items-center gap-2 mono-tag">
                {m.icon}
                <span>{m.label}</span>
              </div>
              <div className="mt-3">{m.value}</div>
            </div>
          ))}
        </div>
      </section>

      <RuleLine className="container" />

      {/* SPREAD: 项目介绍 */}
      <section className="container py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <MonoTag>Section · 01</MonoTag>
            <h2
              className="mt-3 text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              项目<br />介绍
            </h2>
            <div className="mt-4 mono-tag">Project · Features</div>
          </div>
          <div className="md:col-span-9">
            <p
              className="text-xl md:text-2xl leading-snug"
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 500,
                color: "var(--ink)",
                fontStyle: "italic",
              }}
            >
              {project.tagline}
            </p>
            <div
              className="mt-6 columns-1 md:columns-2 gap-10 text-[1.02rem] leading-[1.85]"
              style={{ color: "var(--ink)", fontFamily: "var(--font-sans)" }}
            >
              <FirstLetterParagraphs text={project.description} />
            </div>
          </div>
        </div>
      </section>

      {/* PULL QUOTE — vibe coding */}
      {project.vibeCoding && (
        <section
          className="border-y"
          style={{ borderColor: "var(--ink)", background: "var(--paper-deep)" }}
        >
          <div className="container py-14 md:py-20 relative">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-1 hidden md:block">
                <Quote
                  className="w-16 h-16"
                  style={{ color: "var(--spike)" }}
                  strokeWidth={1.2}
                />
              </div>
              <div className="md:col-span-11">
                <MonoTag>Section · 02 · vibe coding 心得</MonoTag>
                <p
                  className="pull-quote mt-4 text-2xl md:text-4xl leading-[1.25]"
                  style={{ color: "var(--ink)" }}
                >
                  {project.vibeCoding}
                </p>
                <div className="mt-6 mono-tag">— {project.leader} / {project.teamName}</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 03 · 活动感受 */}
      {project.feeling && (
        <section className="container py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-3">
              <MonoTag>Section · 03</MonoTag>
              <h2
                className="mt-3 text-3xl md:text-4xl leading-tight"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                活动<br />感受
              </h2>
              <div className="mt-4 mono-tag">Field · Notes</div>
            </div>
            <div
              className="md:col-span-9 p-6 md:p-10 border-2"
              style={{ borderColor: "var(--ink)", background: "var(--card)" }}
            >
              <p
                className="text-lg md:text-xl leading-[1.85]"
                style={{ color: "var(--ink)", fontFamily: "var(--font-sans)" }}
              >
                {project.feeling}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span
                  className="inline-block px-3 py-1 text-xs"
                  style={{
                    background: "var(--spike)",
                    color: "var(--paper)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  Authentic
                </span>
                <span className="mono-tag">— {project.leader}</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA: 进入项目 */}
      {project.projectUrls.length > 0 && (
        <section className="container pb-16">
          <div
            className="border-2 p-8 md:p-12 grid md:grid-cols-12 gap-6 items-center"
            style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--flesh) 18%, var(--paper))" }}
          >
            <div className="md:col-span-8">
              <MonoTag>Try It · 立即体验</MonoTag>
              <h3
                className="mt-3 text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                打开 {project.projectTitle},亲手尝一口。
              </h3>
            </div>
            <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
              {project.projectUrls.map((u) => (
                <a
                  key={u.href}
                  href={u.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 transition-transform hover:translate-x-1"
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                  }}
                >
                  {u.label}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PREV / NEXT */}
      <section className="container pb-20">
        <RuleLine />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Link
            href={`/projects/${prev.id}`}
            className="group block p-6 border-2 transition-colors hover:bg-[color-mix(in_oklab,var(--paper-deep)_70%,var(--paper))]"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="flex items-center gap-2 mono-tag">
              <ArrowLeft className="w-3.5 h-3.5" /> 上一篇 · {prev.issueNo}
            </div>
            <div
              className="mt-2 text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {prev.projectTitle}
            </div>
            <div className="mt-1 mono-tag">{prev.teamName}</div>
          </Link>
          <Link
            href={`/projects/${next.id}`}
            className="group block p-6 border-2 text-right transition-colors hover:bg-[color-mix(in_oklab,var(--paper-deep)_70%,var(--paper))]"
            style={{ borderColor: "var(--ink)" }}
          >
            <div className="flex items-center justify-end gap-2 mono-tag">
              下一篇 · {next.issueNo} <ArrowRight className="w-3.5 h-3.5" />
            </div>
            <div
              className="mt-2 text-2xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {next.projectTitle}
            </div>
            <div className="mt-1 mono-tag">{next.teamName}</div>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}

function FirstLetterParagraphs({ text }: { text: string }) {
  // 用 newline 切段;若没 newline,按句号切两段
  const parts = text.includes("\n")
    ? text.split(/\n+/)
    : (() => {
        const sentences = text.split(/(?<=[。!?])/).map((s) => s.trim()).filter(Boolean);
        const half = Math.ceil(sentences.length / 2);
        return [sentences.slice(0, half).join(""), sentences.slice(half).join("")].filter(Boolean);
      })();

  return (
    <>
      {parts.map((para, i) => (
        <p key={i} className={`mb-5 break-inside-avoid ${i === 0 ? "first-letter:font-bold first-letter:text-5xl first-letter:mr-1 first-letter:float-left first-letter:leading-[0.9]" : ""}`}
          style={i === 0 ? { ["--tw-text-opacity" as string]: 1 } : undefined}
        >
          {para}
        </p>
      ))}
    </>
  );
}
