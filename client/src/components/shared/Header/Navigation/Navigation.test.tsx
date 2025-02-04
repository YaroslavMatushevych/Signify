import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './index';
import useAppContext from '../../../../hooks/useAppContext';
import { NAV_LINKS } from '../../../../utils/constants';

jest.mock('../../../../hooks/useAppContext');

describe('Navigation Component', () => {
    const mockLogoutUser = jest.fn();
    const mockOpenLoginModal = jest.fn();
    const mockOpenSignupModal = jest.fn();

    beforeEach(() => {
        (useAppContext as jest.Mock).mockReturnValue({
            isAuthenticated: false,
            logoutUser: mockLogoutUser,
            openLoginModal: mockOpenLoginModal,
            openSignupModal: mockOpenSignupModal,
        });
    });

    it('should render all public navigation links when unauthenticated', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>,
        );

        // Check public links
        expect(getByText('Guide')).toBeInTheDocument();
        expect(getByText('About')).toBeInTheDocument();

        // Authenticated links should not render
        expect(() => getByText('Dashboard')).toThrow();
    });

    it('should render all navigation links when authenticated', () => {
        (useAppContext as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            logoutUser: mockLogoutUser,
            openLoginModal: mockOpenLoginModal,
            openSignupModal: mockOpenSignupModal,
        });

        const { getByText } = render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>,
        );

        // Check all links
        expect(getByText('Guide')).toBeInTheDocument();
        expect(getByText('About')).toBeInTheDocument();
        expect(getByText('Dashboard')).toBeInTheDocument();
    });

    it('should display login and sign-up buttons when unauthenticated', () => {
        const { getByText } = render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>,
        );

        expect(getByText('Login')).toBeInTheDocument();
        expect(getByText('Sign Up')).toBeInTheDocument();
    });

    it('should display the logout button when authenticated', () => {
        (useAppContext as jest.Mock).mockReturnValue({
            isAuthenticated: true,
            logoutUser: mockLogoutUser,
            openLoginModal: mockOpenLoginModal,
            openSignupModal: mockOpenSignupModal,
        });

        const { getByText } = render(
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>,
        );

        expect(getByText('Logout')).toBeInTheDocument();
    });
});
