export default function Template({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight">💥 Bang Search</h1>
                    <p className="mt-4 text-sm text-muted-foreground">
                        You can use Bangs like
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">
                            !gh
                        </code>
                        to search different sites directly.
                    </p>
                </div>
                {children}
            </div>
        </main>
    );
}