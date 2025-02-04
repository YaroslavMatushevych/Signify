import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/shared/Header';
import LoginModal from './components/features/Auth/LoginModal';
import SignupModal from './components/features/Auth/SignupModal';
import HeroPage from './pages/Hero';
import CameraPage from './pages/Camera';
import AboutPage from './pages/About';
import GuidePage from './pages/Guide';
import DashboardPage from './pages/Dashboard';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './hoc/ProtectedRoute';
import useAppContext from './hooks/useAppContext';

const GlobalModals: React.FC = () => {
    const { isLoginModalOpen, isSignupModalOpen, closeLoginModal, closeSignupModal } = useAppContext();

    return (
        <>
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
            <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} />
        </>
    );
};

const App: React.FC = () => (
    <AppProvider>
        <Router>
            <div className="dark:bg-dPrimary dark:text-primaryC overflow-hidden min-h-screen">
                <Header />
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<HeroPage />} />
                        <Route path="/camera" element={<CameraPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/guide" element={<GuidePage />} />
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
                {/* Global modals */}
                <GlobalModals />
            </div>
        </Router>
    </AppProvider>
);

export default App;
