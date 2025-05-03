export interface Bang {
    name: string;
    bang: string;
    url: string;
    img?: string;
}

export const bangs: Bang[] = [
    {
        name: "Google",
        bang: "!g",
        url: "https://www.google.com/search?q={{query}}",
        img: "/logos/google.png",
    },
    {
        name: "DuckDuckGo",
        bang: "!d",
        url: "https://duckduckgo.com/?q={{query}}",
        img: "/logos/duckduckgo.png",
    },
    {
        name: "Bing",
        bang: "!b",
        url: "https://www.bing.com/search?q={{query}}",
        img: "/logos/bing.png",
    },
    {
        name: "Yahoo",
        bang: "!y",
        url: "https://search.yahoo.com/search?p={{query}}",
        img: "/logos/yahoo.png",
    },
    {
        name: "Wikipedia",
        bang: "!w",
        url: "https://en.wikipedia.org/w/index.php?search={{query}}",
        img: "https://cdn.simpleicons.org/wikipedia/wikipedia",
    },
    {
        name: "YouTube",
        bang: "!yt",
        url: "https://www.youtube.com/results?search_query={{query}}",
        img: "https://cdn.simpleicons.org/youtube/youtube",
    },
    {
        name: "Amazon",
        bang: "!a",
        url: "https://www.amazon.com/s?k={{query}}",
        img: "https://static.cdnlogo.com/logos/a/1/amazon-icon.svg"
    },
    {
        name: "eBay",
        bang: "!ebay",
        url: "https://www.ebay.com/sch/i.html?_nkw={{query}}",
        img: "https://static.cdnlogo.com/logos/e/33/ebay.svg"
    },
    {
        name: "Reddit",
        bang: "!r",
        url: "https://www.reddit.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/reddit/reddit",
    },
    {
        name: "X",
        bang: "!x",
        url: "https://x.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/x/x",
    },
    {
        name: "Instagram",
        bang: "!ig",
        url: "https://www.instagram.com/explore/tags/{{query}}/",
        img: "https://static.cdnlogo.com/logos/i/4/instagram.svg"
    },
    {
        name: "LinkedIn",
        bang: "!li",
        url: "https://www.linkedin.com/search/results/all/?keywords={{query}}",
        img: "https://static.cdnlogo.com/logos/l/66/linkedin-icon.svg"
    },
];