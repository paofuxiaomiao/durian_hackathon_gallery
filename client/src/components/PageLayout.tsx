// Tropical Editorial · 通用页面布局
import { ReactNode } from "react";
import { Masthead, Footer } from "./Masthead";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "var(--paper)" }}>
      {/* 杂志纸面噪点纹理 */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.12  0 0 0 0 0.18  0 0 0 0 0.12  0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          mixBlendMode: "multiply",
          opacity: 0.4,
        }}
      />
      <Masthead />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
