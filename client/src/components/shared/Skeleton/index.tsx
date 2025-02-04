import React from 'react';

interface SkeletonProps {
    lines?: number;
    width?: string;
    height?: string;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    lines = 3,
    width = 'w-2/3',
    height = 'h-4',
    className = '',
}) => (
    <div className={`animate-pulse space-y-4 ${className}`}>
        {[...Array(lines)].map((_, i) => (
            <div key={i} className={`${height} bg-gray-300 dark:bg-gray-700 rounded ${width}`} />
        ))}
    </div>
);

export default Skeleton;
