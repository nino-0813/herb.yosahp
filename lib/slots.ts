import type { Store } from "./types";

// 店舗設定（列）が未設定でも動くようにする既定値
const DEFAULT_OPEN = "10:00";
const DEFAULT_CLOSE = "20:00";
const DEFAULT_SLOT = 60;

/** "HH:MM" や "HH:MM:SS" を分に変換（未定義でも落ちない） */
function toMin(t: string | null | undefined): number {
  if (!t) return 0;
  const [h, m] = String(t).split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "HH:MM" 形式で返す */
export function fmtTime(min: number): string {
  return `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
}

/** 店舗設定から、その日の予約枠（開始時刻の配列 "HH:MM"）を生成 */
export function genSlots(
  store: Partial<Pick<Store, "open_time" | "close_time" | "slot_minutes">> | null | undefined
): string[] {
  const open = toMin(store?.open_time || DEFAULT_OPEN);
  const close = toMin(store?.close_time || DEFAULT_CLOSE);
  const step = store?.slot_minutes || DEFAULT_SLOT;
  const slots: string[] = [];
  for (let m = open; m + step <= close; m += step) {
    slots.push(fmtTime(m));
  }
  return slots;
}

/** 受け取った "HH:MM" / "HH:MM:SS" を "HH:MM" に正規化（未定義は空文字） */
export function normTime(t: string | null | undefined): string {
  if (!t) return "";
  return fmtTime(toMin(t));
}

/** ローカル日付を "YYYY-MM-DD" に */
export function ymd(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** 今日から days 日分の日付配列（定休曜日は除外しない／表示側で判定） */
export function dateRange(days: number, startOffset = 0): Date[] {
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  const out: Date[] = [];
  for (let i = startOffset; i < startOffset + days; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push(d);
  }
  return out;
}

export const WEEKDAY_JP = ["日", "月", "火", "水", "木", "金", "土"];
