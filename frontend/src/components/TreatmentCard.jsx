import React from 'react';
import { FlaskConical, Sprout, Shield, CheckSquare } from 'lucide-react';

export const TreatmentCard = ({ treatments }) => {
  const chem = treatments?.chemical || {};
  const org = treatments?.organic || {};
  const prev = treatments?.preventive || [];
  const best = treatments?.best_practices || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* 1. Chemical Treatment */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <FlaskConical className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Chemical Treatment</h4>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p><span className="font-semibold text-slate-800">Recommended Product:</span> {chem.name || 'N/A'}</p>
            <p><span className="font-semibold text-slate-800">Dosage:</span> {chem.dosage || 'N/A'}</p>
            <p><span className="font-semibold text-slate-800">Application Interval:</span> {chem.interval || 'N/A'}</p>
          </div>
        </div>

        {/* 2. Organic Treatment */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Organic Treatment</h4>
          </div>
          <div className="space-y-2 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">{org.name || 'Neem oil / Bio-fungicide'}</p>
            {org.options && (
              <ul className="list-disc list-inside space-y-1 text-slate-600 pt-1">
                {org.options.map((opt, idx) => (
                  <li key={idx}>{opt}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 3. Preventive Measures */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Preventive Measures</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {prev.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-amber-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Best Practices */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <CheckSquare className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">Best Practices</h4>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {best.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
        <span className="font-bold text-slate-700">Notice:</span> Treatment information is provided for project recommendation purposes. Follow product labels and local agricultural extension guidelines prior to chemical application.
      </p>
    </div>
  );
};
