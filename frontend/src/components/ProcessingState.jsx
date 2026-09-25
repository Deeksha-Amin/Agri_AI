import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

export const ProcessingState = ({ currentStep }) => {
  const steps = [
    "Uploading Images...",
    "Preprocessing...",
    "Running DenseNet121...",
    "Decision Fusion & Generating Recommendations..."
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-slate-100 text-center">
        
        {/* Animated Spinner */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-5 animate-pulse">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">Analyzing Tomato Disease</h3>
        <p className="text-sm text-slate-500 mb-6">Please wait while the AI neural networks process your plant images.</p>

        {/* Current status highlight */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm font-semibold text-emerald-900 mb-6">
          {currentStep || "Processing..."}
        </div>

        {/* Steps List */}
        <div className="space-y-2.5 text-left text-xs">
          {steps.map((step, idx) => {
            const isDone = steps.indexOf(currentStep) > idx;
            const isCurrent = currentStep === step;

            return (
              <div key={idx} className="flex items-center space-x-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-emerald-600 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 flex-shrink-0" />
                )}
                <span className={ont-medium }>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
