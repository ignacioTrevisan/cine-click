
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";
import { verifyJWT } from "../core/use-cases/auth/verifyJWT";


export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const resp = await verifyJWT();

    if (!resp.ok) {
        redirect('/auth/login');
    }
    return (
        <>
            <Navbar />
            {children}
        </>

    );
}
