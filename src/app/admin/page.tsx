import { redirect } from 'next/navigation';




export default function AdminPageForRedirect() {
    redirect('/admin/billboard')
    return (
        <>
            <span className=''>template</span>
        </>
    );
};