import React from "react";
import { Trash2, RefreshCw, CheckCircle2 } from "lucide-react";

export const ImagePreview = ({ file, previewUrl, type, onRemove, onReplace }) => {
  const formatFileSize = (bytes) => {
    if (!bytes) return "0 KB";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="relative border border-emerald-200 rounded-xl overflow-hidden bg-white shadow-xs p-3 flex flex-col items-center">
      <div className="relative w-full h-44 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
        {previewUrl ? (
          <img src={previewUrl} alt={type + " preview"} className="w-full h-full object-cover" />
        ) : (
          <div className="text-slate-400 text-xs">No Preview</div>
        )}
        <div className="absolute top-2 right-2 bg-emerald-700/90 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full flex items-center space-x-1">
          <CheckCircle2 className="w-3 h-3" />
          <span className="capitalize">{type} Ready</span>
        </div>
      </div>

      <div className="w-full mt-3 flex items-center justify-between text-xs text-slate-600">
        <div className="truncate max-w-[160px] font-medium text-slate-800" title={file?.name}>
          {file?.name || "Uploaded Image"}
        </div>
        <div className="text-slate-500 font-mono text-[11px]">
          {formatFileSize(file?.size)}
        </div>
      </div>

      <div className="w-full mt-3 pt-2 border-t border-slate-100 flex items-center justify-between space-x-2">
        <label className="flex-1 inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors space-x-1">
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Replace</span>
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => e.target.files[0] && onReplace(e.target.files[0])}
            className="hidden"
          />
        </label>
        <button
          onClick={onRemove}
          className="inline-flex items-center justify-center px-3 py-1.5 rounded-md text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 transition-colors space-x-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};

