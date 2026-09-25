import React from "react";

export const ConfidenceBar = ({ label, confidence, status = "Analyzed", model = "" }) => {
  const isNumeric = typeof confidence === "number";
  const val = isNumeric ? Math.min(100, Math.max(0, confidence)) : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
      <div className="flex items-center justify-between mb-2 text-sm">
        <div>
          <span className="font-bold text-slate-900">{label} Confidence</span>
          {model && <span className="ml-2 text-xs text-slate-400 font-mono">({model})</span>}
        </div>
        <span className="font-extrabold text-emerald-800 text-base">
          {isNumeric ? val.toFixed(1) + "%" : confidence}
        </span>
      </div>

      {isNumeric ? (
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-full transition-all duration-1000 ease-out"
            style={{ width: val + "%" }}
          />
        </div>
      ) : (
        <div className="bg-slate-100 text-slate-500 text-xs px-3 py-1.5 rounded-md font-medium text-center">
          {status}
        </div>
      )}
    </div>
  );
};

