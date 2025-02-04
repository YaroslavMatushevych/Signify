/* eslint-disable indent */
export const validateEmail = (email: string): string | null => {
    if (!email) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Please enter a valid email address';
    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return null;
};

export const validateUsername = (username: string): string | null => {
    if (!username) return 'Username is required';
    return null;
};

export const validateFields = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
        case 'username':
            return value.trim() ? null : 'Username is required';
        case 'email':
            return /\S+@\S+\.\S+/.test(value) ? null : 'Enter a valid email';
        case 'password':
            return value.length >= 6 ? null : 'Password must be at least 6 characters';
        default:
            return null;
    }
};
