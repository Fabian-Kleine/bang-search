"use client";

import { Settings, Sparkles } from "lucide-react";
import { bangs } from "@/lib/bangs";
import IconInput from "@/components/ui/icon-input";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import ThemeImage from "@/components/ui/theme-image";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { useTheme } from "next-themes";
import SettingsDialog from "@/components/settings-dialog";

export default function BangsPage() {
    const [filteredBangs, setFilteredBangs] = useState(bangs);
    const [searchValue, setSearchValue] = useState("");
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    const handleFilterBangs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filtered = bangs.filter((bang) => bang.name.toLowerCase().includes(value) || bang.bang.toLowerCase().includes(value));
        setFilteredBangs(filtered);
        setSearchValue(value);
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-center">
            <div className="relative min-h-[50vh] w-full flex flex-col items-center justify-center px-4 sm:px-6 -z-10">
                <h1 className="pointer-events-none select-none tracking-tighter text-5xl sm:text-6xl md:text-7xl lg:text-8xl/none font-bold z-10 bg-linear-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-transparent h-full w-full text-center pl-[0.2rem] pr-[0.2rem] -ml-[0.2rem] pb-[1rem] -mb-[1rem]">
                    !Bangs
                </h1>
                <RetroGrid />
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 my-16">
                <img className="shadow-xl" src={resolvedTheme === "dark" ? "/bangs.png" : "/bangs_light.png"} alt="Bangs" width={400} />
                <div className="flex flex-col max-w-2xl mt-10 px-4 sm:px-6">
                    <p className="mb-4">
                        Bangs are shortcuts that quickly take you to search results on other sites. For example, when you know you want to search on another site like Wikipedia or Amazon, our bangs get you there fastest. A search for <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1 -z-10">!w filter bubble</code> will take you directly to Wikipedia.
                    </p>
                    <p className="mb-4">
                        Remember, though, because your search is actually taking place on that other site, you are subject to that site’s policies, including its data collection practices.
                    </p>
                    <p>
                        You can also add your own custom bangs in the settings menu.
                        <SettingsDialog defaultTab="bangs">
                            <span className="flex items-center gap-2 text-sky-600 font-bold hover:underline mt-4 w-fit cursor-pointer">
                                <Settings size={20} />
                                Settings
                            </span>
                        </SettingsDialog>
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-xl gap-2">
                <h2 className="mt-10 text-2xl font-bold">{bangs.length} Available Bangs</h2>
                <p className="mb-4 text-lg">
                    Click on a bang to try it out. See one missing?
                    <SettingsDialog defaultTab="bangs">
                        <span className="text-sky-600 hover:underline w-fit cursor-pointer ml-1">
                            Add it yourself!
                        </span>
                    </SettingsDialog>
                </p>
                <IconInput icon="Search" className="w-full">
                    <Input
                        type="text"
                        placeholder="Search for Bangs..."
                        className="w-full max-w-2xl"
                        value={searchValue}
                        onChange={handleFilterBangs}
                    />
                </IconInput>
                {searchValue && (
                    <p className="text-lg font-semibold">&quot;{searchValue}&quot; results</p>
                )}
                <div className="flex flex-wrap justify-center max-w-2xl mt-4 w-full">
                    <ul className="w-full max-h-48 overflow-y-auto">
                        {filteredBangs.map((bang) => (
                            <li key={bang.name} className="w-full">
                                <Link href={`/?b=${bang.bang}`} className="flex justify-between items-center py-1 px-2 hover:bg-muted rounded-md w-full">
                                    <div className="flex gap-2 items-center">
                                        {bang.img ? (
                                            <ThemeImage
                                                src={bang.img}
                                                alt={bang.name}
                                                width={20}
                                                height={20}
                                                className="flex-shrink-0"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <Sparkles className="flex-shrink-0 text-muted-foreground mr-0.5" size={18} />
                                        )}
                                        {bang.name}
                                    </div>
                                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm">{bang.bang}</code>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}