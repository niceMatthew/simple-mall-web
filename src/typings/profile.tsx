

export interface RegisterPayload {
    username: string;
    password: string;
    confirmPassword: string;
    email: string
}

export interface LoginPayload {
    username: string;
    password: string;
}