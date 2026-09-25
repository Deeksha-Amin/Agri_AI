import React from "react";

export const SectionTitle = ({ title, subtitle, centered = false }) => {
  return (
    <div className={"mb-10 " + (centered ? "text-center" : "")}>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-base text-slate-600 max-w-3xl leading-relaxed">{subtitle}</p>}
      <div className={"mt-3 h-1 w-16 bg-emerald-600 rounded-full " + (centered ? "mx-auto" : "")} />
    </div>
  );
};

