"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  type Reservation,
  type ReservationStatus,
  type Store,
  STATUS_LABEL,
  STATUS_ORDER,
} from "@/lib/types";
import { genSlots, normTime, WEEKDAY_JP, ymd } from "@/lib/slots";
import AdminTabs from "./AdminTabs";

export default function Schedule({ stores }: { stores: Store[] }) {
  const supabase = createClient();
  const [storeId, setStoreId] = useState(stores[0]?.id ?? "");
  const [date, setDate] = useState(ymd(new Date()));
  const [rows, setRows] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalTime, setModalTime] = useState<string | null>(null);

  const store = stores.find((s) => s.id === storeId);

  const load = useCallback(
    async (sid: string, d: string) => {
      if (!sid || !d) return;
      setLoading(true);
      const { data } = await supabase
        .from("herb_reservations")
        .select("*")
        .eq("store_id", sid)
        .eq("reserved_date", d)
        .order("reserved_time");
      setRows((data ?? []) as Reservation[]);
      setLoading(false);
    },
    [supabase]
  );

  useEffect(() => {
    load(storeId, date);
  }, [storeId, date, load]);

  function shiftDay(delta: number) {
    const d = new Date(date + "T00:00:00");
    d.setDate(d.getDate() + delta);
    setDate(ymd(d));
  }

  async function del(id: string) {
    if (!confirm("この予約／ブロックを削除しますか？")) return;
    setRows((rs) => rs.filter((r) => r.id !== id));
    const { error } = await supabase.from("herb_reservations").delete().eq("id", id);
    if (error) { alert("削除に失敗：" + error.message); load(storeId, date); }
  }

  async function changeStatus(id: string, status: ReservationStatus) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    const { error } = await supabase.from("herb_reservations").update({ status }).eq("id", id);
    if (error) { alert("更新に失敗：" + error.message); load(storeId, date); }
  }

  const slots = store ? genSlots(store) : [];
  const capacity = store?.capacity ?? 1;
  const entriesAt = (t: string) =>
    rows.filter((r) => normTime(r.reserved_time) === t && r.status !== "cancelled");

  const wd = new Date(date + "T00:00:00").getDay();

  return (
    <div className="admin">
      <AdminTabs />

      <div className="admin-wrap">
        {/* 店舗タブ */}
        <div className="sch-stores">
          {stores.map((s) => (
            <button
              key={s.id}
              className={`sch-store ${storeId === s.id ? "is-on" : ""}`}
              onClick={() => setStoreId(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* 日付ナビ */}
        <div className="sch-datenav">
          <button className="admin-btn admin-btn--sm" onClick={() => shiftDay(-1)}>← 前日</button>
          <input type="date" className="admin-input" value={date} onChange={(e) => setDate(e.target.value)} style={{ minWidth: 0 }} />
          <span className="sch-wd">（{WEEKDAY_JP[wd]}）</span>
          <button className="admin-btn admin-btn--sm" onClick={() => shiftDay(1)}>翌日 →</button>
          <button className="admin-btn admin-btn--sm" onClick={() => setDate(ymd(new Date()))}>今日</button>
          <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--a-soft)" }}>
            営業 {store?.open_time?.slice(0, 5)}–{store?.close_time?.slice(0, 5)} / 同時 {capacity}件
          </span>
        </div>

        {/* スロット表 */}
        <div className="admin-table-card">
          {loading ? (
            <div className="admin-empty">読み込み中...</div>
          ) : slots.length === 0 ? (
            <div className="admin-empty">この店舗の営業時間が設定されていません。</div>
          ) : (
            <div className="sch-grid">
              {slots.map((t) => {
                const entries = entriesAt(t);
                const used = entries.length;
                const full = used >= capacity;
                return (
                  <div key={t} className={`sch-slot ${full ? "is-full" : "is-open"}`}>
                    <div className="sch-slot__time">{t}</div>
                    <div className="sch-slot__body">
                      {entries.map((r) => (
                        <div key={r.id} className={`sch-entry ${r.is_block ? "is-block" : ""}`}>
                          <div className="sch-entry__main">
                            {r.is_block ? (
                              <span className="sch-entry__name">🚫 {r.customer_name || "ブロック"}</span>
                            ) : (
                              <>
                                <span className="sch-entry__name">{r.customer_name}</span>
                                {r.menu && <span className="sch-entry__menu">{r.menu}</span>}
                                {r.phone && <span className="sch-entry__sub">{r.phone}</span>}
                              </>
                            )}
                          </div>
                          <div className="sch-entry__actions">
                            {!r.is_block && (
                              <select
                                className={`status-select badge--${r.status}`}
                                value={r.status}
                                onChange={(e) => changeStatus(r.id, e.target.value as ReservationStatus)}
                              >
                                {STATUS_ORDER.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                              </select>
                            )}
                            <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => del(r.id)}>削除</button>
                          </div>
                        </div>
                      ))}
                      {!full && (
                        <button className="sch-add" onClick={() => setModalTime(t)}>
                          ＋ この枠に入れる
                        </button>
                      )}
                      {full && used > 0 && <div className="sch-slot__fulltag">満席</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {modalTime && store && (
        <SlotModal
          store={store}
          date={date}
          time={modalTime}
          onClose={() => setModalTime(null)}
          onSaved={() => { setModalTime(null); load(storeId, date); }}
        />
      )}
    </div>
  );
}

function SlotModal({
  store, date, time, onClose, onSaved,
}: {
  store: Store; date: string; time: string; onClose: () => void; onSaved: () => void;
}) {
  const supabase = createClient();
  const [mode, setMode] = useState<"reserve" | "block">("reserve");
  const [f, setF] = useState({ customer_name: "", phone: "", email: "", menu: "", note: "" });
  const [saving, setSaving] = useState(false);
  const upd = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const isBlock = mode === "block";
    const payload = {
      store_id: store.id,
      customer_name: isBlock ? f.note || "ブロック" : f.customer_name,
      phone: isBlock ? null : f.phone || null,
      email: isBlock ? null : f.email || null,
      menu: isBlock ? null : f.menu || null,
      reserved_date: date,
      reserved_time: time,
      num_people: isBlock ? 0 : 1,
      status: "confirmed",
      is_block: isBlock,
      note: f.note || null,
    };
    const { error } = await supabase.from("herb_reservations").insert(payload);
    if (error) { alert("登録に失敗：" + error.message); setSaving(false); return; }
    onSaved();
  }

  return (
    <div className="admin-modal-bg" onClick={onClose}>
      <form className="admin-modal" onClick={(e) => e.stopPropagation()} onSubmit={save}>
        <h3>{store.name} / {date.replace(/-/g, ".")} / {time}〜</h3>

        <div className="sch-modetabs">
          <button type="button" className={mode === "reserve" ? "is-on" : ""} onClick={() => setMode("reserve")}>予約を入れる</button>
          <button type="button" className={mode === "block" ? "is-on" : ""} onClick={() => setMode("block")}>ブロック（休み）</button>
        </div>

        {mode === "reserve" ? (
          <>
            <div className="admin-field"><label>お客様名 *</label>
              <input className="admin-input" required value={f.customer_name} onChange={(e) => upd("customer_name", e.target.value)} /></div>
            <div className="admin-field"><label>メニュー</label>
              <input className="admin-input" value={f.menu} onChange={(e) => upd("menu", e.target.value)} placeholder="例：よもぎ蒸し(30min)" /></div>
            <div style={{ display: "flex", gap: 12 }}>
              <div className="admin-field" style={{ flex: 1 }}><label>電話</label>
                <input className="admin-input" value={f.phone} onChange={(e) => upd("phone", e.target.value)} /></div>
              <div className="admin-field" style={{ flex: 1 }}><label>メール</label>
                <input className="admin-input" value={f.email} onChange={(e) => upd("email", e.target.value)} /></div>
            </div>
            <div className="admin-field"><label>メモ</label>
              <input className="admin-input" value={f.note} onChange={(e) => upd("note", e.target.value)} /></div>
          </>
        ) : (
          <div className="admin-field">
            <label>ブロック理由（任意）</label>
            <input className="admin-input" value={f.note} onChange={(e) => upd("note", e.target.value)} placeholder="例：休憩 / 設営 / 貸切" />
            <p style={{ fontSize: 12, color: "var(--a-soft)", marginTop: 8 }}>
              この枠を「予約不可」にします。公開フォームでは × 表示になります。
            </p>
          </div>
        )}

        <div className="admin-modal__actions">
          <button type="button" className="admin-btn" onClick={onClose}>キャンセル</button>
          <button className="admin-btn admin-btn--primary" disabled={saving}>{saving ? "登録中..." : "登録する"}</button>
        </div>
      </form>
    </div>
  );
}
