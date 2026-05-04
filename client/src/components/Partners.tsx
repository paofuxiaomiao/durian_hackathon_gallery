// Tropical Editorial · 鸣谢 / 主办方 / 合作单位
// 横向 strip:左侧文字栏目,右侧 3 张 logo,杂志感

import { partnerLogos } from "@/data/assets";
import { MonoTag, RuleLine } from "./Editorial";

export function Partners({
  variant = "strip",
}: {
  variant?: "strip" | "stack";
}) {
  if (variant === "stack") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {partnerLogos.map((p) => (
          <div
            key={p.name}
            className="border-2 p-5 flex flex-col items-center text-center"
            style={{ borderColor: "var(--ink)", background: "var(--paper)" }}
          >
            <div className="w-full h-24 flex items-center justify-center">
              <img src={p.src} alt={p.name} className="max-h-24 w-auto object-contain" loading="lazy" />
            </div>
            <div
              className="mt-4 text-base"
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: "var(--ink)" }}
            >
              {p.name}
            </div>
            <div className="mono-tag mt-1">{p.sub}</div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="container">
      <div className="grid md:grid-cols-12 gap-6 md:gap-12 items-center">
        <div className="md:col-span-3">
          <MonoTag>Acknowledgements</MonoTag>
          <h3
            className="mt-2 text-2xl md:text-3xl leading-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            主办 · 合作<br />
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>Partners</span>
          </h3>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x" style={{ borderColor: "var(--ink)" }}>
            {partnerLogos.map((p) => (
              <div
                key={p.name}
                className="px-6 py-5 flex flex-col items-center text-center"
              >
                <div className="w-full h-20 flex items-center justify-center">
                  <img
                    src={p.src}
                    alt={p.name}
                    className="max-h-20 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
                <div
                  className="mt-3 text-sm"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--ink)" }}
                >
                  {p.name}
                </div>
                <div className="mono-tag mt-0.5 !text-[0.62rem]">{p.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <RuleLine className="mt-8" />
    </section>
  );
}
