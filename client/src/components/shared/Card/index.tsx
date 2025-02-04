import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
    <div
        className={`mb-14 rounded-xl shadow-xl border-2 flex items-center justify-evenly p-4 bg-white ${className}`}
    >
        {children}
    </div>
);

export default Card;
