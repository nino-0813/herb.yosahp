import type { Store } from "./types";

/** "HH:MM" や "HH:MM:SS" を分に変換 */
function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + (m || 0);
}

const pad = (n: number) => String(n).padStart(2, "0");

/** "HH:MM" 形式で返す */
export function fmtTime(min: number): string {
  return `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;
}

/** 店舗設定から、その日の予約枠（開始時刻の配列 "HH:MM"）を生成 */
export function genSlots(store: Pick<Store, "open_time" | "close_time" | "slot_minutes">): string[] {
  const open = toMin(store.open_time);
  const close = toMin(store.close_time);
  const step = store.slot_minutes || 60;
  const slots: string[] = [];
  for (let m = open; m + step <= close; m += step) {
    slots.push(fmtTime(m));
  }
  return slots;
}

/** 受け取った "HH:MM" / "HH:MM:SS" を "HH:MM" に正規化 */
export function normTime(t: string): string {
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
