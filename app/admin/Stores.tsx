"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Store } from "@/lib/types";
import AdminTabs from "./AdminTabs";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

type EditableStore = Store;

function toTimeInput(t: string): string {
  return (t || "").slice(0, 5);
}

export default function Stores({ stores }: { stores: Store[] }) {
  const supabase = createClient();
  const [rows, setRows] = useState<EditableStore[]>(stores);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  function updRow(id: string, patch: Partial<EditableStore>) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function toggleWeekday(id: string, wd: number) {
    setRows((rs) =>
      rs.map((r) => {
        if (r.id !== id) return r;
        const has = r.closed_weekdays.includes(wd);
        const next = has ? r.closed_weekdays.filter((d) => d !== wd) : [...r.closed_weekdays, wd];
        return { ...r, closed_weekdays: next.sort() };
      })
    );
  }

  async function save(row: EditableStore) {
    setSavingId(row.id);
    setErrorId(null);
    const { error } = await supabase
      .from("herb_stores")
      .update({
        name: row.name,
        active: row.active,
        open_time: row.open_time,
        close_time: row.close_time,
        slot_minutes: row.slot_minutes,
        capacity: row.capacity,
        closed_weekdays: row.closed_weekdays,
        sale_start_date: row.sale_start_date,
        sale_end_date: row.sale_end_date,
      })
      .eq("id", row.id);
    setSavingId(null);
    if (error) {
      setErrorId(row.id);
      alert("保存に失敗しました：" + error.message);
      return;
    }
    setSavedId(row.id);
    setTimeout(() => setSavedId((cur) => (cur === row.id ? null : cur)), 2000);
  }

  return (
    <div className="admin">
      <AdminTabs />

      <div className="admin-wrap">
        {rows.length === 0 && (
          <div className="admin-empty">
            店舗データがありません。Supabaseの herb_stores テーブルを確認してください。
          </div>
        )}

        <div className="store-settings">
          {rows.map((s) => (
            <div className="store-settings__card" key={s.id}>
              <div className="store-settings__head">
                <input
                  className="admin-input store-settings__name"
                  value={s.name}
                  onChange={(e) => updRow(s.id, { name: e.target.value })}
                />
                <label className="store-settings__active">
                  <input
                    type="checkbox"
                    checked={s.active}
                    onChange={(e) => updRow(s.id, { active: e.target.checked })}
                  />
                  公開する（予約フォームに表示）
                </label>
              </div>

              <div className="store-settings__row">
                <div className="admin-field">
                  <label>開店時刻</label>
                  <input
                    type="time"
                    className="admin-input"
                    value={toTimeInput(s.open_time)}
                    onChange={(e) => updRow(s.id, { open_time: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>閉店時刻</label>
                  <input
                    type="time"
                    className="admin-input"
                    value={toTimeInput(s.close_time)}
                    onChange={(e) => updRow(s.id, { close_time: e.target.value })}
                  />
                </div>
                <div className="admin-field">
                  <label>予約枠の長さ（分）</label>
                  <input
                    type="number"
                    min={5}
                    step={5}
                    className="admin-input"
                    value={s.slot_minutes}
                    onChange={(e) => updRow(s.id, { slot_minutes: Number(e.target.value) || 0 })}
                  />
                </div>
                <div className="admin-field">
                  <label>同時受付件数</label>
                  <input
                    type="number"
                    min={1}
                    className="admin-input"
                    value={s.capacity}
                    onChange={(e) => updRow(s.id, { capacity: Number(e.target.value) || 1 })}
                  />
                </div>
              </div>

              <div className="store-settings__sale">
                <div className="store-settings__sale-title">予約の受付（販売）期間</div>
                <div className="store-settings__sale-row">
                  <div className="admin-field">
                    <label>販売開始日</label>
                    <input
                      type="date"
                      className="admin-input"
                      value={s.sale_start_date ?? ""}
                      onChange={(e) => updRow(s.id, { sale_start_date: e.target.value || null })}
                    />
                  </div>
                  <div className="admin-field">
                    <label>販売終了日</label>
                    <input
                      type="date"
                      className="admin-input"
                      value={s.sale_end_date ?? ""}
                      onChange={(e) => updRow(s.id, { sale_end_date: e.target.value || null })}
                    />
                  </div>
                  {(s.sale_start_date || s.sale_end_date) && (
                    <button
                      type="button"
                      className="admin-btn admin-btn--sm"
                      onClick={() => updRow(s.id, { sale_start_date: null, sale_end_date: null })}
                    >
                      期間をクリア（無期限に戻す）
                    </button>
                  )}
                </div>
                <p className="store-settings__sale-note">
                  未入力のままなら無期限で受付します。終了日を過ぎると、この店舗は予約フォームで選べなくなります。
                </p>
              </div>

              <div className="admin-field">
                <label>定休日</label>
                <div className="store-settings__weekdays">
                  {WEEKDAYS.map((wd, i) => (
                    <label key={i} className={`store-settings__wd ${s.closed_weekdays.includes(i) ? "is-off" : ""}`}>
                      <input
                        type="checkbox"
                        checked={s.closed_weekdays.includes(i)}
                        onChange={() => toggleWeekday(s.id, i)}
                      />
                      {wd}
                    </label>
                  ))}
                </div>
              </div>

              <div className="store-settings__actions">
                {errorId === s.id && <span style={{ color: "#b4453a", fontSize: 12 }}>保存に失敗しました</span>}
                {savedId === s.id && <span style={{ color: "#3f7a4f", fontSize: 12 }}>保存しました</span>}
                <button
                  className="admin-btn admin-btn--primary"
                  disabled={savingId === s.id}
                  onClick={() => save(s)}
                >
                  {savingId === s.id ? "保存中..." : "この店舗を保存"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
