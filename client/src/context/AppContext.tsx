import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { logout, login } from '../api/authService';
import { getCurrentUser } from '../api/userService';
import { User } from '../types/user';

export interface AppContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    logoutUser: () => Promise<void>;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    openSignupModal: () => void;
    closeSignupModal: () => void;
    isLoginModalOpen: boolean;
    isSignupModalOpen: boolean;
}

interface AppProviderProps {
    children: ReactNode;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setSignupModalOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getCurrentUser();
                setUser(userData);
            } catch {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const openLoginModal = () => setLoginModalOpen(true);
    const closeLoginModal = () => setLoginModalOpen(false);
    const openSignupModal = () => setSignupModalOpen(true);
    const closeSignupModal = () => setSignupModalOpen(false);

    const loginUser = async (email: string, password: string) => {
        try {
            const { user: userData } = await login(email, password);
            setUser(userData);
            closeLoginModal();
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const contextValue = useMemo(
        () => ({
            user,
            isAuthenticated: !!user,
            loginUser,
            logoutUser,
            isLoginModalOpen,
            isSignupModalOpen,
            openLoginModal,
            closeLoginModal,
            openSignupModal,
            closeSignupModal,
        }),
        [user, isLoginModalOpen, isSignupModalOpen],
    );

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextProps => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
