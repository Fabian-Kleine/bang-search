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
        img: "https://cdn.simpleicons.org/wikipedia/{{theme}}",
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
        name: "Amazon (DE)",
        bang: "!ade",
        url: "https://www.amazon.de/s?k={{query}}",
        img: "https://static.cdnlogo.com/logos/a/1/amazon-icon.svg"
    },
    {
        name: "eBay",
        bang: "!ebay",
        url: "https://www.ebay.com/sch/i.html?_nkw={{query}}",
        img: "/logos/ebay.png",
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
        img: "https://cdn.simpleicons.org/x/{{theme}}",
    },
    {
        name: "Instagram",
        bang: "!ig",
        url: "https://www.instagram.com/explore/tags/{{query}}/",
        img: "https://static.cdnlogo.com/logos/i/4/instagram.svg"
    },
    {
        name: "Facebook",
        bang: "!fb",
        url: "https://www.facebook.com/search/top?q={{query}}",
        img: "https://cdn.simpleicons.org/facebook/facebook"
    },
    {
        name: "Threads",
        bang: "!th",
        url: "https://www.threads.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/threads/{{theme}}",
    },
    {
        name: "TikTok",
        bang: "!tt",
        url: "https://www.tiktok.com/search?q={{query}}",
        img: "https://static.cdnlogo.com/logos/t/69/tiktok-icon.svg",
    },
    {
        name: "LinkedIn",
        bang: "!li",
        url: "https://www.linkedin.com/search/results/all/?keywords={{query}}",
        img: "https://static.cdnlogo.com/logos/l/66/linkedin-icon.svg"
    },
    {
        name: "Pinterest",
        bang: "!pin",
        url: "https://www.pinterest.com/search/pins/?q={{query}}",
        img: "https://cdn.simpleicons.org/pinterest/pinterest",
    },
    {
        name: "GitHub",
        bang: "!gh",
        url: "https://github.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/github/{{theme}}",
    },
    {
        name: "Stack Overflow",
        bang: "!ov",
        url: "https://stackoverflow.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/stackoverflow/stackoverflow",
    },
    {
        name: "Quora",
        bang: "!q",
        url: "https://www.quora.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/quora/quora",
    },
    {
        name: "Flickr",
        bang: "!f",
        url: "https://www.flickr.com/search/?text={{query}}",
        img: "https://static.cdnlogo.com/logos/f/12/flickr.svg",
    },
    {
        name: "Spotify",
        bang: "!sp",
        url: "https://open.spotify.com/search/{{query}}",
        img: "https://cdn.simpleicons.org/spotify/spotify",
    },
    {
        name: "SoundCloud",
        bang: "!sc",
        url: "https://soundcloud.com/search?q={{query}}",
        img: "https://cdn.simpleicons.org/soundcloud/soundcloud",
    },
    {
        name: "Pixabay",
        bang: "!px",
        url: "https://pixabay.com/images/search/{{query}}",
        img: "https://cdn.simpleicons.org/pixabay/pixabay",
    },
    {
        name: "Pexels",
        bang: "!pex",
        url: "https://www.pexels.com/search/{{query}}",
        img: "https://cdn.simpleicons.org/pexels/pexels",
    },
    {
        name: "Unsplash",
        bang: "!uns",
        url: "https://unsplash.com/s/photos/{{query}}",
        img: "https://cdn.simpleicons.org/unsplash/{{theme}}",
    },
    {
        name: "Adobe Stock",
        bang: "!astk",
        url: "https://stock.adobe.com/search?k={{query}}",
        img: "https://static.cdnlogo.com/logos/a/74/adobe-stock.svg",
    },
    {
        name: "Bing Images",
        bang: "!bi",
        url: "https://www.bing.com/images/search?q={{query}}",
        img: "/logos/bing.png",
    },
    {
        name: "Google Images",
        bang: "!gi",
        url: "https://www.google.com/search?tbm=isch&q={{query}}",
        img: "/logos/google.png",
    },
    {
        name: "Google Maps",
        bang: "!m",
        url: "https://www.google.com/maps/search/{{query}}",
        img: "https://static.cdnlogo.com/logos/g/81/google-maps-2020-icon.svg",
    },
    {
        name: "Steam",
        bang: "!steam",
        url: "https://store.steampowered.com/search/?term={{query}}",
        img: "https://static.cdnlogo.com/logos/s/83/steam-icon.svg",
    },
    {
        name: "Google Translate",
        bang: "!gt",
        url: "https://translate.google.com/?sl=auto&tl=en&text={{query}}",
        img: "https://static.cdnlogo.com/logos/g/31/google-translate.svg",
    },
    {
        name: "Netflix",
        bang: "!nf",
        url: "https://www.netflix.com/search?q={{query}}",
        img: "https:cdn.simpleicons.org/netflix/netflix",
    },
    {
        name: "Amazon Prime Video",
        bang: "!apv",
        url: "https://www.amazon.com/gp/video/search?phrase={{query}}",
        img: "https://cdn.simpleicons.org/prime/prime",
    },
    {
        name: "Amazon Prime Video (DE)",
        bang: "!apvde",
        url: "https://www.amazon.de/gp/video/search?phrase={{query}}",
        img: "https://cdn.simpleicons.org/prime/prime",
    },
    {
        name: "Simple Icons",
        bang: "!si",
        url: "https://simpleicons.org/?q={{query}}",
        img: "https://cdn.simpleicons.org/simpleicons/{{theme}}",
    },
    {
        name: "Booking.com",
        bang: "!bcom",
        url: "https://www.booking.com/searchresults.en-gb.html?ss={{query}}",
        img: "https://static.cdnlogo.com/logos/b/46/booking-com.svg",
    },
    {
        name: "Airbnb",
        bang: "!abnb",
        url: "https://www.airbnb.com/s/{{query}}",
        img: "https://cdn.simpleicons.org/airbnb/airbnb",
    },
    {
        name: "Wayback Machine",
        bang: "!wbm",
        url: "https://web.archive.org/web/*/{{query}}",
        img: "https://static.cdnlogo.com/logos/w/66/wayback-machine.svg",
    },
    {
        name: "ChatGPT",
        bang: "!gpt",
        url: "https://chatgpt.com/?q={{query}}",
        img: "https://cdn.simpleicons.org/openai/{{theme}}",
    },
    {
        name: "Claude AI",
        bang: "!claude",
        url: "https://claude.ai/new?q={{query}}",
        img: "https://cdn.simpleicons.org/claude/claude",
    },
    {
        name: "Copilot",
        bang: "!cop",
        url: "https://copilot.microsoft.com/?q={{query}}",
        img: "https://static.cdnlogo.com/logos/c/99/copilot.svg"
    }
];