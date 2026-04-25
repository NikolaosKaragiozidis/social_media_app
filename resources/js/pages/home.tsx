import {Link} from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function Home()
{
    return (
        <AppLayout>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
            <Link href="/about">About</Link>
        </AppLayout>
    );
}
