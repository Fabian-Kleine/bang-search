export interface Bang {
    name: string;
    bang: string;
    url: string;
    img?: string;
    disabled?: boolean;
}

export const bangs: Bang[] = [
    {
        name: "Google",
        bang: "!g",
        url: "https://www.google.com/search?q=%s",
        img: "/logos/google.png",
    },
    {
        name: "DuckDuckGo",
        bang: "!d",
        url: "https://duckduckgo.com/?q=%s",
        img: "/logos/duckduckgo.png",
    },
    {
        name: "Bing",
        bang: "!b",
        url: "https://www.bing.com/search?q=%s",
        img: "/logos/bing.png",
    },
    {
        name: "Yahoo",
        bang: "!y",
        url: "https://search.yahoo.com/search?p=%s",
        img: "/logos/yahoo.png",
    },
    {
        name: "Wikipedia",
        bang: "!w",
        url: "https://en.wikipedia.org/w/index.php?search=%s",
        img: "https://cdn.simpleicons.org/wikipedia/{{theme}}",
    },
    {
        name: "Wikipedia (DE)",
        bang: "!wde",
        url: "https://de.wikipedia.org/w/index.php?search=%s",
        img: "https://cdn.simpleicons.org/wikipedia/{{theme}}",
    },
    {
        name: "Wiki Fandom",
        bang: "!wf",
        url: "https://community.fandom.com/wiki/Special:Search?query=%s&scope=cross-wiki",
        img: "https://cdn.simpleicons.org/fandom/fandom",
    },
    {
        name: "YouTube",
        bang: "!yt",
        url: "https://www.youtube.com/results?search_query=%s",
        img: "https://cdn.simpleicons.org/youtube/youtube",
    },
    {
        name: "Twitch",
        bang: "!tw",
        url: "https://www.twitch.tv/search?term=%s",
        img: "https://cdn.simpleicons.org/twitch/twitch",
    },
    {
        name: "Amazon",
        bang: "!a",
        url: "https://www.amazon.com/s?k=%s",
        img: "https://static.cdnlogo.com/logos/a/1/amazon-icon.svg"
    },
    {
        name: "Amazon (DE)",
        bang: "!ade",
        url: "https://www.amazon.de/s?k=%s",
        img: "https://static.cdnlogo.com/logos/a/1/amazon-icon.svg"
    },
    {
        name: "eBay",
        bang: "!ebay",
        url: "https://www.ebay.com/sch/i.html?_nkw=%s",
        img: "/logos/ebay.png",
    },
    {
        name: "Reddit",
        bang: "!r",
        url: "https://www.reddit.com/search?q=%s",
        img: "https://static.cdnlogo.com/logos/r/93/reddit.svg",
    },
    {
        name: "X",
        bang: "!x",
        url: "https://x.com/search?q=%s",
        img: "https://cdn.simpleicons.org/x/{{theme}}",
    },
    {
        name: "Instagram",
        bang: "!ig",
        url: "https://www.instagram.com/explore/tags/%s/",
        img: "https://static.cdnlogo.com/logos/i/28/instagram.png"
    },
    {
        name: "Facebook",
        bang: "!fb",
        url: "https://www.facebook.com/search/top?q=%s",
        img: "https://cdn.simpleicons.org/facebook/facebook"
    },
    {
        name: "Threads",
        bang: "!th",
        url: "https://www.threads.com/search?q=%s",
        img: "https://cdn.simpleicons.org/threads/{{theme}}",
    },
    {
        name: "TikTok",
        bang: "!tt",
        url: "https://www.tiktok.com/search?q=%s",
        img: "https://static.cdnlogo.com/logos/t/69/tiktok-icon.svg",
    },
    {
        name: "LinkedIn",
        bang: "!li",
        url: "https://www.linkedin.com/search/results/all/?keywords=%s",
        img: "https://static.cdnlogo.com/logos/l/66/linkedin-icon.svg"
    },
    {
        name: "Pinterest",
        bang: "!pin",
        url: "https://www.pinterest.com/search/pins/?q=%s",
        img: "https://cdn.simpleicons.org/pinterest/pinterest",
    },
    {
        name: "GitHub",
        bang: "!gh",
        url: "https://github.com/search?q=%s",
        img: "https://cdn.simpleicons.org/github/{{theme}}",
    },
    {
        name: "Stack Overflow",
        bang: "!ov",
        url: "https://stackoverflow.com/search?q=%s",
        img: "https://cdn.simpleicons.org/stackoverflow/stackoverflow",
    },
    {
        name: "Quora",
        bang: "!q",
        url: "https://www.quora.com/search?q=%s",
        img: "https://cdn.simpleicons.org/quora/quora",
    },
    {
        name: "Flickr",
        bang: "!f",
        url: "https://www.flickr.com/search/?text=%s",
        img: "https://static.cdnlogo.com/logos/f/12/flickr.svg",
    },
    {
        name: "Spotify",
        bang: "!sp",
        url: "https://open.spotify.com/search/%s",
        img: "https://cdn.simpleicons.org/spotify/spotify",
    },
    {
        name: "SoundCloud",
        bang: "!sc",
        url: "https://soundcloud.com/search?q=%s",
        img: "https://cdn.simpleicons.org/soundcloud/soundcloud",
    },
    {
        name: "Pixabay",
        bang: "!px",
        url: "https://pixabay.com/images/search/%s",
        img: "https://cdn.simpleicons.org/pixabay/pixabay",
    },
    {
        name: "Pexels",
        bang: "!pex",
        url: "https://www.pexels.com/search/%s",
        img: "https://cdn.simpleicons.org/pexels/pexels",
    },
    {
        name: "Unsplash",
        bang: "!uns",
        url: "https://unsplash.com/s/photos/%s",
        img: "https://cdn.simpleicons.org/unsplash/{{theme}}",
    },
    {
        name: "Adobe Stock",
        bang: "!astk",
        url: "https://stock.adobe.com/search?k=%s",
        img: "https://static.cdnlogo.com/logos/a/74/adobe-stock.svg",
    },
    {
        name: "Bing Images",
        bang: "!bi",
        url: "https://www.bing.com/images/search?q=%s",
        img: "/logos/bing.png",
    },
    {
        name: "Google Images",
        bang: "!gi",
        url: "https://www.google.com/search?tbm=isch&q=%s",
        img: "/logos/google.png",
    },
    {
        name: "Google Maps",
        bang: "!m",
        url: "https://www.google.com/maps/search/%s",
        img: "https://static.cdnlogo.com/logos/g/81/google-maps-2020-icon.svg",
    },
    {
        name: "Steam",
        bang: "!steam",
        url: "https://store.steampowered.com/search/?term=%s",
        img: "https://static.cdnlogo.com/logos/s/83/steam-icon.svg",
    },
    {
        name: "Epic Games",
        bang: "!epic",
        url: "https://store.epicgames.com/browse?q=%s",
        img: "https://cdn.simpleicons.org/epicgames/{{theme}}",
    },
    {
        name: "Google Translate",
        bang: "!gt",
        url: "https://translate.google.com/?sl=auto&tl=en&text=%s",
        img: "https://static.cdnlogo.com/logos/g/31/google-translate.svg",
    },
    {
        name: "DeepL",
        bang: "!dpl",
        url: "https://www.deepl.com/translator#en/%s",
        img: "https://cdn.simpleicons.org/deepl/deepl",
    },
    {
        name: "Netflix",
        bang: "!nf",
        url: "https://www.netflix.com/search?q=%s",
        img: "https://cdn.simpleicons.org/netflix/netflix",
    },
    {
        name: "Amazon Prime Video",
        bang: "!apv",
        url: "https://www.amazon.com/gp/video/search?phrase=%s",
        img: "https://cdn.simpleicons.org/prime/prime",
    },
    {
        name: "Amazon Prime Video (DE)",
        bang: "!apvde",
        url: "https://www.amazon.de/gp/video/search?phrase=%s",
        img: "https://cdn.simpleicons.org/prime/prime",
    },
    {
        name: "Simple Icons",
        bang: "!si",
        url: "https://simpleicons.org/?q=%s",
        img: "https://cdn.simpleicons.org/simpleicons/{{theme}}",
    },
    {
        name: "Booking.com",
        bang: "!bcom",
        url: "https://www.booking.com/searchresults.en-gb.html?ss=%s",
        img: "https://static.cdnlogo.com/logos/b/46/booking-com.svg",
    },
    {
        name: "Airbnb",
        bang: "!abnb",
        url: "https://www.airbnb.com/s/%s",
        img: "https://cdn.simpleicons.org/airbnb/airbnb",
    },
    {
        name: "Wayback Machine",
        bang: "!wbm",
        url: "https://web.archive.org/web/*/%s",
        img: "https://static.cdnlogo.com/logos/w/66/wayback-machine.svg",
    },
    {
        name: "ChatGPT",
        bang: "!gpt",
        url: "https://chatgpt.com/?q=%s",
        img: "https://cdn.simpleicons.org/openai/{{theme}}",
    },
    {
        name: "Claude AI",
        bang: "!claude",
        url: "https://claude.ai/new?q=%s",
        img: "https://cdn.simpleicons.org/claude/claude",
    },
    {
        name: "Copilot",
        bang: "!cop",
        url: "https://copilot.microsoft.com/?q=%s",
        img: "https://static.cdnlogo.com/logos/c/99/copilot.svg"
    },
    {
        name: "Mozilla Developer Network",
        bang: "!mdn",
        url: "https://developer.mozilla.org/search?q=%s",
        img: "https://cdn.simpleicons.org/mdnwebdocs/{{theme}}",
    },
    {
        name: "icons8",
        bang: "!i8",
        url: "https://icons8.com/icons/set/%s",
        img: "https://cdn.simpleicons.org/icons8/icons8",
    },
    {
        name: "Lucide Icons",
        bang: "!lucide",
        url: "https://lucide.dev/icons/?search=%s",
        img: "https://cdn.simpleicons.org/lucide/lucide",
    },
    {
        name: "Font Awesome",
        bang: "!fa",
        url: "https://fontawesome.com/search?q=%s",
        img: "https://cdn.simpleicons.org/fontawesome/fontawesome",
    },
    {
        name: "Google Material Icons",
        bang: "!mi",
        url: "https://fonts.google.com/icons?icon.query=%s",
        img: "https://static.cdnlogo.com/logos/g/18/google-fonts-2021.svg",
    },
    {
        name: "Google Fonts",
        bang: "!gf",
        url: "https://fonts.google.com/?query=%s",
        img: "https://static.cdnlogo.com/logos/g/18/google-fonts-2021.svg",
    },
    {
        name: "Bootstrap Icons",
        bang: "!bsi",
        url: "https://icons.getbootstrap.com/?q=%s",
        img: "https://cdn.simpleicons.org/bootstrap/bootstrap",
    },
    {
        name: "npm",
        bang: "!npm",
        url: "https://www.npmjs.com/search?q=%s",
        img: "https://cdn.simpleicons.org/npm/npm",
    },
    {
        name: "PyPI",
        bang: "!pypi",
        url: "https://pypi.org/search/?q=%s",
        img: "https://cdn.simpleicons.org/pypi/pypi",
    }
];

export function getBang(query: string, customBangs: Bang[]): { bang: Bang | null; searchTerm: string } {
    const allBangs = [...bangs, ...customBangs];
    let searchTerm = query;
    let foundBang: Bang | null = null;

    for (const bangObj of allBangs) {
        const bangPattern = bangObj.bang;
        let bangIndex = -1;
        let isExactMatch = false;
        let isStartMatch = false;
        let isEndMatch = false;
        let isMiddleMatch = false;

        if (query === bangPattern) {
            bangIndex = 0;
            isExactMatch = true;
        } else if (query.startsWith(bangPattern + " ")) {
            bangIndex = 0;
            isStartMatch = true;
        } else if (query.endsWith(" " + bangPattern)) {
            bangIndex = query.lastIndexOf(" " + bangPattern) + 1;
            isEndMatch = true;
        } else {
            const middleIndex = query.indexOf(" " + bangPattern + " ");
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
                searchTerm = query.substring(bangPattern.length + 1);
            } else if (isEndMatch) {
                searchTerm = query.substring(0, bangIndex - 1);
            } else if (isMiddleMatch) {
                const before = query.substring(0, bangIndex - 1);
                const after = query.substring(bangIndex + bangPattern.length + 1);
                searchTerm = (before + " " + after).trim();
            }

            break;
        }
    }

    return { bang: foundBang, searchTerm };
}

export function getBangUrl(query: string, customBangs?: Bang[]): string | null {
    if (!customBangs) customBangs = [];
    const { bang, searchTerm } = getBang(query, customBangs);

    if (!bang) {
        return null;
    }

    return bang.url.replace("%s", encodeURIComponent(searchTerm.trim()));
}