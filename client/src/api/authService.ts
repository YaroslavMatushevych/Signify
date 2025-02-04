// import axiosInstance from './axiosInstance';
// import { AuthResponse } from '../types/auth';

// export const login = async (
//     email: string,
//     password: string,
// ): Promise<AuthResponse> => {
//     const response = await axiosInstance.post<AuthResponse>('/auth/login', {
//         email,
//         password,
//     });
//     return response.data;
// };

// export const signup = async (
//     username: string,
//     email: string,
//     password: string,
// ): Promise<AuthResponse> => {
//     const response = await axiosInstance.post<AuthResponse>('/auth/signup', {
//         username,
//         email,
//         password,
//     });
//     return response.data;
// };

// export const logout = async (): Promise<{ message: string }> => {
//     const response = await axiosInstance.post('/auth/logout');
//     return response.data;
// };

export const login = async (email: string, password: string) => null;

export const signup = async (username: string, email: string, password: string) => null;

export const logout = async () => null;
