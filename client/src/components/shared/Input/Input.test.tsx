import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './index';

describe('Input Component', () => {
    it('should render correctly with default props', () => {
        const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);

        expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should call onChange when input value changes', () => {
        const mockOnChange = jest.fn();
        const { getByPlaceholderText } = render(<Input placeholder="Enter text" onChange={mockOnChange} />);

        const input = getByPlaceholderText('Enter text');

        fireEvent.change(input, { target: { value: 'new value' } });

        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it('should clear the input value when the clear button is clicked', () => {
        const mockOnChange = jest.fn();
        const { getByRole } = render(<Input value="test" clearable onChange={mockOnChange} />);

        const clearButton = getByRole('button');

        fireEvent.click(clearButton);

        expect(mockOnChange).toHaveBeenCalledWith({ target: { value: '' } });
    });

    it('should display an error message when provided', () => {
        const { getByText } = render(<Input errorMessage="Error occurred" />);

        expect(getByText('Error occurred')).toBeInTheDocument();
    });
});
