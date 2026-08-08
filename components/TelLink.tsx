"use client";

import { gaEvent } from "@/lib/gtag";

/** 電話番号のタップリンク。クリックをGA4に送信する */
export default function TelLink({ tel, storeId, className }: { tel: string; storeId: string; className?: string }) {
  return (
    <a
      className={className}
      href={`tel:${tel.replace(/[^0-9+]/g, "")}`}
      onClick={() => gaEvent("click_tel", { store_id: storeId })}
    >
      {tel}
    </a>
  );
}
