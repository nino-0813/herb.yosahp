import { SITE } from "@/site.config";

export const GA_MEASUREMENT_ID = SITE.gaId;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** ページビューを送信（SPA遷移時に手動で呼ぶ） */
export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || typeof window.gtag === "undefined") return;
  window.gtag("config", GA_MEASUREMENT_ID, { page_path: url });
}

/** カスタムイベントを送信 */
export function gaEvent(
  action: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined" || typeof window.gtag === "undefined") return;
  window.gtag("event", action, params);
}
