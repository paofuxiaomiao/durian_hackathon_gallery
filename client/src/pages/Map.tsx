// 天地图 · 活动场地地图 — 榴莲黑客松怀化主会场
// Tianditu API v4.0 · EPSG:4326
import { Masthead, Footer } from "@/components/Masthead";
import { RuleLine } from "@/components/Editorial";
import { huaihuaFestivalMark } from "@/data/assets";
import { useEffect, useRef, useState } from "react";

// ── 天地图全局类型声明 ──────────────────────────────────
declare global {
  interface Window {
    T: any;
  }
}

// ── 活动场地坐标 (怀化国际陆港 · 东盟集) ──────────────
const VENUE = {
  name: "怀化国际陆港 · 东盟集",
  lng: 109.965,
  lat: 27.545,
  address: "湖南省怀化市鹤城区 · 舞水河西岸风光带",
  desc: "2026 创想AI全球黑客松 · 榴莲特别号 主会场",
};

const TDT_KEY = "598279b28d37e907d7d258328705b60a";
const TDT_SCRIPT = `https://api.tianditu.gov.cn/api?v=4.0&tk=${TDT_KEY}`;

// ── 动态加载天地图 JS API ────────────────────────────────
function loadTiandituScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.T) return resolve();
    const script = document.createElement("script");
    script.src = TDT_SCRIPT;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("天地图脚本加载失败"));
    document.head.appendChild(script);
  });
}

export default function MapPage() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setLoading(true);
        setError(null);
        await loadTiandituScript();
        if (cancelled || !mapRef.current) return;

        const T = window.T;
        if (!T) throw new Error("T 对象未挂载");

        // 创建地图实例 · EPSG:4326 坐标系
        const map = new T.Map(mapRef.current, {
          projection: "EPSG:4326",
        });

        // 设置中心点和缩放级别
        map.centerAndZoom(new T.LngLat(VENUE.lng, VENUE.lat), 15);

        // 添加缩放控件
        map.addControl(new T.Control.Zoom());

        // ── 活动场地标记 ────────────────────────────
        const marker = new T.Marker(new T.LngLat(VENUE.lng, VENUE.lat));
        map.addOverLay(marker);

        // 信息窗
        const infoWin = new T.InfoWindow(
          `<div style="padding:4px 8px;max-width:220px;font-size:13px;line-height:1.6;">
            <strong style="font-size:15px;">${VENUE.name}</strong><br/>
            <span style="color:#666;">${VENUE.address}</span><br/>
            <em style="color:#c0392b;">${VENUE.desc}</em>
          </div>`
        );
        marker.addEventListener("click", () => {
          marker.openInfoWindow(infoWin);
        });

        // 自动打开信息窗
        marker.openInfoWindow(infoWin);

        mapInstance.current = map;
        setLoading(false);
      } catch (e: any) {
        if (!cancelled) {
          setError(e.message || "地图加载失败");
          setLoading(false);
        }
      }
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--paper)" }}>
      <Masthead />

      <main className="flex-1 container py-8">
        {/* 页面标题 */}
        <section className="mb-8">
          <div
            className="text-4xl md:text-5xl mb-2"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800, letterSpacing: "-0.02em" }}
          >
            赛事地图
          </div>
          <p className="text-sm" style={{ color: "var(--ink-soft)" }}>
            Map · 2026 创想AI全球黑客松 · 怀化主会场
          </p>
          <div className="mt-4">
            <RuleLine />
          </div>
        </section>

        {/* 地图容器 */}
        <section className="relative rounded-lg overflow-hidden border" style={{ borderColor: "var(--ink)", borderWidth: 2 }}>
          {/* 加载状态 */}
          {loading && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center"
              style={{ background: "var(--paper)" }}
            >
              <div className="text-center">
                <div className="mono-tag mb-3">正在加载天地图…</div>
                <div
                  className="mx-auto w-8 h-8 border-2 rounded-full animate-spin"
                  style={{ borderColor: "var(--ink-soft)", borderTopColor: "var(--spike)" }}
                />
              </div>
            </div>
          )}

          {/* 错误状态 */}
          {error && (
            <div
              className="absolute inset-0 z-20 flex items-center justify-center"
              style={{ background: "var(--paper)" }}
            >
              <div className="text-center max-w-sm p-6">
                <div className="mono-tag mb-2" style={{ color: "var(--spike)" }}>加载失败</div>
                <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-6 py-2 rounded text-sm"
                  style={{
                    background: "var(--ink)",
                    color: "var(--paper)",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                  }}
                >
                  重试
                </button>
              </div>
            </div>
          )}

          {/* 地图 DOM */}
          <div
            ref={mapRef}
            className="w-full"
            style={{ height: "min(600px, 70vh)", minHeight: 400 }}
          />
        </section>

        {/* 场地信息卡片 */}
        <section className="mt-8">
          <RuleLine />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div
                className="text-xl mb-3"
                style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
              >
                {VENUE.name}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                {VENUE.address}
                <br />
                2026 年 5 月 1 日 — 4 日，来自全国的 AI 创作者齐聚于此，
                在榴莲香气中用代码书写未来。东盟集坐落于舞水河西岸，占地面积
                22.5 公顷，融合东盟十国风情建筑与生态休闲空间。
              </p>
            </div>
            <div className="flex items-center justify-center md:justify-end">
              <img
                src={huaihuaFestivalMark}
                alt="怀化东盟集标志"
                className="h-20 w-auto object-contain opacity-80"
              />
            </div>
          </div>
        </section>

        {/* 底图切换提示 */}
        <section className="mt-10">
          <RuleLine />
          <div className="mt-4 text-xs mono-tag" style={{ color: "var(--ink-soft)" }}>
            底图数据 © 国家地理信息公共服务平台 · 天地图 · 审图号 GS(2024)XXXX 号
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
