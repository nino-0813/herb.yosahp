"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/site.config";
import Leaf from "./Leaf";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  return (
    <>
      {/* モバイル用ヘッダー */}
      <div className="mobile-bar">
        <Link href="/" className="mobile-bar__name" onClick={close}>
          {SITE.brand}
        </Link>
        <button className="hamburger" aria-label="メニュー" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </button>
      </div>

      <div className={`drawer-backdrop ${open ? "show" : ""}`} onClick={close} />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <Link href="/" className="logo" onClick={close}>
          <span className="logo__caption">{SITE.brandCaption}</span>
          <span className="logo__mark">
            <Leaf />
            <span className="logo__name">{SITE.brand}</span>
          </span>
        </Link>

        <nav className="nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              className={pathname === item.href ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a className="sidebar__cta" href={SITE.reserveUrl} target="_blank" rel="noopener noreferrer">
          RESERVE
        </a>
      </aside>
    </>
  );
}
