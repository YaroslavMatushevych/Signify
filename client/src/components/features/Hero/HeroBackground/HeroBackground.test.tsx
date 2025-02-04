import React from 'react';
import { render } from '@testing-library/react';
import HeroBackground from './index';

describe('HeroBackground Component', () => {
    it('should render the background blobs', () => {
        const { container } = render(<HeroBackground />);
        const blobs = container.querySelectorAll('div');

        expect(blobs).toHaveLength(3);
    });

    it('should have the correct classes for animations and styles', () => {
        const { container } = render(<HeroBackground />);
        const blobs = container.querySelectorAll('div');

        blobs.forEach((blob) => {
            expect(blob).toHaveClass('absolute');
            expect(blob).toHaveClass('mix-blend-multiply');
            expect(blob).toHaveClass('filter blur-xl');
            expect(blob).toHaveClass('animate-blob');
        });
    });
});
