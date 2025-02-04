import { User } from './user';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    message: string;
    access_token?: string;
    refresh_token?: string;
    user?: User;
}
