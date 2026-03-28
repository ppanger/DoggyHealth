import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled, className = '' }) => {
  const baseClasses = 'px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-cartoon-pink to-cartoon-purple text-white hover:shadow-lg hover:-translate-y-1',
    secondary: 'bg-white text-cartoon-pink border-4 border-cartoon-pink hover:bg-cartoon-pink/10',
    ghost: 'bg-transparent text-cartoon-pink hover:bg-cartoon-pink/10'
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;