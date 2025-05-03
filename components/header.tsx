import Link from "next/link";
import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import SettingsDialog from "./settings-dialog";

export default function Header() {
    return (
        <header className="@container flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="w-10 h-10" />
            <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl">💥</span>
                <span className="text-xl font-bold">Bang Search</span>
            </Link>
            <SettingsDialog>
                <Button size={"icon"} variant="ghost" className="cursor-pointer">
                    <Settings />
                    <span className="sr-only">Settings</span>
                </Button>
            </SettingsDialog>
        </header>
    )
}