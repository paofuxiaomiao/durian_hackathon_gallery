// Tropical Editorial · 关于本刊 About
// 暖象牙白 + 墨绿 + 果肉金 + 刺红

import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { MonoTag, RuleLine } from "@/components/Editorial";
import { eventStats, projects } from "@/data/projects";
import { Partners } from "@/components/Partners";
import {
  crossSectionImage as CROSS_IMG,
  festivalPoster,
  chuangyaMascot,
  chuangyaOpcLogo,
  huaihuaFestivalMark,
} from "@/data/assets";

export default function About() {
  const tools = Array.from(new Set(projects.flatMap((p) => p.tools)));
  return (
    <PageLayout>
      <section className="container pt-8 md:pt-14">
        <div className="grid md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-7">
            <MonoTag>Editor's Letter · 刊首语</MonoTag>
            <h1
              className="mt-4 leading-[0.95] tracking-[-0.02em]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                color: "var(--ink)",
                fontSize: "clamp(2.4rem, 7vw, 5rem)",
              }}
            >
              来自编辑部的<br />
              <span style={{ color: "var(--spike)" }}>一封信</span>
            </h1>
            <div
              className="mt-8 text-lg md:text-xl leading-[1.95]"
              style={{ color: "var(--ink)", fontFamily: "var(--font-sans)" }}
            >
              <p className="first-letter:font-bold first-letter:text-6xl first-letter:mr-1 first-letter:float-left first-letter:leading-[0.85]">
                这是一本写给参与者的纸感刊物。我们把全国首个 AI × 榴莲线上黑客松的{eventStats.totalTeams} 支队伍,逐一编进 NO.01–NO.11 的目录里。每一篇都是一次完整的杂志专题:封面照、引文、项目介绍、参赛感想、vibe coding 心得,以及一个可以马上点开就玩的在线 Demo。
              </p>
              <p className="mt-6">
                我们刻意避开了"科技产品宣传册"的写法。不堆砌技术名词,不喊口号,而是让每位参赛者用自己的语言把热度、卡顿、上头、迷失都说出来——因为这才是 vibe coding 的真实样子,也是这场比赛最值得被记下的地方。
              </p>
              <p className="mt-6">
                如果你是来逛展的,我们建议你从 <Link href="/projects" className="underline underline-offset-4">作品目录</Link> 翻起;如果你想读他们的真心话,直接去 <Link href="/voices" className="underline underline-offset-4">感想合集</Link>。这本刊会随飞书多维表格继续生长——榴莲在长,我们也在长。
              </p>
              <div className="mt-10 flex items-center gap-3 mono-tag">
                <span>主编 · 榴莲特别号编辑部</span>
                <span className="h-px w-12" style={{ background: "var(--ink)" }} />
                <span>2026 SPRING</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 space-y-6 md:sticky md:top-10">
            <div className="relative border-2 p-6" style={{ borderColor: "var(--ink)", background: "var(--card)" }}>
              <img src={CROSS_IMG} alt="榴莲剖面图" className="w-full" loading="lazy" />
              <div className="mt-4 mono-tag text-center">Fig.01 · 榴莲剖面 / Cross-section</div>
              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                一颗成熟的榴莲，壳是密钉、瓤是烈香、肉是奶油。AI 也有它的壳与瓤——这本刊的工作就是把它一房一房地剖开。
              </p>
            </div>
            <div className="relative border-2 overflow-hidden" style={{ borderColor: "var(--ink)", background: "var(--card)" }}>
              <div className="flex items-center justify-between px-4 py-2 border-b" style={{ borderColor: "var(--border)" }}>
                <span className="mono-tag">Official Poster</span>
                <span className="mono-tag">2026.05.01 — 05.04</span>
              </div>
              <img src={festivalPoster} alt="怀化东盟 AI 榴莲节海报" className="block w-full h-auto" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <RuleLine className="container my-12" />

      {/* PARTNERS */}
      <Partners />

      {/* 杂志规格 */}
      <section className="container">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <MonoTag>Colophon · 版权页</MonoTag>
            <h2
              className="mt-3 text-3xl md:text-4xl leading-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              本刊规格<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>The Specs</span>
            </h2>
          </div>
          <div className="md:col-span-8">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 text-sm">
              {[
                ["刊名", "AI 榴莲黑客松 · 作品展厅"],
                ["卷号", "VOL. 01 · ISSUE 01"],
                ["出版", "2026 春季"],
                ["收录队伍", `${eventStats.totalTeams} 支`],
                ["可访问 Demo", `${eventStats.liveProjects} 个`],
                ["AI 工具栈", `${tools.length} 种组合`],
                ["数据源", "飞书多维表格 · base/FRH9bg2tBaTbRvs8PaQcmDaUn4g"],
                ["设计语言", "Tropical Editorial · 杂志刊物"],
              ].map(([k, v]) => (
                <div key={k} className="border-l-2 pl-4" style={{ borderColor: "var(--spike)" }}>
                  <dt className="mono-tag">{k}</dt>
                  <dd
                    className="mt-1 text-base"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink)" }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap gap-2">
              <MonoTag className="w-full mb-2">本期所用 AI 工具</MonoTag>
              {tools.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 text-xs"
                  style={{
                    border: "1px solid var(--ink)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div
          className="border-2 p-8 md:p-12 grid md:grid-cols-12 gap-6 items-center"
          style={{ borderColor: "var(--ink)", background: "color-mix(in oklab, var(--flesh) 18%, var(--paper))" }}
        >
          <div className="md:col-span-8">
            <MonoTag>Next Page</MonoTag>
            <h3
              className="mt-3 text-3xl md:text-4xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              翻到下一页,从 NO.01 开始读起。
            </h3>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-3 transition-transform hover:translate-x-1"
              style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 700 }}
            >
              进入作品目录 <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
