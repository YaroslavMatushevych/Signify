import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../../../utils/constants';
import Button from '../../Button';
import useAppContext from '../../../../hooks/useAppContext';

const Navigation: React.FC = () => {
    const { isAuthenticated, logoutUser, openLoginModal, openSignupModal } = useAppContext();

    return (
        <nav className="flex items-center space-x-6 sm:space-x-4">
            {NAV_LINKS.map(({ label, path, auth }) => {
                if (auth) {
                    return (
                        isAuthenticated && (
                            <Link key={path} to={path} className="cursor-pointer transition-colors duration-300 hover:text-gray-500">
                                {label}
                            </Link>
                        )
                    );
                }

                return (
                    <Link key={path} to={path} className="cursor-pointer transition-colors duration-300 hover:text-gray-500">
                        {label}
                    </Link>
                );
            })}

            {/* Conditional rendering for auth buttons */}
            {isAuthenticated ? (
                <Button onClick={logoutUser} className="bg-red-500 hover:bg-red-700">
                    Logout
                </Button>
            ) : (
                <>
                    <Button onClick={openLoginModal} className="bg-blue-500 hover:bg-blue-700">
                        Login
                    </Button>
                    <Button onClick={openSignupModal} className="bg-green-500 hover:bg-green-700">
                        Sign Up
                    </Button>
                </>
            )}
        </nav>
    );
};

export default Navigation;
