"use client";

import { useEffect, useState } from "react";
import Leaf from "./Leaf";
import { SITE } from "@/site.config";

type Phase = "init" | "show" | "leaving" | "done";

/**
 * オープニング演出：真っ白 → ON:Uロゴが浮かぶ → 湯気のようにふわっと消えて本編が現れる。
 * 1セッションに1回だけ再生。動きを抑える設定（prefers-reduced-motion）の場合は再生しない。
 */
export default function Intro() {
  const [phase, setPhase] = useState<Phase>("init");

  useEffect(() => {
    const seen = sessionStorage.getItem("onu_intro_seen");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("onu_intro_seen", "1");
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const raf = requestAnimationFrame(() => setPhase("show"));
    const t1 = setTimeout(() => setPhase("leaving"), 2600);
    const t2 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 4000);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div className={`intro intro--${phase}`} aria-hidden="true">
      <div className="intro__steam">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="intro__logo">
        <span className="intro__caption">{SITE.brandCaption}</span>
        <span className="intro__mark">
          <Leaf className="intro__leaf" />
          <span className="intro__name">{SITE.brand}</span>
        </span>
        <span className="intro__tag">{SITE.catch.en}</span>
      </div>
    </div>
  );
}
