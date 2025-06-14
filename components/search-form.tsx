"use client";

import { useState } from "react";
import useSearchHistoryStore from "@/hooks/useSearchHistory";
import useSettingsStore from "@/hooks/useSettings";
import useCustomBangsStore from "@/hooks/useCustomBangs";
import { getBangUrl } from "@/lib/bangs";

interface SearchFormProps {
    className?: string;
    children: (value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) => React.ReactNode;
}

export default function SearchForm({ className, children }: SearchFormProps) {
    const [value, setValue] = useState<string>("");
    const { addSearch } = useSearchHistoryStore();
    const { searchEngine, openInNewTab, searchHistoryActive } = useSettingsStore();
    const { bangs: customBangs } = useCustomBangsStore();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const originalQuery = value.trim();
        if (!originalQuery) return;

        if (searchHistoryActive) addSearch(originalQuery);

        let url: string | null = null;

        // Check if the value is a URL
        try {
            const parsedUrl = new URL(originalQuery);
            url = parsedUrl.href;
        } catch {
            // Not a valid URL, proceed with search logic
            url = getBangUrl(originalQuery, customBangs);

            if (!url) {
                url = `https://${searchEngine}.com/search?q=${encodeURIComponent(originalQuery)}`;
                if (searchEngine === "yahoo") {
                    url = `https://search.yahoo.com/search?p=${encodeURIComponent(originalQuery)}`;
                } else if (searchEngine === "ecosia") {
                    url = `https://www.ecosia.org/search?q=${encodeURIComponent(originalQuery)}`;
                }
            }
        }

        window.open(url, openInNewTab ? "_blank" : "_self");
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children(value, handleChange)}
        </form>
    );
}