/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginModal from './index';
import useAppContext from '../../../../hooks/useAppContext';

jest.mock('../../../../hooks/useAppContext');

describe('LoginModal Component', () => {
    const mockOnClose = jest.fn();
    const mockLoginUser = jest.fn();

    beforeEach(() => {
        jest.resetAllMocks();
        (useAppContext as jest.Mock).mockReturnValue({ loginUser: mockLoginUser });
    });

    it('renders correctly when open', () => {
        render(<LoginModal isOpen={true} onClose={mockOnClose} />);

        expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
    });

    it('validates fields on input change', () => {
        render(<LoginModal isOpen={true} onClose={mockOnClose} />);
        const emailInput = screen.getByPlaceholderText('Email');

        fireEvent.change(emailInput, { target: { value: 'aasd' } });

        expect(screen.getByText('Enter a valid email')).toBeInTheDocument();
    });
});
