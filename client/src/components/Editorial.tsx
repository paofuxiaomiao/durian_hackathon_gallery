// Tropical Editorial · 热带杂志刊物 — 通用版式组件
// 暖象牙白 + 墨绿 + 果肉金 + 刺红;Noto Serif SC / Fraunces / Noto Sans SC / IBM Plex Mono

import { ReactNode } from "react";

export function MonoTag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`mono-tag ${className}`}>{children}</span>;
}

export function RuleLine({ className = "" }: { className?: string }) {
  return <div className={`rule-line ${className}`} aria-hidden />;
}

export function IssueStamp({ no, className = "" }: { no: string; className?: string }) {
  return (
    <div
      className={`inline-flex items-baseline gap-2 ${className}`}
      style={{ color: "var(--ink)" }}
    >
      <span className="font-mono text-[0.72rem] tracking-[0.32em] uppercase opacity-60">
        Issue
      </span>
      <span className="issue-plate text-3xl">{no}</span>
    </div>
  );
}

export function SectionLabel({
  kicker,
  title,
  align = "left",
}: {
  kicker?: string;
  title: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {kicker && <MonoTag className="block mb-3">{kicker}</MonoTag>}
      <h2
        className="text-3xl md:text-5xl"
        style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
      >
        {title}
      </h2>
    </div>
  );
}

export function CornerStamp({ className = "" }: { className?: string }) {
  return (
    <div className={`stamp ${className}`}>
      AI Durian · Issue 01 · 2026
    </div>
  );
}

// 装饰用 svg 榴莲剖面线条
export function DurianSpike({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M60 4 L72 26 L96 22 L84 44 L114 50 L88 66 L106 90 L78 86 L70 116 L60 92 L50 116 L42 86 L14 90 L32 66 L6 50 L36 44 L24 22 L48 26 Z" />
      <circle cx="60" cy="60" r="14" />
      <path d="M48 60 Q60 48 72 60 Q60 72 48 60Z" />
    </svg>
  );
}
