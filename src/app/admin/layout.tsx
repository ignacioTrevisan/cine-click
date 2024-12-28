import { redirect } from "next/navigation";
import { Sidebar } from "./ui/sidebar";
import { verifyJWT } from "../core/use-cases/auth/verifyJWT";




export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const resp = await verifyJWT();

    if (!resp.ok) {
        redirect('/auth/login');
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            {children}
        </div>

    );
}
