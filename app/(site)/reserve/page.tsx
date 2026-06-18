"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Headline, Footer } from "@/components/ui";
import type { Store } from "@/lib/types";
import { dateRange, genSlots, normTime, WEEKDAY_JP, ymd } from "@/lib/slots";

const DAYS_AHEAD = 21;

export default function ReservePage() {
  const supabase = createClient();
  const [stores, setStores] = useState<Store[]>([]);
  const [storeId, setStoreId] = useState("");
  const [date, setDate] = useState<string>("");
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [time, setTime] = useState<string>("");

  const [f, setF] = useState({ customer_name: "", phone: "", email: "", menu: "", note: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const store = stores.find((s) => s.id === storeId);

  // 店舗読み込み
  useEffect(() => {
    supabase
      .from("herb_stores")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .then(({ data }) => {
        const list = (data ?? []) as Store[];
        setStores(list);
        setStoreId((prev) => prev || list[0]?.id || "");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 店舗・日付が変わったら空き件数を取得
  const loadCounts = useCallback(
    async (sid: string, d: string) => {
      if (!sid || !d) return;
      setLoadingSlots(true);
      const { data } = await supabase.rpc("herb_slot_counts", {
        p_store: sid,
        p_from: d,
        p_to: d,
      });
      const map: Record<string, number> = {};
      (data ?? []).forEach((r: { reserved_time: string; cnt: number }) => {
        map[normTime(r.reserved_time)] = (map[normTime(r.reserved_time)] || 0) + Number(r.cnt);
      });
      setCounts(map);
      setLoadingSlots(false);
    },
    [supabase]
  );

  useEffect(() => {
    setTime("");
    if (storeId && date) loadCounts(storeId, date);
  }, [storeId, date, loadCounts]);

  const upd = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!time) {
      setError("ご希望の時間枠を選んでください。");
      return;
    }
    setSaving(true);
    setError("");
    const { error } = await supabase.from("herb_reservations").insert({
      store_id: storeId,
      customer_name: f.customer_name,
      phone: f.phone || null,
      email: f.email || null,
      menu: f.menu || null,
      reserved_date: date,
      reserved_time: time,
      num_people: 1,
      note: f.note || null,
      status: "pending",
    });
    if (error) {
      setError("送信に失敗しました。お手数ですがお電話でもご連絡ください。");
      setSaving(false);
      return;
    }
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <>
        <Headline en="thank you" jp="ご予約ありがとうございます" />
        <div className="container">
          <p className="lede lede--ink">
            ご予約の仮申込みを受け付けました。
            <br />
            店舗より確認のご連絡をいたしますので、少々お待ちください。
          </p>
        </div>
        <div className="spacer-lg" />
        <Footer />
      </>
    );
  }

  const dates = dateRange(DAYS_AHEAD);
  const slots = store ? genSlots(store) : [];
  const capacity = store?.capacity ?? 1;
  const closed = store?.closed_weekdays ?? [];

  return (
    <>
      <Headline en="reservation" jp="ご予約フォーム" />
      <div className="container">
        <p className="lede">
          ご希望の店舗・日時をお選びください。
          <br />
          このフォームは仮予約です。店舗より確認のご連絡をいたします。
        </p>

        <form className="reserve-form" onSubmit={submit}>
          {error && <div className="admin-error" style={{ marginBottom: 18 }}>{error}</div>}

          {/* STEP 1 店舗 */}
          <div className="rf-step">
            <span className="rf-step__no">1</span>店舗を選ぶ
          </div>
          <div className="rf-stores">
            {stores.map((s) => (
              <button
                type="button"
                key={s.id}
                className={`rf-store ${storeId === s.id ? "is-on" : ""}`}
                onClick={() => { setStoreId(s.id); setDate(""); setTime(""); }}
              >
                {s.name}
              </button>
            ))}
          </div>

          {/* STEP 2 日付 */}
          <div className="rf-step">
            <span className="rf-step__no">2</span>日付を選ぶ
          </div>
          <div className="rf-dates">
            {dates.map((d) => {
              const key = ymd(d);
              const wd = d.getDay();
              const isClosed = closed.includes(wd);
              return (
                <button
                  type="button"
                  key={key}
                  disabled={isClosed}
                  className={`rf-date ${date === key ? "is-on" : ""} ${isClosed ? "is-closed" : ""} ${wd === 0 ? "is-sun" : ""} ${wd === 6 ? "is-sat" : ""}`}
                  onClick={() => setDate(key)}
                >
                  <span className="rf-date__md">{d.getMonth() + 1}/{d.getDate()}</span>
                  <span className="rf-date__wd">{isClosed ? "休" : WEEKDAY_JP[wd]}</span>
                </button>
              );
            })}
          </div>

          {/* STEP 3 時間枠 */}
          {date && (
            <>
              <div className="rf-step">
                <span className="rf-step__no">3</span>時間を選ぶ
                <span className="rf-legend">○ 空き　× 満</span>
              </div>
              {loadingSlots ? (
                <p className="rf-loading">空き状況を確認中...</p>
              ) : (
                <div className="rf-slots">
                  {slots.map((t) => {
                    const used = counts[t] || 0;
                    const full = used >= capacity;
                    return (
                      <button
                        type="button"
                        key={t}
                        disabled={full}
                        className={`rf-slot ${time === t ? "is-on" : ""} ${full ? "is-full" : ""}`}
                        onClick={() => setTime(t)}
                      >
                        <span className="rf-slot__t">{t}</span>
                        <span className="rf-slot__mark">{full ? "×" : "○"}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {/* STEP 4 お客様情報 */}
          {time && (
            <>
              <div className="rf-step">
                <span className="rf-step__no">4</span>お客様情報
              </div>
              <div className="rf-pick">
                ご予約：<strong>{store?.name}</strong> / {date.replace(/-/g, ".")} / {time}〜
              </div>

              <label className="rf-field">
                <span>ご希望メニュー</span>
                <input className="admin-input" value={f.menu} onChange={(e) => upd("menu", e.target.value)} placeholder="例：ハーブ蒸し(30min)" />
              </label>
              <label className="rf-field">
                <span>お名前 *</span>
                <input className="admin-input" required value={f.customer_name} onChange={(e) => upd("customer_name", e.target.value)} />
              </label>
              <div className="rf-row">
                <label className="rf-field">
                  <span>電話番号 *</span>
                  <input className="admin-input" required value={f.phone} onChange={(e) => upd("phone", e.target.value)} />
                </label>
                <label className="rf-field">
                  <span>メールアドレス</span>
                  <input type="email" className="admin-input" value={f.email} onChange={(e) => upd("email", e.target.value)} />
                </label>
              </div>
              <label className="rf-field">
                <span>ご要望・備考</span>
                <textarea className="admin-input" rows={3} value={f.note} onChange={(e) => upd("note", e.target.value)} />
              </label>

              <div className="center" style={{ marginTop: 26 }}>
                <button className="btn btn--solid" disabled={saving}>
                  {saving ? "送信中..." : "この内容で予約する"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
      <div className="spacer-lg" />
      <Footer />
    </>
  );
}
