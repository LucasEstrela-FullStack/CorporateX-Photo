"use client";

import { Header } from "./header";

export function HomeContent() {
    return (
        <>
            <Header />

            <main className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-200px)]">
                    <div className="flex items-center justify-center">
                        {/* HERO */}
                        Compoenent Hero
                    </div>
                    <div className="flex items-center justify-center">
                        {/* UPLOAD-PHOTO */}
                        Component Photo
                    </div>
                </div>
            </main>
        </>
    );
}