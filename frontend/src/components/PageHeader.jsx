import React from 'react';

export const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 mb-10 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-2 text-emerald-100 text-base max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
};
