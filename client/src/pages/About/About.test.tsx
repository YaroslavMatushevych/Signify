import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutPage from './index';

describe('AboutPage', () => {
    it('renders the heading', () => {
        render(<AboutPage />);

        expect(screen.getByText('About Signify')).toBeInTheDocument();
    });

    it('renders the description paragraphs', () => {
        render(<AboutPage />);

        expect(screen.getByText(/Signify is my personal project, built out of passion/i)).toBeInTheDocument();
        expect(screen.getByText(/This project isn’t just about code—it's about creating something meaningful./i)).toBeInTheDocument();
    });

    it('renders the GitHub link', () => {
        render(<AboutPage />);
        const link = screen.getByRole('link', { name: /GitHub/i });

        expect(link).toHaveAttribute('href', 'https://github.com/YaroslavMatushevych/signify');
    });

    it('renders the avatar image', () => {
        render(<AboutPage />);
        const img = screen.getByAltText('Yaroslav Matushevych');

        expect(img).toBeInTheDocument();
    });
});
