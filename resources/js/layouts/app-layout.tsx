import React from "react";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout ( {children} : AppLayoutProps ) {
    return (
        <div>
            <h1>Common Part</h1>
            <div>{children}</div>
        </div>
    );
}
