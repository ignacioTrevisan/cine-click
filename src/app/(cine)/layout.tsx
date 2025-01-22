
import { redirect, useRouter } from "next/navigation";
import { Navbar } from "../components/navbar";
import { verifyJWT } from "../core/use-cases/auth/verifyJWT";
import { GetAllForSearch } from "../core/use-cases/movies/getAllForSearch";


export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const resp = await verifyJWT();
    const movies = await GetAllForSearch();
    const router = useRouter()
    if (!resp.ok) {
        router.push('/auth/login');
    }

    return (
        <div className="bg-gradient-to-br from-rose-50 to-teal-50">
            <Navbar forSearch={movies} />
            {children}
        </div>

    );
}
