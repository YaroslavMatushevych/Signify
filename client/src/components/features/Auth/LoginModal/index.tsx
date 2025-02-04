import React, { useState, ChangeEvent } from 'react';
import Modal from '../../../shared/Modal';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import { validateFields } from '../../../../utils/validation';
import useAppContext from '../../../../hooks/useAppContext';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const { loginUser } = useAppContext();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        const fieldError = validateFields(name, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: fieldError || '',
        }));
    };

    const validateAllFields = () => {
        const newErrors: Record<string, string> = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(formValues)) {
            const fieldError = validateFields(key, value);
            if (fieldError) newErrors[key] = fieldError;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validateAllFields()) return;

        try {
            await loginUser(formValues.email, formValues.password);
            onClose();
        } catch (err) {
            console.error('Login failed:', err);
            setErrors((prevErrors) => ({
                ...prevErrors,
                password: 'Invalid email or password',
            }));
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <Input type="email" name="email" placeholder="Email" value={formValues.email} onChange={handleInputChange} errorMessage={errors.email} clearable />
            <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleInputChange}
                errorMessage={errors.password}
                clearable
            />
            <div className="flex justify-end space-x-4">
                <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-700">
                    Cancel
                </Button>
                <Button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-700">
                    Login
                </Button>
            </div>
        </Modal>
    );
};

export default LoginModal;
