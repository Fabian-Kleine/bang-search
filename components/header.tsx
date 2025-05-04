"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import SettingsDialog from "./settings-dialog";
import SearchForm from "./search-form";
import SearchInput from "./search-input";
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname();

    const isSearchPage = pathname === "/" || pathname === "/search";

    return (
        <header className="@container flex items-center justify-between gap-2 h-16 px-4 sm:px-6 lg:px-8">
            <Link href="/" className="hidden md:flex items-center space-x-2">
                <span className="text-2xl">💥</span>
                <span className="text-xl font-bold">Bang Search</span>
            </Link>
            {!isSearchPage && (
                <SearchForm className="md:absolute md:left-1/2 md:-translate-x-1/2 w-full max-w-md">
                    {(value, onChange) => (
                        <SearchInput
                            value={value}
                            onChange={onChange}
                        />
                    )}
                </SearchForm>
            )}
            {/* Settings button */}
            <SettingsDialog>
                <Button size={"icon"} variant="ghost" className="cursor-pointer">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Button>
            </SettingsDialog>
        </header>
    )
}