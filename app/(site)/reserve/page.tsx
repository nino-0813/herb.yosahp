"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Headline, Footer } from "@/components/ui";
import type { Store } from "@/lib/types";

export default function ReservePage() {
  const supabase = createClient();
  const [stores, setStores] = useState<Store[]>([]);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [f, setF] = useState({
    store_id: "",
    customer_name: "",
    phone: "",
    email: "",
    menu: "",
    reserved_date: "",
    reserved_time: "10:00",
    num_people: 1,
    note: "",
  });

  useEffect(() => {
    supabase
      .from("herb_stores")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .then(({ data }) => {
        const list = (data ?? []) as Store[];
        setStores(list);
        setF((p) => ({ ...p, store_id: list[0]?.id ?? "" }));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const upd = (k: string, v: string | number) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error } = await supabase.from("herb_reservations").insert({
      store_id: f.store_id,
      customer_name: f.customer_name,
      phone: f.phone || null,
      email: f.email || null,
      menu: f.menu || null,
      reserved_date: f.reserved_date,
      reserved_time: f.reserved_time,
      num_people: Number(f.num_people),
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

          <label className="rf-field">
            <span>店舗 *</span>
            <select className="admin-select" required value={f.store_id} onChange={(e) => upd("store_id", e.target.value)}>
              {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>

          <div className="rf-row">
            <label className="rf-field">
              <span>ご希望日 *</span>
              <input type="date" className="admin-input" required value={f.reserved_date} onChange={(e) => upd("reserved_date", e.target.value)} />
            </label>
            <label className="rf-field">
              <span>ご希望時間 *</span>
              <input type="time" className="admin-input" required value={f.reserved_time} onChange={(e) => upd("reserved_time", e.target.value)} />
            </label>
            <label className="rf-field" style={{ maxWidth: 110 }}>
              <span>人数</span>
              <input type="number" min={1} className="admin-input" value={f.num_people} onChange={(e) => upd("num_people", e.target.value)} />
            </label>
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

          <div className="center" style={{ marginTop: 30 }}>
            <button className="btn btn--solid" disabled={saving}>
              {saving ? "送信中..." : "この内容で予約する"}
            </button>
          </div>
        </form>
      </div>
      <div className="spacer-lg" />
      <Footer />
    </>
  );
}
