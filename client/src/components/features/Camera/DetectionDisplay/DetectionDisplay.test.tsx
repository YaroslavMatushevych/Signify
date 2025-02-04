import React from 'react';
import { render, screen } from '@testing-library/react';
import DetectionDisplay from './index';

describe('DetectionDisplay Component', () => {
    it('should render the detection text', () => {
        const mockDetection = 'Detected Object';
        render(<DetectionDisplay detection={mockDetection} />);

        expect(screen.getByText(mockDetection)).toBeInTheDocument();
    });

    it('should apply correct classes for layout', () => {
        const mockDetection = 'Detected Object';
        const { container } = render(<DetectionDisplay detection={mockDetection} />);

        expect(container.firstChild).toHaveClass('flex w-2/5 md:w-full md:h-1/2 bg-gradient-to-br');
    });
});
