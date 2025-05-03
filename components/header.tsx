import { Search } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="@container flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl">💥</span>
                <span className="text-xl font-bold">Bang Search</span>
            </Link>
        </header>
    )
}