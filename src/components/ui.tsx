import React from 'react';
import { motion } from 'motion/react';

// --- Card ---
interface CardProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  modeHue?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', active = false, modeHue = '', onClick }) => {
  const baseStyle = "bg-[rgba(15,20,40,0.6)] border rounded-2xl backdrop-blur-md p-5 transition-all duration-300";
  const borderStyle = active ? (modeHue ? `border-[${modeHue}]` : "border-[--color-primary]") : "border-[--color-border-default]";
  
  return (
    <motion.div 
      onClick={onClick}
      className={`${baseStyle} ${borderStyle} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      whileHover={onClick ? { y: -3, boxShadow: active ? `0 0 24px ${modeHue || 'rgba(99,102,241,0.12)'}` : '0 0 24px rgba(99,102,241,0.12)' } : {}}
      style={{
        backgroundColor: active ? (modeHue ? `${modeHue.replace('1)', '0.05)')}` : 'var(--color-primary-muted)') : undefined
      }}
    >
      {children}
    </motion.div>
  );
};

// --- Buttons ---
export const ButtonPrimary = ({ children, onClick, className = '', disabled }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`bg-[--color-primary] hover:bg-[--color-primary-hover] text-white rounded-xl px-4 h-10 font-medium text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

export const ButtonGhost = ({ children, onClick, className = '' }: any) => (
  <button 
    onClick={onClick}
    className={`bg-transparent border border-[--color-border-default] text-[--color-text-secondary] hover:border-slate-500 hover:text-[--color-text-primary] rounded-xl px-4 h-10 font-medium text-sm transition-colors ${className}`}
  >
    {children}
  </button>
);

export const ButtonDanger = ({ children, onClick, className = '' }: any) => (
  <button 
    onClick={onClick}
    className={`bg-transparent border border-[--color-border-default] text-[--color-error] hover:border-[rgba(251,113,133,0.5)] rounded-xl px-4 h-10 font-medium text-sm transition-colors ${className}`}
  >
    {children}
  </button>
);

export const IconButton = ({ icon: Icon, onClick, active = false, className = '' }: any) => (
  <button
    onClick={onClick}
    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
      active 
        ? 'bg-[rgba(251,113,133,0.3)] text-[--color-error]' 
        : 'bg-[rgba(30,41,59,0.6)] text-[--color-text-muted] hover:bg-[rgba(71,85,105,0.6)] hover:text-[--color-text-primary]'
    } ${className}`}
  >
    <Icon size={14} />
  </button>
);

// --- Chips ---
export const Chip = ({ children, variant = 'neutral', color, bg, border, className = '' }: any) => {
  let styleClass = '';
  
  if (color && bg && border) {
    // Custom semantic styling (for modes)
    return (
      <span 
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${className}`}
        style={{ color, backgroundColor: bg, borderColor: border, borderWidth: 1 }}
      >
        {children}
      </span>
    );
  }

  switch (variant) {
    case 'primary': styleClass = 'bg-[--color-primary-muted] text-[--color-primary-hover] border border-[--color-primary-border]'; break;
    case 'success': styleClass = 'bg-[rgba(52,211,153,0.15)] text-[#6ee7b7] border border-[rgba(52,211,153,0.30)]'; break;
    case 'warning': styleClass = 'bg-[rgba(251,191,36,0.15)] text-[#fcd34d] border border-[rgba(251,191,36,0.30)]'; break;
    case 'danger': styleClass = 'bg-[rgba(251,113,133,0.10)] text-[#fca5a5] border border-[rgba(251,113,133,0.30)]'; break;
    default: styleClass = 'bg-[rgba(71,85,105,0.30)] text-[--color-text-secondary] border border-[rgba(100,116,139,0.40)]';
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-wide ${styleClass} ${className}`}>
      {children}
    </span>
  );
};
