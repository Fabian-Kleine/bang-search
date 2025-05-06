import { getBangUrl } from "@/lib/bangs";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);

    let q = searchParams.get("q") || searchParams.get("query");
    let searchEngine = searchParams.get("se") || searchParams.get("searchEngine") || "google";

    if (!q) {
        q = "search";
    }

    let url: string | null = null;

    try {
        const parsedUrl = new URL(q);
        url = parsedUrl.href;
    } catch {
        // Not a valid URL, proceed with search logic
        url = getBangUrl(q);

        if (!url) {
            url = `https://${searchEngine}.com/search?q=${encodeURIComponent(q)}`;
            if (searchEngine === "yahoo") {
                url = `https://search.yahoo.com/search?p=${encodeURIComponent(q)}`;
            } else if (searchEngine === "ecosia") {
                url = `https://www.ecosia.org/search?q=${encodeURIComponent(q)}`;
            }
        }
    }

    return NextResponse.redirect(url, 302);
}