import type { Metadata } from 'next'
import { redirect } from 'next/navigation';
import { verifyJWT } from '../core/use-cases/auth/verifyJWT';



export const metadata: Metadata = {
    title: 'ShopLayout Title',
    description: 'ShopLayout Description'
};

export default async function ShopLayout({ children }: {
    children: React.ReactNode
}) {

    const resp = await verifyJWT();

    if (resp.ok) {
        redirect('/');
    }


    return (
        <main className='flex justify-center'>
            <div className='w-full sm:w-[350px] px-10 '>
                {children}
            </div>
        </main>
    );
};