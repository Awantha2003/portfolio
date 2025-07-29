import React from 'react';
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  icon,
  href,
  type = 'button',
  disabled = false
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-md text-sm transition-all duration-300 overflow-hidden group';
  const variantStyles = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'bg-transparent text-white border border-orange-500 hover:bg-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed'
  };
  const content = <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </span>
      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      <span className="absolute -inset-x-1 -bottom-1 h-0.5 bg-orange-400 opacity-50 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
    </>;
  if (href) {
    return <a href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
        {content}
      </a>;
  }
  return <button 
      type={type}
      disabled={disabled}
      onClick={onClick} 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {content}
    </button>;
};
export default Button;