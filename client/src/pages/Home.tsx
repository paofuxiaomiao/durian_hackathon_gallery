// Tropical Editorial · 杂志封面首页
// 暖象牙白 + 墨绿 + 果肉金 + 刺红 / Noto Serif SC + Fraunces

import { Link } from "wouter";
import { ArrowRight, ArrowUpRight, Quote } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { CornerStamp, MonoTag, RuleLine } from "@/components/Editorial";
import { eventStats, projects } from "@/data/projects";
import { Partners } from "@/components/Partners";
import { FieldQuotesMarquee } from "@/components/FieldQuotesMarquee";
import {
  heroImage as HERO_IMG,
  crossSectionImage as CROSS_IMG,
  spikePatternImage as SPIKE_IMG,
  festivalPoster,
  chuangyaMascot,
  huaihuaFestivalMark,
} from "@/data/assets";

const CONTENT_VERSION = "durian-camera-title-fix-20260506";

export default function Home() {
  const featured = projects[0];
  // 三组精选：NO.03 赵巍老师战队、NO.04 榴莲大王、NO.09 王先森爱榴莲
  const otherFeatured = [projects[2], projects[3], projects[8]];
  // 从 index=4 开始，排除已进入精选的 NO.09
  const remaining = projects.slice(4).filter((p) => p.id !== projects[8].id);

  return (
    <PageLayout>
      {/* HERO · 封面跨页 */}
      <section className="container relative pt-6 md:pt-10" data-content-version={CONTENT_VERSION}>
        <div className="grid grid-cols-12 gap-y-6 md:gap-x-8">
          <div className="col-span-12 md:col-span-7 relative">
            <div className="flex items-center gap-3">
              <MonoTag>Issue 01 · 2026 Spring</MonoTag>
              <span className="h-px w-16" style={{ background: "var(--ink)" }} />
              <MonoTag>怀化 · 长沙 联合出版</MonoTag>
            </div>
            <h1
              className="mt-5 leading-[0.94] tracking-[-0.025em]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                color: "var(--ink)",
                fontSize: "clamp(3rem, 9vw, 7.5rem)",
              }}
            >
              榴莲<span style={{ color: "var(--spike)" }}>·</span>特刊
              <br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 800 }}>
                AI Durian
              </span>{" "}
              <span style={{ color: "var(--spike)" }}>Hackathon</span>
            </h1>
            <p
              className="mt-6 max-w-xl text-lg md:text-xl leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              一本属于全国首个 <strong style={{ color: "var(--ink)" }}>AI × 榴莲线上黑客松</strong> 的纸感刊物。
              {eventStats.totalTeams} 支队伍、{eventStats.totalMembers}+ 位创作者,把"vibe coding"的速度和热带的浓烈,装进 {eventStats.liveProjects} 个能马上点开就玩的作品里。
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 px-6 py-3 transition-transform hover:translate-x-1"
                style={{
                  background: "var(--ink)",
                  color: "var(--paper)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                }}
              >
                进入作品目录
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/voices"
                className="group inline-flex items-center gap-3 px-6 py-3 border-2 transition-colors"
                style={{
                  borderColor: "var(--ink)",
                  color: "var(--ink)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                }}
              >
                <Quote className="w-5 h-5" />
                参赛者的感想
              </Link>
              <Link
                href="/field-notes"
                className="group inline-flex items-center gap-2 px-5 py-3 transition-colors"
                style={{
                  background: "transparent",
                  color: "var(--ink)",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  borderBottom: "2px solid var(--spike)",
                }}
              >
                · 现场片段 Field Notes →
              </Link>
            </div>
          </div>

          {/* Hero 图 */}
          <div className="col-span-12 md:col-span-5 relative">
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 z-20 pointer-events-none hidden md:flex items-center justify-center w-28 h-28 rounded-full text-center"
                style={{
                  background: "color-mix(in oklab, var(--paper) 54%, transparent)",
                  border: "1.5px solid color-mix(in oklab, var(--spike) 68%, transparent)",
                  color: "color-mix(in oklab, var(--spike) 74%, transparent)",
                  opacity: 0.82,
                  backdropFilter: "blur(0.2px)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.22em",
                  transform: "rotate(-8deg)",
                  textTransform: "uppercase",
                }}
              >
                AUTHENTIC
                <br />2026 · ISSUE 01
              </div>
              <div className="relative aspect-[5/6] overflow-hidden border-[1.5px]" style={{ borderColor: "var(--ink)" }}>
                <img src={HERO_IMG} alt="榴莲特别号封面" className="w-full h-full object-cover" loading="eager" />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(31,58,45,0) 55%, rgba(31,58,45,0.55) 100%)",
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <div>
                    <MonoTag className="!text-[0.62rem]" >
                      <span style={{ color: "var(--paper)" }}>FROM THE COVER</span>
                    </MonoTag>
                    <div
                      className="mt-1 text-[1.05rem] leading-snug"
                      style={{ color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 800 }}
                    >
                      把一颗东南亚的榴莲<br />剖给所有 vibe coder。
                    </div>
                  </div>
                  <span
                    className="px-2 py-1 text-[0.65rem] font-mono uppercase tracking-[0.2em]"
                    style={{ background: "var(--paper)", color: "var(--ink)" }}
                  >
                    PHOTO ESSAY
                  </span>
                </div>
              </div>
              <div className="absolute -right-3 -bottom-3 hidden md:block">
                <CornerStamp />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="mt-12 md:mt-16 border-y" style={{ borderColor: "var(--ink)" }}>
        <div
          className="overflow-hidden py-4"
          style={{ background: "color-mix(in oklab, var(--ink) 92%, var(--paper))" }}
        >
          <div className="marquee-track" style={{ color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 800 }}>
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-12 text-2xl md:text-3xl">
                {projects.map((p) => (
                  <span key={`${k}-${p.id}`} className="flex items-center gap-3">
                    <span style={{ color: "var(--flesh)" }}>✦</span>
                    {p.projectTitle}
                    <span className="mono-tag !text-[0.65rem]" style={{ color: "color-mix(in oklab, var(--paper) 70%, var(--flesh))" }}>
                      {p.issueNo}
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POSTER · 官方海报展板 */}
      <section className="container py-14 md:py-20">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 order-2 md:order-1">
            <MonoTag>Official Poster · 主办海报</MonoTag>
            <h2
              className="mt-3 text-3xl md:text-5xl leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              智能无界 <span style={{ color: "var(--spike)" }}>·</span> 榴莲有 AI<br />
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 800 }}>
                Huaihua × ASEAN × AI
              </span>
            </h2>
            <p
              className="mt-5 text-base md:text-lg leading-relaxed"
              style={{ color: "var(--ink-soft)" }}
            >
              本届黑客松随<strong style={{ color: "var(--ink)" }}>2026 怀化市东盟集榴莲节</strong>同期举办，市场、选购、娱乐、社区与 AI 五路并进。在这本纸感刊物里，你不仅能看到 11 个作品，也能看到一场属于怀化的热带节日是怎么跟 AI 撞在一起的。
            </p>
            <div className="mt-7 grid grid-cols-3 gap-3 max-w-md">
              <div className="border-l-2 pl-3" style={{ borderColor: "var(--spike)" }}>
                <div className="mono-tag">Date</div>
                <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>5.1 — 5.4</div>
              </div>
              <div className="border-l-2 pl-3" style={{ borderColor: "var(--spike)" }}>
                <div className="mono-tag">City</div>
                <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>湖南 · 怀化</div>
              </div>
              <div className="border-l-2 pl-3" style={{ borderColor: "var(--spike)" }}>
                <div className="mono-tag">Theme</div>
                <div className="mt-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}>脑洞大开</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 order-1 md:order-2 relative">
            <div
              className="absolute -top-3 -left-3 z-10 hidden md:flex items-center gap-1.5 px-3 py-1 mono-tag"
              style={{ background: "var(--spike)", color: "var(--paper)" }}
            >
              SPECIAL POSTER
            </div>
            <div className="relative border-[1.5px] overflow-hidden" style={{ borderColor: "var(--ink)" }}>
              <img
                src={festivalPoster}
                alt="怀化东盟 AI 榴莲节官方海报"
                className="block w-full h-auto"
                loading="lazy"
              />
            </div>
            <div className="mt-2 mono-tag text-right">Fig.02 · © 2026 怀化东盟集榴莲节 / AI 极客松 · 创芽 OPC</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="container pb-14 md:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {[
            { k: "参赛队伍", v: eventStats.totalTeams, sub: "Teams" },
            { k: "创作者", v: `${eventStats.totalMembers}+`, sub: "Makers" },
            { k: "可访问作品", v: eventStats.liveProjects, sub: "Live Demos" },
            { k: "AI 工具组合", v: eventStats.toolCount, sub: "AI Stacks" },
          ].map((it) => (
            <div key={it.k} className="border-l-2 pl-4" style={{ borderColor: "var(--spike)" }}>
              <MonoTag>{it.sub}</MonoTag>
              <div
                className="mt-2 text-5xl md:text-6xl"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 800,
                  fontStyle: "italic",
                  color: "var(--ink)",
                }}
              >
                {it.v}
              </div>
              <div className="mt-1 text-sm" style={{ color: "var(--ink-soft)" }}>{it.k}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COVER STORY */}
      <section className="container">
        <div className="flex items-end justify-between mb-6">
          <div>
            <MonoTag>Cover Story · 头条</MonoTag>
            <h2
              className="mt-3 text-4xl md:text-6xl leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              本期头条作品
            </h2>
          </div>
          <Link href="/projects" className="hidden md:inline-flex items-center gap-2 mono-tag hover:opacity-70">
            查看全部 10 篇 <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ProjectCard project={featured} layout="feature" />
      </section>

      {/* OTHER FEATURED */}
      <section className="container py-14 md:py-20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <MonoTag>Selected · 精选</MonoTag>
            <h2
              className="mt-3 text-3xl md:text-5xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              三组本期精选
            </h2>
          </div>
          <RuleLine className="hidden md:block flex-1 ml-8 mr-2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherFeatured.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* PULL QUOTE BAND */}
      <section
        className="relative my-10 md:my-16 border-y overflow-hidden"
        style={{ borderColor: "var(--ink)" }}
      >
        <img
          src={SPIKE_IMG}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "color-mix(in oklab, var(--paper) 70%, transparent)" }}
        />
        <div className="container relative py-14 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-1 hidden md:block">
              <div
                className="text-[10rem] leading-none"
                style={{ fontFamily: "var(--font-serif)", color: "var(--spike)", fontStyle: "italic" }}
              >
                “
              </div>
            </div>
            <blockquote className="md:col-span-9">
              <p
                className="pull-quote text-3xl md:text-5xl"
                style={{ color: "var(--ink)" }}
              >
                AI 不是替代开发者,而是让一个开发者
                <span style={{ color: "var(--spike)" }}>能扛起一整条链路</span>。
              </p>
              <footer className="mt-6 mono-tag">
                — 唐敏 / 极限工益 AI · 东盟榴莲杀
              </footer>
            </blockquote>
            <div className="md:col-span-2">
              <Link
                href="/voices"
                className="inline-flex items-center gap-2 mono-tag hover:opacity-70"
                style={{ color: "var(--ink)" }}
              >
                更多感想 <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INDEX 6 — 剩下 6 篇 */}
      <section className="container">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-6">
          <div className="md:col-span-7">
            <MonoTag>Index · 目录</MonoTag>
            <h2
              className="mt-3 text-3xl md:text-5xl leading-[1.05]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              其余六组作品 · 一路看到底
            </h2>
          </div>
          <p className="md:col-span-5 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            从市场情报、影像识别,到多人在线卡牌、人格化导购——11 个作品像一颗颗榴莲,壳一样硬核,肉一样上头。
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {remaining.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </section>

      {/* FIELD NOTES TEASER · 与现场片段模块之间的横幅 */}
      <section className="mt-12 md:mt-20">
        <div className="container mb-4">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <MonoTag>Photo Essay · NO.05</MonoTag>
              <h3
                className="mt-2 text-2xl md:text-4xl leading-tight"
                style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
              >
                一样是黑客松<span style={{ color: "var(--spike)" }}>,</span>这里不讲代码<span style={{ color: "var(--spike)" }}>,</span>只讲现场。
              </h3>
            </div>
            <Link
              href="/field-notes"
              className="mono-tag inline-flex items-center gap-1 hover:opacity-70 transition"
            >
              进入现场片段 →
            </Link>
          </div>
        </div>
        <FieldQuotesMarquee />
      </section>

      {/* CALL TO READ */}
      <section className="container py-20 md:py-28">
        <div
          className="relative grid md:grid-cols-12 gap-6 items-center border-2 p-8 md:p-14"
          style={{ borderColor: "var(--ink)", background: "var(--card)" }}
        >
          <div className="md:col-span-4 relative">
            <img
              src={CROSS_IMG}
              alt="榴莲剖面手绘"
              className="w-full max-w-[260px] mx-auto"
              loading="lazy"
            />
            <img
              src={chuangyaMascot}
              alt="创芽仓鼠君吉祥物"
              className="absolute -right-2 -bottom-2 w-24 h-24 object-contain drop-shadow-md"
              loading="lazy"
            />
          </div>
          <div className="md:col-span-8">
            <MonoTag>Editor's Note · 刊首语</MonoTag>
            <h3
              className="mt-3 text-3xl md:text-5xl"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              这是一本写给 vibe coder 的<br />热带读物。
            </h3>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: "var(--ink-soft)", fontFamily: "var(--font-serif)" }}
            >
              我们把每个项目当作一篇杂志专题来排版:照片、引文、数据、感想,再加上一行可以直接点击的"在线体验"。
              不论你是来看作品、找队员、还是只想读一读他们的 vibe coding 心得——欢迎从下一页开始翻。
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 mono-tag hover:opacity-70"
              style={{ color: "var(--ink)" }}
            >
              阅读完整刊首 <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <Partners />
    </PageLayout>
  );
}
