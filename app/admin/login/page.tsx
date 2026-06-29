"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("メールアドレスまたはパスワードが正しくありません。");
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="admin">
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={onSubmit}>
          <h1 className="admin-login__title">管理画面ログイン</h1>
          <p className="admin-login__sub">よもぎ蒸しサロン 予約管理</p>

          {error && <div className="admin-error">{error}</div>}

          <div className="admin-field">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              className="admin-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="admin-field">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              className="admin-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button className="admin-btn admin-btn--primary" style={{ width: "100%", marginTop: 8 }} disabled={loading}>
            {loading ? "ログイン中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
}
