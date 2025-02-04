/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupModal from './index';

describe('SignupModal Component', () => {
    const mockOnClose = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders correctly when open', () => {
        render(<SignupModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByRole('heading', { name: 'Sign Up' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
    });

    it('validates fields on input change', () => {
        render(<SignupModal isOpen={true} onClose={mockOnClose} />);
        const usernameInput = screen.getByPlaceholderText('Username');

        fireEvent.change(usernameInput, { target: { value: 'we' } });
        fireEvent.change(usernameInput, { target: { value: '' } });

        expect(screen.getByText('Username is required')).toBeInTheDocument();
    });

    it('does not close modal on validation errors', () => {
        render(<SignupModal isOpen={true} onClose={mockOnClose} />);
        const signupButton = screen.getByRole('button', { name: 'Sign Up' });

        fireEvent.click(signupButton);

        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
