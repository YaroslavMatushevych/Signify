import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from './index';
import useAppContext from '../../hooks/useAppContext';

jest.mock('../../hooks/useAppContext');

describe('DashboardPage', () => {
    const mockLogoutUser = jest.fn();

    beforeEach(() => {
        (useAppContext as jest.Mock).mockReturnValue({
            user: { username: 'TestUser' },
            logoutUser: mockLogoutUser,
        });
    });

    it('renders the welcome message with username', () => {
        render(<DashboardPage />);

        expect(screen.getByText(/Welcome, TestUser!/i)).toBeInTheDocument();
    });

    it('calls logoutUser when Logout button is clicked', () => {
        render(<DashboardPage />);
        const button = screen.getByText(/Logout/i);

        fireEvent.click(button);

        expect(mockLogoutUser).toHaveBeenCalledTimes(1);
    });
});
