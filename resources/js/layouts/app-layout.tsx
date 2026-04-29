import React, {useEffect} from "react";
import AppHeader from "@/components/app-header";
import {Toaster} from "@/components/ui/sonner";
import {usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {toast} from "sonner";

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout ( {children} : AppLayoutProps ) {
    const { flash } = usePage<PageProps>().props;

    useEffect(() => {
        if (flash.success) {
            toast(flash.success);
        }
        if (flash.error) {
            toast(flash.error);
        }
    }, [flash]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <AppHeader />
            <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
            <Toaster />
        </div>
    );
}
