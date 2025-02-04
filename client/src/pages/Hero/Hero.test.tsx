import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroPage from './index';

describe('HeroPage', () => {
    it('renders the title and subtitle', () => {
        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>,
        );

        expect(screen.getByText(/Signify./i)).toBeInTheDocument();
        expect(screen.getByText(/Sign Language Recognition With/i)).toBeInTheDocument();
    });

    it('renders the Get Started button with the correct link', () => {
        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>,
        );
        const button = screen.getByText(/Get Started/i).closest('a');

        expect(button).toHaveAttribute('href', '/camera');
    });

    it('renders the disclaimer text', () => {
        render(
            <MemoryRouter>
                <HeroPage />
            </MemoryRouter>,
        );

        expect(screen.getByText(/This app will be using your webcam and machine learning/i)).toBeInTheDocument();
    });
});
