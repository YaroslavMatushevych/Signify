import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DarkModeToggle from './index';
import useDarkMode from '../../../../hooks/useDarkMode';

jest.mock('../../../../hooks/useDarkMode');

describe('DarkModeToggle Component', () => {
    const mockToggleTheme = jest.fn();

    beforeEach(() => {
        (useDarkMode as jest.Mock).mockReturnValue([mockToggleTheme, 'light']);
    });

    it('should render the light theme icon by default', () => {
        const { getByRole } = render(<DarkModeToggle />);

        const button = getByRole('button');

        expect(button).toBeInTheDocument();
        expect(button).toContainHTML('<svg');
    });

    it('should toggle the theme on button click', () => {
        const { getByRole } = render(<DarkModeToggle />);

        const button = getByRole('button');

        fireEvent.click(button);

        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    it('should render the dark mode icon when the theme is "dark"', () => {
        (useDarkMode as jest.Mock).mockReturnValue([mockToggleTheme, 'dark']);
        const { getByRole } = render(<DarkModeToggle />);

        const button = getByRole('button');

        expect(button).toContainHTML('<svg');
    });
});
