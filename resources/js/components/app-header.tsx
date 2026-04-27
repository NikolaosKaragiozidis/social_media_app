import AppHeaderLogo from "@/components/app-header-logo";
import AppHeaderLink from "@/components/app-header-link";
import {Link, usePage} from "@inertiajs/react";
import { Button } from "./ui/button";
import {create, index} from "@/actions/App/Http/Controllers/PostController";
import {create as loginPage} from "@/actions/App/Http/Controllers/Auth/LoginController"
import home from "@/routes/home";
import about from "@/routes/about";
import {PageProps} from "@/types";
import UserDropdown from "@/components/user-dropdown";

export default function AppHeader() {
    const {user} = usePage<PageProps>().props;

    return <header>
        <div className="max-w-4xl mx-auto p-4">
            <nav className="flex items-center justify-between">
                <AppHeaderLogo />
                <div className="flex space-x-6 items-center">
                    <Button>
                        <Link href={create()}>Add Post</Link>
                    </Button>
                    <AppHeaderLink href={home.index().url}>Home</AppHeaderLink>
                    <AppHeaderLink href={about.index().url}>About</AppHeaderLink>
                    <AppHeaderLink href={index().url}>Posts</AppHeaderLink>

                    {user ? (
                        <UserDropdown />
                    ) : (
                        <Button asChild>
                            <Link href={loginPage().url}>Sign In</Link>
                        </Button>
                    )}
                </div>
            </nav>
        </div>
    </header>
}
