import React, { useState, ChangeEvent } from 'react';
import Modal from '../../../shared/Modal';
import Input from '../../../shared/Input';
import Button from '../../../shared/Button';
import { signup } from '../../../../api/authService';
import { validateFields } from '../../../../utils/validation';

interface SignupModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update form values
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        // Validate field on change
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

    const handleSignup = async () => {
        if (!validateAllFields()) return;

        try {
            await signup(formValues.username, formValues.email, formValues.password);
            onClose();
        } catch (err) {
            console.error('Signup failed:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            <Input
                type="text"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleInputChange}
                errorMessage={errors.username}
                clearable
            />
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
                <Button onClick={handleSignup} className="bg-green-500 hover:bg-green-700">
                    Sign Up
                </Button>
            </div>
        </Modal>
    );
};

export default SignupModal;
