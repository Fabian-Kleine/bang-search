import { NextResponse } from "next/server";

export function GET() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="/js/search.min.js"></script>
        </head>
        <body>
            <p>Redirecting...</p>
        </body>
    </html>
    `;

    const headers = new Headers({
        "Content-Type": "text/html",
        "Cache-Control": "public, max-age=86400",
        "Vary": "Accept-Encoding",
    });

    return new NextResponse(html, {
        status: 200,
        headers,
    });
}