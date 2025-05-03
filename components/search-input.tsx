"use client";

import { cn } from "@/lib/utils";
import { Clock4, Search, X } from "lucide-react";
import { useState, useRef, FocusEvent } from "react";
import { Separator } from "./ui/separator";

interface SearchInputProps extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'value' | 'onChange'> {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function SearchInput({ className, value, onChange, ...props }: SearchInputProps) {
    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;

        // Call original onInput prop if it exists
        if (props.onInput) {
            props.onInput(event);
        }
    };

    const handleHistoryClick = (historyString: string) => {
        const syntheticEvent = {
            target: { value: historyString },
            currentTarget: { value: historyString },
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(syntheticEvent);

        setTimeout(() => {
            submitBtnRef.current?.click();
        }, 0);
    }

    const handleHistoryRemove = (index: number) => {
        setHistory((prevHistory) => prevHistory.filter((_, i) => i !== index));
    }

    const handleClearSearch = () => {
        onChange({ target: { value: "" }, currentTarget: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);
        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
        }
    };

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [focused, setFocused] = useState(false);
    const [history, setHistory] = useState<string[]>([
        "Bears !gi",
        "Cats !gi",
        "next.js !gh",
        "flex !tw",
        "Elon Musk !x",
        "A very long search term that should be truncated wado jwadpiojawpdjpwadawkdok",
    ]); // replace with localSotrage

    const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
        setTimeout(() => {
            if (!containerRef.current?.contains(event.relatedTarget as Node)) {
                setFocused(false);
            }
        }, 150);
    };

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative bg-accent border-input flex min-h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] md:text-sm z-20",
                focused && history.length > 0 && !value && "rounded-none rounded-t-md border-b-0",
                className
            )}>
            <div className="flex w-full items-start">
                <Search className="absolute top-[1.125rem] left-3 -translate-y-1/2 text-muted-foreground" size={18} />
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={onChange}
                    rows={1}
                    className="w-full px-8 py-1 bg-transparent border-none focus:outline-none flex-1 resize-none overflow-y-auto max-h-[220px]"
                    placeholder="Search the Web..."
                    onInput={handleInput}
                    onFocus={() => setFocused(true)}
                    onBlur={handleBlur}
                    {...props}
                />
                {value && (
                    <button
                        onClick={handleClearSearch}
                        className="absolute top-[1.125rem] right-3 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer">
                        <X size={18} />
                        <span className="sr-only">Clear Search</span>
                    </button>
                )}
            </div>
            {focused && history.length > 0 && !value && (
                <div className="absolute box-content top-full left-0 -ml-[1px] w-full bg-accent border border-t-0 border-input rounded-b-md z-10 flex flex-col justif-center">
                    <div className="px-4 my-1">
                        <Separator decorative />
                    </div>
                    <ul>
                        {history.map((item, index) => (
                            <li onClick={() => handleHistoryClick(item)} key={index} className="group px-3 py-2 flex items-center gap-4 rounded-sm hover:bg-popover">
                                <Clock4 className="flex-shrink-0 text-muted-foreground" size={16} />
                                <p className="truncate cursor-default flex-1 min-w-0">{item}</p>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleHistoryRemove(index);
                                    }}
                                    className="text-muted-foreground ml-auto hidden pointer-fine:group-hover:block hover:underline hover:text-primary cursor-pointer z-20 flex-shrink-0"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleHistoryRemove(index);
                                    }}
                                    className="text-muted-foreground ml-auto hidden pointer-coarse:block hover:underline hover:text-primary cursor-pointer z-20 flex-shrink-0"
                                >
                                    <span className="sr-only">Remove</span>
                                    <X size={18} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <button ref={submitBtnRef} className="hidden" type="submit" />
        </div>
    );
}