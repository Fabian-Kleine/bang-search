// client file for search page
// needs to be built with esbuild
// will be built to /public/js/search.min.js

import { getBangUrl } from "./bangs";

const currentURL = new URL(window.location.href);

const searchEngineLocal = JSON.parse(localStorage.getItem("settings-storage") as string)?.state?.searchEngine;
const customBangsLocal = JSON.parse(localStorage.getItem("bangs-storage") as string)?.state?.bangs;

const q = currentURL.searchParams.get("q") || currentURL.searchParams.get("query") || "search";
const searchEngine = currentURL.searchParams.get("se") || currentURL.searchParams.get("searchEngine") || searchEngineLocal || "google";

let url: string | null = null;

try {
    const parsedUrl = new URL(q);
    url = parsedUrl.href;
} catch {
    // Not a valid URL, proceed with search logic
    url = getBangUrl(q, customBangsLocal);

    if (!url) {
        url = `https://${searchEngine}.com/search?q=${encodeURIComponent(q)}`;
        if (searchEngine === "yahoo") {
            url = `https://search.yahoo.com/search?p=${encodeURIComponent(q)}`;
        } else if (searchEngine === "ecosia") {
            url = `https://www.ecosia.org/search?q=${encodeURIComponent(q)}`;
        }
    }
}

window.location.replace(url);

