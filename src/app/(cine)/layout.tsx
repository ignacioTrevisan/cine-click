
import { redirect } from "next/navigation";
import { Navbar } from "../components/navbar";
import { verifyJWT } from "../core/use-cases/auth/verifyJWT";
import { GetAllForSearch } from "../core/use-cases/movies/getAllForSearch";


export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const resp = await verifyJWT();
    const movies = await GetAllForSearch();

    if (!resp.ok) {
        redirect('/auth/login');
    }

    return (
        <div className="">
            <Navbar forSearch={movies} />
            {children}

        </div>

    );
}
