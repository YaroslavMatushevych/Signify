import React, { useState } from 'react';
import Card from '../../../shared/Card';
import Skeleton from '../../../shared/Skeleton';

interface GuideCardProps {
    label: string;
    image: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ label, image }) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Card>
            <p className="w-1/2 text-3xl text-center md:text-2xl">{label}</p>
            <div className="bg-white w-1/2 rounded-xl flex justify-center">
                {!isImageLoaded && (
                    <Skeleton
                        className="w-3/5 h-48 bg-gray-200 rounded-xl"
                        lines={0}
                    />
                )}
                <img
                    className={`w-3/5 object-contain transition-opacity duration-500 opacity-100 ${isImageLoaded ? 'w-3/5 h-48' : 'w-0 h-0'}`}
                    alt={label}
                    src={image}
                    onLoad={() => setIsImageLoaded(true)}
                />
            </div>
        </Card>
    );
};

export default GuideCard;
