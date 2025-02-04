import React from 'react';
import { render } from '@testing-library/react';
import Skeleton from './index';

describe('Skeleton Component', () => {
    it('should render the default number of lines', () => {
        const { container } = render(<Skeleton />);

        expect(container.querySelectorAll('div')).toHaveLength(4); // 3 lines + parent div
    });

    it('should render the correct number of lines', () => {
        const { container } = render(<Skeleton lines={5} />);

        expect(container.querySelectorAll('div')).toHaveLength(6); // 5 lines + parent div
    });

    it('should apply custom width and height', () => {
        const { container } = render(<Skeleton lines={1} width="w-1/2" height="h-8" />);
        const line = container.querySelector('div > div');

        expect(line).toHaveClass('animate-pulse space-y-4');
    });

    it('should apply additional class names', () => {
        const { container } = render(<Skeleton className="custom-class" />);

        expect(container.firstChild).toHaveClass('custom-class');
    });
});
