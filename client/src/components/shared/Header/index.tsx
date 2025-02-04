import React from 'react';
import { Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';
import Navigation from './Navigation';

const Header: React.FC = () => (
    <header
        className="absolute w-full py-4 px-10 flex items-center justify-between
        text-xl sm:text-lg dark:bg-dPrimary dark:text-primaryC"
    >
        <Link to="/" className="font-bold text-2xl">
            Signify.
        </Link>
        <Navigation />
        <DarkModeToggle />
    </header>
);

export default Header;
