"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import AdminTabs from "./AdminTabs";
import {
  type Reservation,
  type ReservationStatus,
  type Store,
  STATUS_LABEL,
  STATUS_ORDER,
} from "@/lib/types";

const todayStr = () => new Date().toISOString().slice(0, 10);

export default function Dashboard({
  initialReservations,
  stores,
}: {
  initialReservations: Reservation[];
  stores: Store[];
}) {
  const supabase = createClient();

  const [rows, setRows] = useState<Reservation[]>(initialReservations);
  const [storeFilter, setStoreFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  const [showAdd, setShowAdd] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const storeName = (id: string) => stores.find((s) => s.id === id)?.name ?? id;

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (storeFilter !== "all" && r.store_id !== storeFilter) return false;
      if (statusFilter !== "all" && r.status !== statusFilter) return false;
      if (dateFrom && r.reserved_date < dateFrom) return false;
      if (keyword) {
        const k = keyword.toLowerCase();
        const hay = `${r.customer_name} ${r.phone ?? ""} ${r.email ?? ""} ${r.menu ?? ""}`.toLowerCase();
        if (!hay.includes(k)) return false;
      }
      return true;
    });
  }, [rows, storeFilter, statusFilter, dateFrom, keyword]);

  const stats = useMemo(() => {
    const today = todayStr();
    return {
      total: rows.length,
      pending: rows.filter((r) => r.status === "pending").length,
      today: rows.filter((r) => r.reserved_date === today && r.status !== "cancelled").length,
      upcoming: rows.filter((r) => r.reserved_date >= today && r.status === "confirmed").length,
    };
  }, [rows]);

  async function changeStatus(id: string, status: ReservationStatus) {
    setBusy(id);
    const prev = rows;
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from("herb_reservations").update({ status }).eq("id", id);
    if (error) {
      alert("更新に失敗しました：" + error.message);
      setRows(prev);
    }
    setBusy(null);
  }

  async function remove(id: string) {
    if (!confirm("この予約を削除しますか？")) return;
    setBusy(id);
    const prev = rows;
    setRows((rs) => rs.filter((r) => r.id !== id));
    const { error } = await supabase.from("herb_reservations").delete().eq("id", id);
    if (error) {
      alert("削除に失敗しました：" + error.message);
      setRows(prev);
    }
    setBusy(null);
  }

  async function addReservation(data: Omit<Reservation, "id" | "created_at" | "status"> & { status: ReservationStatus }) {
    const { data: inserted, error } = await supabase
      .from("herb_reservations")
      .insert(data)
      .select()
      .single();
    if (error) {
      alert("登録に失敗しました：" + error.message);
      return false;
    }
    setRows((rs) => [...rs, inserted as Reservation]);
    setShowAdd(false);
    return true;
  }

  return (
    <div className="admin">
      <AdminTabs />

      <div className="admin-wrap">
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <button className="admin-btn admin-btn--primary admin-btn--sm" onClick={() => setShowAdd(true)}>
            ＋ 予約を追加
          </button>
        </div>
        {/* stats */}
        <div className="admin-stats">
          <div className="admin-stat"><div className="admin-stat__num">{stats.today}</div><div className="admin-stat__label">本日の予約</div></div>
          <div className="admin-stat"><div className="admin-stat__num">{stats.pending}</div><div className="admin-stat__label">未対応</div></div>
          <div className="admin-stat"><div className="admin-stat__num">{stats.upcoming}</div><div className="admin-stat__label">確定（今後）</div></div>
          <div className="admin-stat"><div className="admin-stat__num">{stats.total}</div><div className="admin-stat__label">全予約</div></div>
        </div>

        {/* filters */}
        <div className="admin-toolbar">
          <div className="admin-field">
            <label>店舗</label>
            <select className="admin-select" value={storeFilter} onChange={(e) => setStoreFilter(e.target.value)}>
              <option value="all">すべての店舗</option>
              {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="admin-field">
            <label>ステータス</label>
            <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">すべて</option>
              {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
          </div>
          <div className="admin-field">
            <label>この日付以降</label>
            <input type="date" className="admin-input" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          </div>
          <div className="admin-field" style={{ flex: 1, minWidth: 160 }}>
            <label>検索（名前・電話・メニュー）</label>
            <input className="admin-input" style={{ width: "100%" }} value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="キーワード" />
          </div>
        </div>

        {/* table */}
        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>日時</th>
                <th>店舗</th>
                <th>お客様</th>
                <th>人数</th>
                <th>メニュー</th>
                <th>連絡先</th>
                <th>ステータス</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={8}><div className="admin-empty">該当する予約はありません。</div></td></tr>
              )}
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {r.reserved_date}<br />
                    <span style={{ color: "var(--a-soft)" }}>{r.reserved_time}</span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>{storeName(r.store_id)}</td>
                  <td>
                    {r.customer_name}
                    {r.note && <div style={{ fontSize: 11, color: "var(--a-soft)" }}>📝 {r.note}</div>}
                  </td>
                  <td>{r.num_people}名</td>
                  <td>{r.menu ?? "—"}</td>
                  <td style={{ fontSize: 12 }}>
                    {r.phone && <div>{r.phone}</div>}
                    {r.email && <div style={{ color: "var(--a-soft)" }}>{r.email}</div>}
                    {!r.phone && !r.email && "—"}
                  </td>
                  <td>
                    <select
                      className={`status-select badge--${r.status}`}
                      value={r.status}
                      disabled={busy === r.id}
                      onChange={(e) => changeStatus(r.id, e.target.value as ReservationStatus)}
                    >
                      {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                    </select>
                  </td>
                  <td>
                    <button className="admin-btn admin-btn--danger admin-btn--sm" disabled={busy === r.id} onClick={() => remove(r.id)}>
                      削除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12, color: "var(--a-soft)", marginTop: 12 }}>
          {filtered.length} 件を表示中（全 {rows.length} 件）
        </p>
      </div>

      {showAdd && (
        <AddModal stores={stores} onClose={() => setShowAdd(false)} onSubmit={addReservation} />
      )}
    </div>
  );
}

function AddModal({
  stores,
  onClose,
  onSubmit,
}: {
  stores: Store[];
  onClose: () => void;
  onSubmit: (d: Omit<Reservation, "id" | "created_at" | "status"> & { status: ReservationStatus }) => Promise<boolean>;
}) {
  const [f, setF] = useState({
    store_id: stores[0]?.id ?? "",
    customer_name: "",
    phone: "",
    email: "",
    menu: "",
    reserved_date: todayStr(),
    reserved_time: "10:00",
    num_people: 1,
    note: "",
    status: "confirmed" as ReservationStatus,
  });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const ok = await onSubmit({
      store_id: f.store_id,
      customer_name: f.customer_name,
      phone: f.phone || null,
      email: f.email || null,
      menu: f.menu || null,
      reserved_date: f.reserved_date,
      reserved_time: f.reserved_time,
      num_people: Number(f.num_people),
      note: f.note || null,
      is_block: false,
      status: f.status,
    });
    if (!ok) setSaving(false);
  }

  const upd = (k: string, v: string | number) => setF((p) => ({ ...p, [k]: v }));

  return (
    <div className="admin-modal-bg" onClick={onClose}>
      <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>予約を追加（電話予約など）</h3>
        <div className="admin-field">
          <label>店舗</label>
          <select className="admin-select" value={f.store_id} onChange={(e) => upd("store_id", e.target.value)}>
            {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="admin-field">
          <label>お客様名 *</label>
          <input className="admin-input" required value={f.customer_name} onChange={(e) => upd("customer_name", e.target.value)} />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="admin-field" style={{ flex: 1 }}>
            <label>日付 *</label>
            <input type="date" className="admin-input" required value={f.reserved_date} onChange={(e) => upd("reserved_date", e.target.value)} />
          </div>
          <div className="admin-field" style={{ flex: 1 }}>
            <label>時間 *</label>
            <input type="time" className="admin-input" required value={f.reserved_time} onChange={(e) => upd("reserved_time", e.target.value)} />
          </div>
          <div className="admin-field" style={{ width: 90 }}>
            <label>人数</label>
            <input type="number" min={1} className="admin-input" value={f.num_people} onChange={(e) => upd("num_people", e.target.value)} />
          </div>
        </div>
        <div className="admin-field">
          <label>メニュー</label>
          <input className="admin-input" value={f.menu} onChange={(e) => upd("menu", e.target.value)} placeholder="例：ハーブ蒸し(30min)" />
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="admin-field" style={{ flex: 1 }}>
            <label>電話</label>
            <input className="admin-input" value={f.phone} onChange={(e) => upd("phone", e.target.value)} />
          </div>
          <div className="admin-field" style={{ flex: 1 }}>
            <label>メール</label>
            <input className="admin-input" value={f.email} onChange={(e) => upd("email", e.target.value)} />
          </div>
        </div>
        <div className="admin-field">
          <label>メモ</label>
          <input className="admin-input" value={f.note} onChange={(e) => upd("note", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>ステータス</label>
          <select className="admin-select" value={f.status} onChange={(e) => upd("status", e.target.value)}>
            {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
          </select>
        </div>
        <div className="admin-modal__actions">
          <button type="button" className="admin-btn" onClick={onClose}>キャンセル</button>
          <button className="admin-btn admin-btn--primary" disabled={saving}>{saving ? "登録中..." : "登録する"}</button>
        </div>
      </form>
    </div>
  );
}
