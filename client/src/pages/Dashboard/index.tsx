import React from 'react';
import useAppContext from '../../hooks/useAppContext';
import Button from '../../components/shared/Button';

const DashboardPage: React.FC = () => {
    const { user, logoutUser } = useAppContext();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {user?.username}!</h1>
            <Button onClick={logoutUser} className="mt-4 bg-red-500 hover:bg-red-700">
                Logout
            </Button>
        </div>
    );
};

export default DashboardPage;
