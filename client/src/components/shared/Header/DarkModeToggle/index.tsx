import React from 'react';
import { BsFillMoonFill, BsSunFill } from 'react-icons/bs';
import useDarkMode from '../../../../hooks/useDarkMode';
import Button from '../../Button';

const DarkModeToggle: React.FC = () => {
    const [toggleTheme, theme] = useDarkMode();

    return (
        <Button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-transform duration-300 hover:scale-110"
            aria-label="Toggle Dark Mode" // Use a consistent label
        >
            {theme === 'light' ? <BsSunFill size={20} /> : <BsFillMoonFill size={20} />}
        </Button>
    );
};

export default DarkModeToggle;
