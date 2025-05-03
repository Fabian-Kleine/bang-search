"use client";

import { Sparkles } from "lucide-react";
import { bangs } from "@/bangs";
import IconInput from "@/components/ui/icon-input";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
            <div className="flex flex-col items-center justify-center w-full gap-4">
                <Sparkles size={64} />
                <h1 className="tracking-tighter text-3xl sm:text-4xl md:text-5xl lg:text-6xl/none font-bold">Bangs</h1>
            </div>
            <div className="flex flex-col max-w-2xl mt-10">
                <p className="mb-4">
                    Bangs are shortcuts that quickly take you to search results on other sites. For example, when you know you want to search on another site like Wikipedia or Amazon, our bangs get you there fastest. A search for <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">!w filter bubble</code> will take you directly to Wikipedia.
                </p>
                <p>
                    Remember, though, because your search is actually taking place on that other site, you are subject to that site’s policies, including its data collection practices.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center w-full max-w-xl gap-4">
                <h2 className="mt-10 text-2xl font-bold">{filteredBangs.length} Available Bangs</h2>
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
                    <ul className="mx-4 w-full">
                        {filteredBangs.map((bang) => (
                            <li key={bang.name} className="flex justify-between items-center py-1 px-2 hover:bg-muted rounded-md w-full">
                                {bang.name}
                                <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm">{bang.bang}</code>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}