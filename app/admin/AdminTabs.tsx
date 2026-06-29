"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminTabs() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const tab = (href: string, label: string) => (
    <Link href={href} className={`admin-tab ${pathname === href ? "is-on" : ""}`}>
      {label}
    </Link>
  );

  return (
    <header className="admin-header">
      <div className="admin-header__title">
        予約管理<span>よもぎ蒸しサロン</span>
      </div>
      <nav className="admin-tabs">
        {tab("/admin", "予約一覧")}
        {tab("/admin/schedule", "スケジュール")}
      </nav>
      <button className="admin-btn admin-btn--sm" onClick={logout}>ログアウト</button>
    </header>
  );
}
