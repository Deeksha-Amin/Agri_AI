import React from "react";

export const Button = ({ children, variant = "primary", size = "md", className = "", disabled = false, ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-600 shadow-sm hover:shadow",
    secondary: "bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 focus:ring-emerald-500 shadow-xs",
    outline: "bg-transparent text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 shadow-sm"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base font-bold"
  };

  const combinedClass = baseStyles + " " + (variants[variant] || variants.primary) + " " + (sizes[size] || sizes.md) + " " + className;

  return (
    <button
      disabled={disabled}
      className={combinedClass}
      {...props}
    >
      {children}
    </button>
  );
};

