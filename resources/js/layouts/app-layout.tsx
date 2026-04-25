import React from "react";
import AppHeader from "@/components/app-header";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout ( {children} : AppLayoutProps ) {
    return (
        <div className="bg-gray-50 min-h-screen">
            <AppHeader/>
                <main className="max-w-4xl mx-auto px-4 py-8">
                    {children}
                </main>
        </div>
    );
}
