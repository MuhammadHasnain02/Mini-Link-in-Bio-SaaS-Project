import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full px-6 py-2.5 text-sm";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-sm",
    outline: "bg-transparent text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
