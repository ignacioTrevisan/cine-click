export interface JWTResponse {
    ok: boolean;
    user: User;
}

export interface User {
    id: string;
    email: string;
    role: string;
    name: string;
    iat: number;
    exp: number;
}
