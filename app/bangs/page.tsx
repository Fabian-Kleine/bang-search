"use client";

import { Sparkles } from "lucide-react";
import { bangs } from "@/bangs";
import IconInput from "@/components/ui/icon-input";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";

export default function BangsPage() {
    const [filteredBangs, setFilteredBangs] = useState(bangs);
    const [searchValue, setSearchValue] = useState("");

    const handleFilterBangs = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        const filtered = bangs.filter((bang) => bang.name.toLowerCase().includes(value) || bang.bang.toLowerCase().includes(value));
        setFilteredBangs(filtered);
        setSearchValue(value);
    }

    return (
        <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
            <h1 className="tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none font-bold">!Bangs</h1>
            <div className="flex flex-col max-w-2xl mt-10">
                <p className="mb-4">
                    Bangs are shortcuts that quickly take you to search results on other sites. For example, when you know you want to search on another site like Wikipedia or Amazon, our bangs get you there fastest. A search for <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">!w filter bubble</code> will take you directly to Wikipedia.
                </p>
                <p>
                    Remember, though, because your search is actually taking place on that other site, you are subject to that site’s policies, including its data collection practices.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-xl gap-2">
                <h2 className="mt-10 text-2xl font-bold">{bangs.length} Available Bangs</h2>
                <p className="mb-4 text-lg">Click on a bang to try it out.</p>
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
                    <p className="text-lg font-semibold">"{searchValue}" results</p>
                )}
                <div className="flex flex-wrap justify-center max-w-2xl mt-4 w-full">
                    <ul className="w-full max-h-48 overflow-y-auto">
                        {filteredBangs.map((bang) => (
                            <li key={bang.name} className="w-full">
                                <Link href={`/?b=${bang.bang}`} className="flex justify-between items-center py-1 px-2 hover:bg-muted rounded-md w-full">
                                    <div className="flex gap-2 items-center">
                                        {bang.img ? (
                                            <img
                                                src={bang.img}
                                                alt={bang.name}
                                                width={20}
                                                height={20}
                                                className="flex-shrink-0"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <Sparkles className="flex-shrink-0 text-muted-foreground" size={16} />
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