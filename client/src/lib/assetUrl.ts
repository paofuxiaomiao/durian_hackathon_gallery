// 为本地静态资源路径添加 Vite base 前缀，适配 GitHub Pages 子路径部署
export function assetUrl(path: string): string {
  // 外部绝对链接直接返回
  if (path.startsWith("http") || path.startsWith("//")) return path;
  // Vite 在构建时会将 import.meta.env.BASE_URL 替换为实际 base 路径
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
