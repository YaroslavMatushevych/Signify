import React, { useState, ChangeEvent, forwardRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface InputProps {
    type?: 'text' | 'password' | 'email';
    name?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    clearable?: boolean;
    disabled?: boolean;
    errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ type = 'text', name = '', placeholder = '', value = '', onChange, className = '', clearable = false, disabled = false, errorMessage }, ref) => {
        const [inputValue, setInputValue] = useState(value);

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
            onChange?.(e);
        };

        const clearInput = () => {
            setInputValue('');
            onChange?.({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
        };

        return (
            <>
                <div className="relative w-full">
                    <input
                        type={type}
                        name={name}
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleInputChange}
                        disabled={disabled}
                        ref={ref}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white ${
                            errorMessage ? 'border-red-500' : 'border-gray-300'
                        } ${className}`}
                    />
                    {clearable && inputValue && (
                        <button
                            type="button"
                            onClick={clearInput}
                            className="absolute top-5 right-2 transform -translate-y-1/2
                            text-gray-400 hover:text-black dark:hover:text-white focus:outline-none"
                        >
                            <AiOutlineClose size={16} />
                        </button>
                    )}
                </div>
                <p className={`h-4 relative -top-1 text-xs text-red-500 mt-1 transition-opacity duration-200 ${errorMessage ? 'opacity-100' : 'opacity-0'}`}>
                    {errorMessage || ' '}
                </p>{' '}
            </>
        );
    },
);

Input.displayName = 'Input';

export default Input;
