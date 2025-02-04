import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../../context/AppContext';
import Header from './index';

describe('Header Component', () => {
    window.matchMedia = () => ({
        matches: false,
        onchange: null,
        media: 'string',
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    });

    it('should render correctly', () => {
        const { getByText } = render(
            <AppProvider>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </AppProvider>,
        );

        expect(getByText('Signify.')).toBeInTheDocument();
    });

    it('should contain the Navigation and DarkModeToggle components', () => {
        const { getByRole } = render(
            <AppProvider>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </AppProvider>,
        );

        expect(getByRole('navigation')).toBeInTheDocument();
    });
});
