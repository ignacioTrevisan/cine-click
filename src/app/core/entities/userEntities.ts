export interface User {
    name: string;
    id: string;
    password: string;
    email: string;
    emailVerify: Date | null;
    role: 'admin' | 'user'
    image: string | null;
}

