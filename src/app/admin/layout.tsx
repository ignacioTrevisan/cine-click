import { Sidebar } from "./ui/sidebar";




export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <Sidebar />
            {children}
        </div>

    );
}
