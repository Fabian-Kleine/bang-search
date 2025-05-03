"use client";

import { useState } from "react";
import useSearchHistoryStore from "@/hooks/useSearchHistory";
import useSettingsStore from "@/hooks/useSettings";
import { bangs, Bang } from "@/bangs";

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
        let searchTerm = originalQuery;
        let foundBang: Bang | null = null;

        for (const bangObj of bangs) {
            const bangPattern = bangObj.bang;
            let bangIndex = -1;
            let isExactMatch = false;
            let isStartMatch = false;
            let isEndMatch = false;
            let isMiddleMatch = false;

            if (originalQuery === bangPattern) {
                bangIndex = 0;
                isExactMatch = true;
            } else if (originalQuery.startsWith(bangPattern + " ")) {
                bangIndex = 0;
                isStartMatch = true;
            } else if (originalQuery.endsWith(" " + bangPattern)) {
                bangIndex = originalQuery.lastIndexOf(" " + bangPattern) + 1;
                isEndMatch = true;
            } else {
                const middleIndex = originalQuery.indexOf(" " + bangPattern + " ");
                if (middleIndex !== -1) {
                    bangIndex = middleIndex + 1;
                    isMiddleMatch = true;
                }
            }

            if (bangIndex !== -1) {
                foundBang = bangObj;

                if (isExactMatch) {
                    searchTerm = "";
                } else if (isStartMatch) {
                    searchTerm = originalQuery.substring(bangPattern.length + 1);
                } else if (isEndMatch) {
                    searchTerm = originalQuery.substring(0, bangIndex - 1);
                } else if (isMiddleMatch) {
                    const before = originalQuery.substring(0, bangIndex - 1);
                    const after = originalQuery.substring(bangIndex + bangPattern.length + 1);
                    searchTerm = (before + " " + after).trim();
                }

                url = foundBang.url.replace("{{query}}", encodeURIComponent(searchTerm.trim()));
                break;
            }
        }

        if (!url) {
            searchTerm = originalQuery;
            url = `https://${searchEngine}.com/search?q=${encodeURIComponent(searchTerm)}`;
            if (searchEngine === "yahoo") {
                url = `https://search.yahoo.com/search?p=${encodeURIComponent(searchTerm)}`;
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