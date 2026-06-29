import { createClient } from "@/lib/supabase/server";
import type { Store } from "@/lib/types";
import Customers, { type CustomerStatus, type CustomerSummary } from "../Customers";

export const dynamic = "force-dynamic";

const DAY = 86400000;

function daysSince(iso: string): number {
  const d = Date.parse(iso + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.floor((today.getTime() - d) / DAY);
}

function classify(visitCount: number, days: number | null): {
  status: CustomerStatus;
  next_action: string;
} {
  if (visitCount === 0) return { status: "new", next_action: "初回体験の案内" };
  if (days != null && days >= 30)
    return { status: "dormant", next_action: `離脱リマインド（${days}日ぶり）` };
  if (days != null && days >= 21)
    return { status: "at_risk", next_action: `そろそろ案内（前回${days}日前）` };
  if (visitCount >= 4) return { status: "active", next_action: "回数券・継続の提案" };
  return { status: "active", next_action: "来店フォロー" };
}

const PRIORITY: Record<CustomerStatus, number> = {
  dormant: 0,
  at_risk: 1,
  new: 2,
  active: 3,
};

type CustomerRow = {
  line_user_id: string;
  display_name: string | null;
  main_purpose: string | null;
  tags: string[] | null;
  store_id: string | null;
};

export default async function CustomersPage() {
  const supabase = await createClient();

  const [{ data: customers }, { data: visits }, { data: stores }] = await Promise.all([
    supabase.from("onu_customers").select("line_user_id, display_name, main_purpose, tags, store_id"),
    supabase.from("onu_visits").select("line_user_id, visited_on").order("visited_on", { ascending: true }),
    supabase.from("herb_stores").select("*").order("sort_order"),
  ]);

  // ユーザーごとの来店日（昇順）をまとめる
  const byUser = new Map<string, string[]>();
  for (const v of (visits ?? []) as { line_user_id: string; visited_on: string }[]) {
    const arr = byUser.get(v.line_user_id) ?? [];
    arr.push(v.visited_on);
    byUser.set(v.line_user_id, arr);
  }

  const summaries: CustomerSummary[] = ((customers ?? []) as CustomerRow[])
    .filter((c) => c.line_user_id !== "demo") // 動作確認用のデモは除外
    .map((c) => {
      const dates = byUser.get(c.line_user_id) ?? [];
      const visit_count = dates.length;
      const last_visit = visit_count ? dates[dates.length - 1] : null;
      const first_visit = visit_count ? dates[0] : null;
      const days_since_last = last_visit ? daysSince(last_visit) : null;
      const { status, next_action } = classify(visit_count, days_since_last);
      return {
        line_user_id: c.line_user_id,
        display_name: c.display_name,
        main_purpose: c.main_purpose,
        tags: c.tags ?? [],
        store_id: c.store_id,
        visit_count,
        first_visit,
        last_visit,
        days_since_last,
        status,
        next_action,
      };
    })
    .sort((a, b) => {
      const p = PRIORITY[a.status] - PRIORITY[b.status];
      if (p !== 0) return p;
      return (b.days_since_last ?? -1) - (a.days_since_last ?? -1);
    });

  return <Customers customers={summaries} stores={(stores ?? []) as Store[]} />;
}
