"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Switch } from "./ui/switch";

import Image from "next/image";

import { useTheme } from "next-themes";

import useSettingsStore from "@/hooks/useSettings";

interface SettingsDialogProps {
    children: React.ReactNode;
}

export default function SettingsDialog({ children }: SettingsDialogProps) {
    const { 
        searchEngine, 
        setSearchEngine,
        openInNewTab,
        setOpenInNewTab,
    } = useSettingsStore();

    const { theme, setTheme } = useTheme();

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                </DialogHeader>
                <div>
                    <h2 className="border-b mb-4 pb-3 font-semibold">General</h2>
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                        <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                            <h3>Theme</h3>
                            <p className="text-sm text-muted-foreground">
                                Select the theme you want to use.
                            </p>
                        </div>
                        <Select defaultValue={theme} onValueChange={(value) => setTheme(value)}>
                            <SelectTrigger className="w-full mt-2 sm:mt-0">
                                <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="pt-12">
                    <h2 className="border-b mb-4 pb-3 font-semibold">Search</h2>
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                        <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                            <h3>Default Search Engine</h3>
                            <p className="text-sm text-muted-foreground">
                                Select the search engine you want to use by default.
                            </p>
                        </div>
                        <Select defaultValue={searchEngine} onValueChange={setSearchEngine}>
                            <SelectTrigger className="w-full mt-2 sm:mt-0">
                                <SelectValue placeholder="Select a search engine" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="google">
                                    <Image src="/logos/google.png" alt="Google Logo" width={15} height={15} />
                                    Google
                                </SelectItem>
                                <SelectItem value="duckduckgo">
                                    <Image src="/logos/duckduckgo.png" alt="DuckDuckGo Logo" width={15} height={15} />
                                    DuckDuckGo
                                </SelectItem>
                                <SelectItem value="bing">
                                    <Image src="/logos/bing.png" alt="Bing Logo" width={15} height={15} />
                                    Bing
                                </SelectItem>
                                <SelectItem value="yahoo">
                                    <Image src="/logos/yahoo.png" alt="Yahoo Logo" width={15} height={15} />
                                    Yahoo
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full h-4" />
                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                        <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                            <h3>Open in new Tab</h3>
                            <p className="text-sm text-muted-foreground">
                                Open the search results in a new tab.
                            </p>
                        </div>
                        <Switch checked={openInNewTab} onCheckedChange={setOpenInNewTab} className="scale-[120%]" />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}