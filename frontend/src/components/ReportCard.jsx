import React, { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';
import { downloadPdfReport } from '../services/reportApi';

export const ReportCard = ({ resultData }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError(null);
    try {
      await downloadPdfReport(resultData);
    } catch (err) {
      console.error('Report download error:', err);
      setError('Failed to download PDF report. Ensure backend API is active.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-lg">Download PDF Diagnosis Report</h3>
          <p className="text-xs text-slate-500">Includes uploaded image, diagnosis, confidence score, treatment recommendations, and preventive guidance.</p>
          {error && <p className="text-xs text-rose-600 font-semibold mt-1">{error}</p>}
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors space-x-2 shadow-sm disabled:opacity-50"
      >
        {isDownloading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download PDF Report</span>
          </>
        )}
      </button>
    </div>
  );
};
