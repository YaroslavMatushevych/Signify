import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GuideCard from './index';

describe('GuideCard Component', () => {
    const mockLabel = 'Sample Label';
    const mockImage = 'https://via.placeholder.com/150';

    it('should render label correctly', () => {
        render(<GuideCard label={mockLabel} image={mockImage} />);

        expect(screen.getByText(mockLabel)).toBeInTheDocument();
    });

    it('should display image after it has loaded', () => {
        render(<GuideCard label={mockLabel} image={mockImage} />);
        const img = screen.getByRole('img', { name: mockLabel });

        fireEvent.load(img);

        expect(img).toHaveClass('w-3/5 h-48');
    });
});
