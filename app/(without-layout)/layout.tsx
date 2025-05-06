import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Bang Search",
    description: "A \"search engine\" supporting !bangs and more",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Suspense>
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
