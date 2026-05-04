// Tropical Editorial · 项目封面卡(杂志条目)
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { MonoTag } from "./Editorial";

const accentMap: Record<Project["accent"], { bg: string; ink: string; chip: string }> = {
  green: { bg: "var(--paper-deep)", ink: "var(--ink)", chip: "var(--ink)" },
  gold: { bg: "color-mix(in oklab, var(--flesh) 22%, var(--paper))", ink: "var(--ink)", chip: "var(--spike)" },
  red: { bg: "color-mix(in oklab, var(--spike) 14%, var(--paper))", ink: "var(--ink)", chip: "var(--spike)" },
};

function CoverArt({ project }: { project: Project }) {
  // 用 SVG 生成抽象封面:每队 hue 不一致,呈现"刊物拼贴"的感觉
  const { hue, issueNo, projectTitle } = project;
  const initial = projectTitle
    .replace(/[^A-Za-z\u4e00-\u9fff]/g, "")
    .slice(0, 1) || "D";
  return (
    <svg
      viewBox="0 0 320 220"
      className="w-full h-full block"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${projectTitle} 封面装饰`}
    >
      <defs>
        <linearGradient id={`g-${project.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue}, 38%, 62%)`} stopOpacity="0.85" />
          <stop offset="100%" stopColor={`hsl(${(hue + 30) % 360}, 55%, 35%)`} stopOpacity="0.95" />
        </linearGradient>
        <pattern id={`p-${project.id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(28)">
          <path d="M0 7 L14 7" stroke="rgba(247,240,225,0.35)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="320" height="220" fill={`url(#g-${project.id})`} />
      <rect width="320" height="220" fill={`url(#p-${project.id})`} />
      {/* 大装饰榴莲圆 */}
      <g opacity="0.95">
        <circle cx="86" cy="120" r="74" fill={`hsla(${(hue + 50) % 360}, 70%, 60%, 0.6)`} />
        <circle cx="86" cy="120" r="50" fill={`hsla(${(hue + 60) % 360}, 80%, 55%, 0.85)`} />
        <g stroke="rgba(31,58,45,0.35)" strokeWidth="0.8" fill="none">
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (Math.PI * 2 * i) / 18;
            const x1 = 86 + Math.cos(a) * 50;
            const y1 = 120 + Math.sin(a) * 50;
            const x2 = 86 + Math.cos(a) * 76;
            const y2 = 120 + Math.sin(a) * 76;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </g>
      <text
        x="220"
        y="122"
        fontFamily="Fraunces, serif"
        fontSize="120"
        fontWeight="700"
        fontStyle="italic"
        fill="rgba(247,240,225,0.92)"
        textAnchor="middle"
      >
        {initial}
      </text>
      <text
        x="20"
        y="34"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
        letterSpacing="3"
        fill="rgba(247,240,225,0.85)"
      >
        AI · DURIAN HACKATHON
      </text>
      <text
        x="20"
        y="206"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="11"
        letterSpacing="3"
        fill="rgba(247,240,225,0.9)"
      >
        {issueNo} · {project.completionDate.replace(/-/g, ".")}
      </text>
    </svg>
  );
}

export function ProjectCard({ project, layout = "grid" }: { project: Project; layout?: "grid" | "feature" }) {
  const accent = accentMap[project.accent];

  if (layout === "feature") {
    return (
      <Link
        href={`/projects/${project.id}`}
        className="group block fade-up relative"
        style={{ background: accent.bg }}
      >
        <div className="grid md:grid-cols-2 gap-0 border" style={{ borderColor: "var(--ink)" }}>
          <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden">
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
              <CoverArt project={project} />
            </div>
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-[0.2em]"
                style={{ background: "var(--paper)", color: "var(--ink)" }}
              >
                Cover Story · {project.issueNo}
              </span>
            </div>
          </div>
          <div className="p-7 md:p-10 flex flex-col">
            <MonoTag>{project.category}</MonoTag>
            <h3
              className="mt-3 text-3xl md:text-5xl leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {project.projectTitle}
            </h3>
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: "var(--ink-soft)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              “{project.tagline}”
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="mono-tag">队长</div>
                <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  {project.leader}
                </div>
              </div>
              <div>
                <div className="mono-tag">单位</div>
                <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
                  {project.affiliation}
                </div>
              </div>
            </div>
            <div className="mt-auto pt-8 flex items-center gap-3">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-sm group-hover:translate-x-1 transition-transform"
                style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                阅读跨页报道 <ArrowUpRight className="w-4 h-4" />
              </span>
              {project.projectUrls[0] && (
                <span className="mono-tag">{project.projectUrls[0].href.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group relative block fade-up"
    >
      <article
        className="relative border h-full flex flex-col"
        style={{ borderColor: "var(--ink)", background: "var(--card)" }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.05]">
            <CoverArt project={project} />
          </div>
          <div
            className="absolute top-3 left-3 px-2.5 py-1 text-[0.68rem] font-mono uppercase tracking-[0.22em]"
            style={{ background: "var(--paper)", color: "var(--ink)" }}
          >
            {project.issueNo}
          </div>
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 text-[0.68rem] font-mono uppercase tracking-[0.22em]"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            {project.completionDate.replace(/-/g, ".")}
          </div>
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <MonoTag>{project.category}</MonoTag>
          <h3
            className="mt-2 text-2xl leading-[1.15]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            {project.projectTitle}
          </h3>
          <p
            className="mt-2 text-sm leading-relaxed line-clamp-2"
            style={{ color: "var(--ink-soft)", fontFamily: "var(--font-serif)", fontStyle: "italic" }}
          >
            {project.tagline}
          </p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              {project.teamName}
            </span>
            <span
              className="inline-flex items-center gap-1 transition-transform group-hover:translate-x-1"
              style={{ color: accent.chip }}
            >
              阅读 <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
