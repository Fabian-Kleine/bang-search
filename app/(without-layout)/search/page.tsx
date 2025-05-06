"use client";

import useSettingsStore from "@/hooks/useSettings";
import useCustomBangsStore from "@/hooks/useCustomBangs";
import { getBangUrl } from "@/lib/bangs";
import { useSearchParams } from "next/navigation";
import { useLayoutEffect } from "react";

export default function SearchPage() {
    const searchParams = useSearchParams();
    const { searchEngine: settingsSearchEngine } = useSettingsStore();
    const { bangs: customBangs } = useCustomBangsStore();

    const q = searchParams.get("q") || searchParams.get("query") || "search";
    const searchEngine = searchParams.get("se") || searchParams.get("searchEngine") || settingsSearchEngine || "google";

    useLayoutEffect(() => {
        let url: string | null = null;

        try {
            const parsedUrl = new URL(q);
            url = parsedUrl.href;
        } catch {
            // Not a valid URL, proceed with search logic
            url = getBangUrl(q, customBangs);

            if (!url) {
                url = `https://${searchEngine}.com/search?q=${encodeURIComponent(q)}`;
                if (searchEngine === "yahoo") {
                    url = `https://search.yahoo.com/search?p=${encodeURIComponent(q)}`;
                } else if (searchEngine === "ecosia") {
                    url = `https://www.ecosia.org/search?q=${encodeURIComponent(q)}`;
                }
            }
        }

        window.open(url, "_self");
    }, []);

    return (
        <p>Redirecting...</p>
    );
}