export interface JWTResponse {
    ok: boolean;
    msg: string;
    data: Data;
}

export interface Data {
    id: string;
    email: string;
    role: string;
    name: string;
    iat: number;
    exp: number;
}
