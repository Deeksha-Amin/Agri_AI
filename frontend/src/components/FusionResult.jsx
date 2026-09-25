import React from 'react';
import { Layers, ShieldCheck } from 'lucide-react';

export const FusionResult = ({ summary, confidence, modalities = [] }) => {
  return (
    <div className="bg-emerald-950 text-white rounded-2xl p-6 shadow-md border border-emerald-900">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-800 text-emerald-200 flex items-center justify-center">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-lg leading-none text-white">Decision Fusion Result</h3>
          <span className="text-xs text-emerald-300">Multi-Modal Prediction Aggregation Engine</span>
        </div>
      </div>

      <p className="text-sm text-emerald-100 mt-2 mb-4 leading-relaxed">
        {summary || "Final diagnosis based on available plant modality predictions."}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-emerald-800 text-xs">
        <div>
          <span className="text-emerald-400 font-semibold">Contributing Modalities:</span>{' '}
          <span className="text-white font-bold">{modalities.length > 0 ? modalities.join(', ') : 'Leaf'}</span>
        </div>
        <div className="text-right">
          <span className="text-emerald-400 font-semibold">Fusion Score:</span>{' '}
          <span className="text-white font-extrabold text-sm">{confidence}%</span>
        </div>
      </div>
    </div>
  );
};
