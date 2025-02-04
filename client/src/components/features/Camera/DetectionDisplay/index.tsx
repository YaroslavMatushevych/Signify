import React from 'react';

interface DetectionDisplayProps {
    detection: string;
}

const DetectionDisplay: React.FC<DetectionDisplayProps> = ({ detection }) => (
    <div className="flex w-2/5 md:w-full md:h-1/2 bg-gradient-to-br from-purple-300 via-red-300 to-pink-300">
        <div className="m-auto">
            <p className="font-extrabold text-7xl text-center">{detection}</p>
        </div>
    </div>
);

export default DetectionDisplay;
