import React from "react";

export default function PageVisuals() {
  return (
    <>
      <style>{`
        /* Subtle page-scoped tints based on logo color #0f002e */
        .joy-cluster{position:absolute;top:10px;right:12px;display:flex;gap:8px;z-index:40}
        .joy-dot{width:12px;height:12px;border-radius:9999px;background:linear-gradient(45deg,rgba(15,0,46,0.12),#ffd28a);box-shadow:0 6px 18px rgba(15,0,46,0.06);animation:float 3.8s ease-in-out infinite}
        .joy-dot:nth-child(2){width:10px;height:10px;animation-delay:.25s;background:linear-gradient(45deg,rgba(15,0,46,0.10),#bfe9c7)}
        .joy-dot:nth-child(3){width:8px;height:8px;animation-delay:.5s;background:linear-gradient(45deg,rgba(15,0,46,0.08),#f6b3ff)}
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-6px)}100%{transform:translateY(0)} }
        .accent-line{height:6px;border-radius:999px;margin-top:12px;background:linear-gradient(90deg,rgba(15,0,46,0.06),rgba(15,0,46,0.02))}
        .highlight-card{transition:transform .25s ease, box-shadow .25s ease}
        .highlight-card:hover{transform:translateY(-6px);box-shadow:0 12px 30px rgba(15,0,46,0.12)}
        .icon-wrap{width:40px;height:40px;border-radius:10px;background:white;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(15,0,46,0.06)}
      `}</style>

      <div className="joy-cluster" aria-hidden>
        <div className="joy-dot" />
        <div className="joy-dot" />
        <div className="joy-dot" />
      </div>
    </>
  );
}
