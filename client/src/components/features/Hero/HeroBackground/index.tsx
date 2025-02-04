import React from 'react';

const HeroBackground: React.FC = () => (
    <>
        <div
            className="absolute top-0 -left-4 w-72 h-72 bg-purple-300
            rounded-full mix-blend-multiply filter blur-xl opacity-100 animate-blob"
        />
        <div
            className="absolute top-0 -right-4 w-72 h-72 bg-red-300 rounded-full
            mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        />
        <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full
            mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        />
    </>
);

export default HeroBackground;
