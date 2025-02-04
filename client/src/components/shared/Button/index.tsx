import React from 'react';

interface ButtonProps {
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    variant?: 'default' | 'text';
}

// eslint-disable-next-line arrow-body-style
const Button: React.FC<ButtonProps> = ({ onClick, children, className = '', type = 'button', disabled = false, variant = 'default' }) => {
    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`px-5 py-2 rounded-3xl transition-all duration-300 active:scale-95 ${
                variant === 'text'
                    ? 'bg-transparent text-black hover:no-underline dark:text-white'
                    : 'bg-black text-white hover:bg-gray-900 dark:bg-white dark:text-black'
            } ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;
