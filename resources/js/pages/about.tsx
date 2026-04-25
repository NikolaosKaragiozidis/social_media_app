import {Link} from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";

export default function About()
{
    return (
        <AppLayout>
            <h1>About</h1>
            <p>Welcome to the about page!</p>
            <Link href="/">Home</Link>
        </AppLayout>
    );
}
