export interface Bang {
    name: string;
    bang: string;
    url: string;
}

export const bangs: Bang[] = [
    {
        name: "Google",
        bang: "!g",
        url: "https://www.google.com/search?q={{query}}",
    },
    {
        name: "DuckDuckGo",
        bang: "!d",
        url: "https://duckduckgo.com/?q={{query}}",
    },
    {
        name: "Bing",
        bang: "!b",
        url: "https://www.bing.com/search?q={{query}}",
    },
    {
        name: "Yahoo",
        bang: "!y",
        url: "https://search.yahoo.com/search?p={{query}}",
    },
    {
        name: "Wikipedia",
        bang: "!w",
        url: "https://en.wikipedia.org/w/index.php?search={{query}}",
    },
    {
        name: "YouTube",
        bang: "!yt",
        url: "https://www.youtube.com/results?search_query={{query}}",
    },
    {
        name: "Amazon",
        bang: "!a",
        url: "https://www.amazon.com/s?k={{query}}",
    },
    {
        name: "eBay",
        bang: "!ebay",
        url: "https://www.ebay.com/sch/i.html?_nkw={{query}}",
    },
    {
        name: "Reddit",
        bang: "!r",
        url: "https://www.reddit.com/search?q={{query}}",
    },
    {
        name: "Twitter",
        bang: "!tw",
        url: "https://twitter.com/search?q={{query}}",
    },
    {
        name: "Instagram",
        bang: "!ig",
        url: "https://www.instagram.com/explore/tags/{{query}}/",
    },
    {
        name: "LinkedIn",
        bang: "!li",
        url: "https://www.linkedin.com/search/results/all/?keywords={{query}}",
    },
];