import React from 'react';
import { render, screen } from '@testing-library/react';
import GuidePage from './index';
import { GUIDES } from '../../utils/constants';

jest.mock('../../utils/constants', () => ({
    GUIDES: [
        { label: 'Guide 1', image: 'image1.png' },
        { label: 'Guide 2', image: 'image2.png' },
    ],
}));

describe('GuidePage', () => {
    it('renders all guides', () => {
        render(<GuidePage />);

        GUIDES.forEach((guide) => {
            expect(screen.getByText(guide.label)).toBeInTheDocument();
            expect(screen.getByAltText(guide.label)).toBeInTheDocument();
        });
    });
});
