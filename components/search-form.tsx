"use client";

import { useState } from "react";
import useSearchHistoryStore from "@/hooks/useSearchHistory";
import useSettingsStore from "@/hooks/useSettings";
import { getBangUrl } from "@/lib/utils";

interface SearchFormProps {
    className?: string;
    children: (value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void) => React.ReactNode;
}

export default function SearchForm({ className, children }: SearchFormProps) {
    const [value, setValue] = useState<string>("");
    const { addSearch } = useSearchHistoryStore();
    const { searchEngine, openInNewTab } = useSettingsStore();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const originalQuery = value.trim();
        if (!originalQuery) return;

        addSearch(originalQuery);

        let url: string | null = null;

        url = getBangUrl(originalQuery);

        if (!url) {
            url = `https://${searchEngine}.com/search?q=${encodeURIComponent(originalQuery)}`;
            if (searchEngine === "yahoo") {
                url = `https://search.yahoo.com/search?p=${encodeURIComponent(originalQuery)}`;
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