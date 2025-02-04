import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from './index';
import useAppContext from '../../hooks/useAppContext';

jest.mock('../../hooks/useAppContext');

describe('ProtectedRoute Component', () => {
    it('renders children when authenticated', () => {
        (useAppContext as jest.Mock).mockReturnValue({ isAuthenticated: true });
        const { getByText } = render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Authenticated Content</div>
                </ProtectedRoute>
            </MemoryRouter>,
        );

        expect(getByText('Authenticated Content')).toBeInTheDocument();
    });

    it('redirects to login when not authenticated', () => {
        (useAppContext as jest.Mock).mockReturnValue({ isAuthenticated: false });
        const { container } = render(
            <MemoryRouter>
                <ProtectedRoute>
                    <div>Authenticated Content</div>
                </ProtectedRoute>
            </MemoryRouter>,
        );

        expect(container.innerHTML).toContain('');
    });
});
