import React from 'react';
import { Navigate } from 'react-router-dom';
import useAppContext from '../../hooks/useAppContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAppContext();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>;
};

export default ProtectedRoute;
