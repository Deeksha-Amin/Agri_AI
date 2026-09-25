import React from "react";

export const DiseaseResultCard = ({ diagnosis, affectedPart, category }) => {
  const isHealthy = diagnosis?.toLowerCase().includes("healthy");

  const cardClass = "rounded-2xl border p-6 md:p-8 shadow-sm " + (isHealthy ? "bg-emerald-50/70 border-emerald-200" : "bg-white border-slate-200");
  const badgeClass = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide " + (isHealthy ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800");

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">FINAL DIAGNOSIS</span>
        <span className={badgeClass}>
          {category || "Fungal Disease"}
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        {diagnosis || "Early Blight"}
      </h2>

      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 pt-2 border-t border-slate-100">
        <div>
          <span className="font-semibold text-slate-800">Affected Part:</span> {affectedPart || "Leaf"}
        </div>
        <div className="h-4 w-px bg-slate-300 hidden sm:block" />
        <div>
          <span className="font-semibold text-slate-800">Primary Model:</span> DenseNet121 (Leaf Classifier)
        </div>
      </div>
    </div>
  );
};

