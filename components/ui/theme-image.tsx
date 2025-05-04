"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeImage({src, ...props}: React.ImgHTMLAttributes<HTMLImageElement>) {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    if(src && typeof src === "string" && src.includes("{{theme}}")) {
        src = src.replace("{{theme}}", resolvedTheme === "dark" ? "ffffff" : "000000");
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <img
            src={src}
            {...props}
        />
    );
}