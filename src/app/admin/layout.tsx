export const dynamic = 'force-dynamic';

import { redirect } from "next/navigation";
import { Sidebar } from "./ui/sidebar";
import { verifyJWT } from "../core/use-cases/auth/verifyJWT";
import { NoAccessAdvisement } from "./noAccessAdvisement";

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {


    const { ok, data } = await verifyJWT();

    if (!ok || !data) {
        redirect('/auth/login');
    }

    if (data.data.role !== 'admin') {
        return (<NoAccessAdvisement />)
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            {children}
        </div>

    );
}
