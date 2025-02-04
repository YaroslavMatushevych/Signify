import React from 'react';
import GuideCard from '../../components/features/Guide/GuideCard';
import { GUIDES } from '../../utils/constants';

const GuidePage: React.FC = () => (
    <div className="container w-3/4 mt-28 mx-auto">
        {GUIDES.map((guide) => (
            <GuideCard key={guide.label} label={guide.label} image={guide.image} />
        ))}
    </div>
);

export default GuidePage;
