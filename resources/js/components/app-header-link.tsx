import {Link} from "@inertiajs/react";
import {ReactNode} from "react";

interface AppHeaderLinksProps {
    href: string;
    children: ReactNode;
}

export default function AppHeaderLink ({href, children}: AppHeaderLinksProps) {
    return <Link href={href} className="text-gray-600 font-medium">
        {children}
    </Link>
}
