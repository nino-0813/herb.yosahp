"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SITE } from "@/site.config";
import { ReserveLink } from "./ui";

/** スマホ幅では全ページを1枚のLP（トップページ）に集約しているため、
 *  ナビは別ページへ遷移せず、トップページ内の該当セクションへスクロールさせる。 */
export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const close = () => setOpen(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 880px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
            <span className="logo__name">{SITE.brand}</span>
          </span>
        </Link>

        <nav className="nav">
          {NAV.map((item) => {
            const useAnchor = isMobile && item.id;
            const href = useAnchor ? `/#${item.id}` : item.href;
            return (
              <Link
                key={item.href}
                href={href}
                onClick={close}
                className={!useAnchor && pathname === item.href ? "is-active" : ""}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <ReserveLink className="header-reserve" eventLabel="header_reserve">
          <svg className="header-reserve__calendar" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
          </svg>
          <span>予約する</span>
          <svg className="header-reserve__arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </ReserveLink>

      </aside>

      <ReserveLink className="floating-reserve" eventLabel="floating_reserve">
        <img className="floating-reserve__ring" src="/reference/reserve-ring.webp" alt="" aria-hidden="true" />
        <span className="floating-reserve__center">
          <span className="floating-reserve__en">Reserve</span>
          <span className="floating-reserve__jp">ご予約</span>
        </span>
      </ReserveLink>
    </>
  );
}
