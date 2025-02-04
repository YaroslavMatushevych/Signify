import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './index';

describe('Card Component', () => {
    it('renders children correctly', () => {
        render(
            <Card>
                <p>Card Content</p>
            </Card>,
        );

        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('applies additional className prop', () => {
        render(
            <Card className="custom-class">
                <p>Card Content</p>
            </Card>,
        );
        const card = screen.getByText('Card Content').closest('div');

        expect(card).toHaveClass('custom-class');
    });
});
