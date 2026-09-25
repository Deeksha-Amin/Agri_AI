import React, { useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Leaf, ShieldAlert } from 'lucide-react';
import { ImagePreview } from './ImagePreview';

export const ImageUploadCard = ({ type, title, description, badgeText, modelName, file, previewUrl, onSelect, onRemove }) => {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      if (['image/jpeg', 'image/png', 'image/jpg'].includes(f.type)) {
        onSelect(f);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-emerald-300 transition-all flex flex-col">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            {type === 'leaf' ? '🌿' : type === 'fruit' ? '🍅' : '🪴'}
          </div>
          <h3 className="font-bold text-slate-900 text-base">{title}</h3>
        </div>
        <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          {badgeText}
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-4">{description}</p>

      {/* Upload area or Preview */}
      {file && previewUrl ? (
        <ImagePreview
          file={file}
          previewUrl={previewUrl}
          type={type}
          onRemove={onRemove}
          onReplace={onSelect}
        />
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-xl p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-emerald-50/30 flex flex-col items-center justify-center min-h-[200px]"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Drag & Drop {type} image here
          </p>
          <p className="text-xs text-slate-400 mt-1 mb-3">
            or <span className="text-emerald-700 font-bold underline">Browse File</span>
          </p>
          <span className="text-[11px] text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-md">
            Formats: JPG, JPEG, PNG (Max 16MB)
          </span>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) => e.target.files[0] && onSelect(e.target.files[0])}
            className="hidden"
          />
        </div>
      )}

      {/* Model Badge */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="font-medium text-slate-600">Model Engine:</span>
        <span className="font-semibold text-emerald-800 bg-slate-100 px-2 py-0.5 rounded">
          {modelName}
        </span>
      </div>
    </div>
  );
};
