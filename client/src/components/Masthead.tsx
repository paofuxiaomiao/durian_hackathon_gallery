// Tropical Editorial · 热带杂志刊物 — 报头(Masthead)
// 像杂志报头一样置于每页顶部:左为刊名 / 中为期号 / 右为目录跳转

import { Link, useLocation } from "wouter";
import { RuleLine } from "./Editorial";
import { huaihuaFestivalMark } from "@/data/assets";

export function Masthead() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "封面 Cover" },
    { href: "/projects", label: "目录 Index" },
    { href: "/voices", label: "感想 Voices" },
    { href: "/field-notes", label: "现场 Field Notes" },
    { href: "/about", label: "刊首 About" },
  ];

  return (
    <header className="relative z-30">
      <div className="container pt-6 md:pt-8">
        <div className="flex items-baseline justify-between gap-6">
          <Link href="/" className="group inline-flex items-baseline gap-3 hover:opacity-80 transition">
            <span
              className="text-xl md:text-2xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}
            >
              榴莲特别号
            </span>
            <span className="hidden sm:inline mono-tag">AI · DURIAN · HACKATHON</span>
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <span className="mono-tag">VOL. 01 · ISSUE 01 · 2026 SPRING</span>
            <span className="h-7 w-px" style={{ background: "var(--ink)", opacity: 0.4 }} />
            <img
              src={huaihuaFestivalMark}
              alt="2026 怀化东盟集榴莲节"
              className="h-7 w-auto object-contain"
              loading="eager"
            />
          </div>
        </div>
        <div className="mt-4">
          <RuleLine />
        </div>
        <nav className="flex items-center justify-between py-3 text-sm">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {navItems.map((item) => {
              const active = location === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group relative inline-block"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    <span>{item.label}</span>
                    <span
                      className="absolute left-0 right-0 -bottom-1 h-[2px] origin-left transition-transform duration-300"
                      style={{
                        background: active ? "var(--spike)" : "var(--ink)",
                        transform: active ? "scaleX(1)" : "scaleX(0)",
                      }}
                    />
                    <span
                      className="absolute left-0 right-0 -bottom-1 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                      style={{ background: "var(--spike)" }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href="https://vcnbfk7jjqxf.feishu.cn/base/FRH9bg2tBaTbRvs8PaQcmDaUn4g"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline mono-tag hover:opacity-70 transition"
          >
            数据源 → 飞书多维表格
          </a>
        </nav>
        <RuleLine />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="mt-24">
      <div className="container py-10">
        <RuleLine />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
          <div>
            <div
              className="text-2xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
            >
              榴莲特别号 · AI Durian Hackathon
            </div>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
              一本属于全国首个 AI × 榴莲线上黑客松的纸感刊物,记录 11 支队伍如何用 AI 把榴莲产业链做得有趣又上头。
            </p>
          </div>
          <div>
            <div className="mono-tag mb-2">栏目</div>
            <ul className="space-y-1.5 text-sm">
              <li><Link href="/" className="hover:opacity-70">封面 Cover</Link></li>
              <li><Link href="/projects" className="hover:opacity-70">作品目录 Index</Link></li>
              <li><Link href="/voices" className="hover:opacity-70">参赛感想 Voices</Link></li>
              <li><Link href="/field-notes" className="hover:opacity-70">现场片段 Field Notes</Link></li>
              <li><Link href="/about" className="hover:opacity-70">关于本刊 About</Link></li>
              <li><Link href="/secret-grove" className="hover:opacity-70">隐藏果园 Secret Grove</Link></li>
            </ul>
          </div>
          <div>
            <div className="mono-tag mb-2">出版信息</div>
            <ul className="space-y-1.5 text-sm" style={{ color: "var(--ink-soft)" }}>
              <li>编辑部 / 怀化 · 长沙</li>
              <li>主办 / 全国首个 AI × 榴莲线上黑客松</li>
              <li>数据源 / 飞书多维表格 · {new Date().getFullYear()}</li>
              <li>设计 / Tropical Editorial Studio</li>
            </ul>
          </div>
        </div>
        <RuleLine className="mt-10" />
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mono-tag">
          <span>© 2026 AI DURIAN HACKATHON · ALL RIGHTS RESERVED</span>
          <Link href="/secret-grove" className="hover:opacity-70">NO.404 / SECRET GROVE</Link>
        </div>
      </div>
    </footer>
  );
}
