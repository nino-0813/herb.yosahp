"use client";

import { useMemo, useState } from "react";
import AdminTabs from "./AdminTabs";
import type { Store } from "@/lib/types";

export type CustomerStatus = "new" | "active" | "at_risk" | "dormant";

export type CustomerSummary = {
  line_user_id: string;
  display_name: string | null;
  main_purpose: string | null;
  tags: string[];
  store_id: string | null;
  visit_count: number;
  first_visit: string | null;
  last_visit: string | null;
  days_since_last: number | null;
  status: CustomerStatus;
  next_action: string;
};

const STATUS_META: Record<CustomerStatus, { label: string; bg: string; fg: string }> = {
  new: { label: "新規", bg: "#eaf0f6", fg: "#3f5b78" },
  active: { label: "来店中", bg: "#eef0e8", fg: "#5d6242" },
  at_risk: { label: "要フォロー", bg: "#fbf1e2", fg: "#9a6a2a" },
  dormant: { label: "離脱", bg: "#fbeeec", fg: "#b4453a" },
};

const STATUS_ORDER: CustomerStatus[] = ["dormant", "at_risk", "new", "active"];

function Badge({ status }: { status: CustomerStatus }) {
  const m = STATUS_META[status];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        background: m.bg,
        color: m.fg,
        whiteSpace: "nowrap",
      }}
    >
      {m.label}
    </span>
  );
}

export default function Customers({
  customers,
  stores,
}: {
  customers: CustomerSummary[];
  stores: Store[];
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  const storeName = (id: string | null) =>
    id ? stores.find((s) => s.id === id)?.name ?? id : "—";

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (storeFilter !== "all" && c.store_id !== storeFilter) return false;
      if (keyword) {
        const k = keyword.toLowerCase();
        const hay = `${c.display_name ?? ""} ${c.main_purpose ?? ""} ${c.tags.join(" ")}`.toLowerCase();
        if (!hay.includes(k)) return false;
      }
      return true;
    });
  }, [customers, statusFilter, storeFilter, keyword]);

  const stats = useMemo(
    () => ({
      total: customers.length,
      active: customers.filter((c) => c.status === "active").length,
      at_risk: customers.filter((c) => c.status === "at_risk").length,
      dormant: customers.filter((c) => c.status === "dormant").length,
    }),
    [customers],
  );

  return (
    <div className="admin">
      <AdminTabs />
      <div className="admin-wrap">
        <div className="admin-stats">
          <div className="admin-stat">
            <div className="admin-stat__num">{stats.total}</div>
            <div className="admin-stat__label">顧客数（ON:U）</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat__num">{stats.active}</div>
            <div className="admin-stat__label">来店中</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat__num" style={{ color: "#9a6a2a" }}>{stats.at_risk}</div>
            <div className="admin-stat__label">要フォロー（3週〜）</div>
          </div>
          <div className="admin-stat">
            <div className="admin-stat__num" style={{ color: "#b4453a" }}>{stats.dormant}</div>
            <div className="admin-stat__label">離脱（30日〜）</div>
          </div>
        </div>

        <div className="admin-toolbar">
          <div className="admin-field">
            <label>状態</label>
            <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">すべて</option>
              {STATUS_ORDER.map((s) => (
                <option key={s} value={s}>{STATUS_META[s].label}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>店舗</label>
            <select className="admin-select" value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}>
              <option value="all">すべての店舗</option>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="admin-field" style={{ flex: 1, minWidth: 160 }}>
            <label>検索（名前・目的・タグ）</label>
            <input
              className="admin-input"
              style={{ width: "100%" }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="キーワード"
            />
          </div>
        </div>

        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>お客様</th>
                <th>目的</th>
                <th>タグ</th>
                <th>店舗</th>
                <th>来店</th>
                <th>最終来店</th>
                <th>状態</th>
                <th>次アクション</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8}><div className="admin-empty">該当する顧客はいません。</div></td></tr>
              )}
              {filtered.map((c) => (
                <tr key={c.line_user_id}>
                  <td>{c.display_name ?? "（名前未取得）"}</td>
                  <td>{c.main_purpose ?? "—"}</td>
                  <td>
                    {c.tags.length === 0 ? (
                      <span style={{ color: "var(--a-soft)" }}>—</span>
                    ) : (
                      <span style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {c.tags.map((t) => (
                          <span key={t} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "#eef0e8", color: "#5d6242" }}>{t}</span>
                        ))}
                      </span>
                    )}
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{storeName(c.store_id)}</td>
                  <td style={{ whiteSpace: "nowrap" }}>{c.visit_count}回</td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {c.last_visit ?? "—"}
                    {c.days_since_last != null && (
                      <div style={{ fontSize: 11, color: "var(--a-soft)" }}>{c.days_since_last}日前</div>
                    )}
                  </td>
                  <td><Badge status={c.status} /></td>
                  <td style={{ fontSize: 12 }}>{c.next_action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--a-soft)", marginTop: 12 }}>
          {filtered.length} 名を表示中（全 {customers.length} 名）
        </p>
      </div>
    </div>
  );
}
