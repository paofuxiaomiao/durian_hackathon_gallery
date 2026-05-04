// Tropical Editorial · 404 — 缺页通知
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { MonoTag } from "@/components/Editorial";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="container py-24 md:py-32 text-center">
        <MonoTag>Page Missing · 缺页</MonoTag>
        <h1
          className="mt-4 leading-[0.9]"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            color: "var(--ink)",
            fontSize: "clamp(4rem, 14vw, 12rem)",
          }}
        >
          404
        </h1>
        <p
          className="mt-2 text-2xl"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--spike)" }}
        >
          这一页好像被吃掉了 ——
        </p>
        <p
          className="mt-4 max-w-xl mx-auto text-base md:text-lg"
          style={{ color: "var(--ink-soft)" }}
        >
          也许是某位编辑把它撕了下来当书签,或者印刷厂少印了一页。回到目录,我们再陪你翻一次。
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3"
            style={{ background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            回到封面 <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3 border-2"
            style={{ borderColor: "var(--ink)", color: "var(--ink)", fontFamily: "var(--font-display)", fontWeight: 700 }}
          >
            打开目录
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
