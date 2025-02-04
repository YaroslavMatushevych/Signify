import React, { ReactNode } from 'react';
import Button from '../Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12 max-w-md p-6 pt-5 relative mx-auto">
                <Button
                    onClick={onClose}
                    variant="text"
                    className="pt-1 absolute top-4 right-0 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                >
                    ✕
                </Button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
