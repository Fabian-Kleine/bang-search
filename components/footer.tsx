export default function Footer() {
    return (
        <footer className="py-2 flex items-center justify-center gap-2 text-muted-foreground text-sm font-semibold">
            <a href="https://fabian-kleine.dev" target="_blank" className="hover:text-primary">
                fabian-kleine.dev
            </a>
            •
            <a href="https://github.com/Fabian-Kleine/bang-search" target="_blank" className="hover:text-primary">
                GitHub
            </a>
        </footer>
    );
}