"use client";

import { cn } from "@/lib/utils";
import { Clock4, Search, Sparkles, X } from "lucide-react";
import { useState, useRef, FocusEvent, KeyboardEvent, useEffect } from "react";
import { Separator } from "./ui/separator";
import useSearchHistoryStore from "@/hooks/useSearchHistory";
import { Button } from "./ui/button";
import Link from "next/link";
import { Bang, bangs } from "@/bangs";
import { useSearchParams } from "next/navigation";

interface SearchInputProps extends Omit<React.HTMLProps<HTMLTextAreaElement>, 'value' | 'onChange'> {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function SearchInput({ className, value, onChange, ...props }: SearchInputProps) {
    const { history, removeSearch } = useSearchHistoryStore();

    const searchParams = useSearchParams();
    const bangParam = searchParams.get("b") || null;

    const [focused, setFocused] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const submitBtnRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const bangSuggestContainerRef = useRef<HTMLDivElement>(null); // Ref for bang suggestion container

    const [isBangSearchActive, setIsBangSearchActive] = useState(false);
    const [filteredBangs, setFilteredBangs] = useState<Bang[]>([]);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    const [calculation, setCalculation] = useState<number>(NaN);

    const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;

        const currentValue = textarea.value;

        // determine if calculation is needed
        if (/^[0-9+\-*/().\s]*$/.test(textarea.value)) {
            try {
                const evaluateSearchMath = eval(textarea.value);  
                if (typeof evaluateSearchMath === 'number' && !isNaN(evaluateSearchMath) && isFinite(evaluateSearchMath)) {
                    setCalculation(evaluateSearchMath);
                } else {
                    setCalculation(NaN);
                } 
            } catch (error) {
                setCalculation(NaN);
            }
        }

        // determine if bang search is active
        const lastBangIndex = currentValue.lastIndexOf("!");
        let bangSearchBecameActive = false;
        let bangSearchBecameInactive = false;

        if (lastBangIndex !== -1 && lastBangIndex === currentValue.length - 1) {
            if (!isBangSearchActive) bangSearchBecameActive = true;
            setFilteredBangs(bangs);
            setIsBangSearchActive(true);
        } else if (lastBangIndex !== -1 && currentValue[lastBangIndex + 1] !== ' ' && lastBangIndex === currentValue.search(/!\S*$/)) {
            if (!isBangSearchActive) bangSearchBecameActive = true;
            const term = currentValue.substring(lastBangIndex + 1);
            setFilteredBangs(
                bangs.filter(b => b.bang.startsWith(`!${term}`))
            );
            setIsBangSearchActive(true);
        } else {
            if (isBangSearchActive) bangSearchBecameInactive = true;
            setIsBangSearchActive(false);
            setFilteredBangs([]);
        }

        if (bangSearchBecameActive || bangSearchBecameInactive || (!value && currentValue) || (value && !currentValue)) {
            setHighlightedIndex(-1);
        }

        if (props.onInput) {
            props.onInput(event);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        const activeList = isHistoryVisible ? history : (isBangSuggestVisible ? filteredBangs : null);
        const listLength = activeList?.length ?? 0;

        if (isDropdownVisible && listLength > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setHighlightedIndex(prev => (prev + 1) % listLength);
            } else if (event.key === 'ArrowUp') {
                event.preventDefault();
                setHighlightedIndex(prev => (prev - 1 + listLength) % listLength);
            } else if (event.key === 'Enter') {
                if (highlightedIndex !== -1) {
                    event.preventDefault();
                    if (isHistoryVisible) {
                        handleHistoryClick(history[highlightedIndex]);
                    } else if (isBangSuggestVisible) {
                        handleBangSelect(filteredBangs[highlightedIndex]);
                    }
                } else if (!event.shiftKey) {
                    event.preventDefault();
                    submitBtnRef.current?.click();
                }
            } else if (event.key === 'Escape') {
                event.preventDefault();
                setFocused(false);
                setIsBangSearchActive(false);
                setHighlightedIndex(-1);
            }
        } else if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitBtnRef.current?.click();
        }

        if (props.onKeyDown) {
            props.onKeyDown(event);
        }
    };

    const handleHistoryClick = (historyString: string) => {
        const syntheticEvent = {
            target: { value: historyString },
            currentTarget: { value: historyString },
        } as React.ChangeEvent<HTMLTextAreaElement>;

        onChange(syntheticEvent);
        setIsBangSearchActive(false);
        setHighlightedIndex(-1);

        setTimeout(() => {
            submitBtnRef.current?.click();
        }, 0);
    };

    const handleHistoryRemove = (index: number) => {
        removeSearch(index);
        setHighlightedIndex(-1);
    };

    const handleClearSearch = () => {
        onChange({ target: { value: "" }, currentTarget: { value: "" } } as React.ChangeEvent<HTMLTextAreaElement>);
        setIsBangSearchActive(false);
        setFilteredBangs([]);
        setHighlightedIndex(-1);
        setCalculation(NaN);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.focus();
        }
    };

    const handleFocus = () => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
        }
        setFocused(true);
        setHighlightedIndex(-1);
        handleInput({ currentTarget: textareaRef.current } as React.FormEvent<HTMLTextAreaElement>);
    };

    const handleBlur = (event: FocusEvent<HTMLTextAreaElement>) => {
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
        }
        blurTimeoutRef.current = setTimeout(() => {
            if (!containerRef.current?.contains(event.relatedTarget as Node)) {
                setFocused(false);
                setIsBangSearchActive(false);
                setHighlightedIndex(-1);
            }
        }, 150);
    };

    const handleBangSelect = (bang: Bang) => {
        const currentValue = value;
        const lastBangIndex = currentValue.lastIndexOf("!");

        if (lastBangIndex !== -1) {
            const newValue = currentValue.substring(0, lastBangIndex) + bang.bang + " ";
            onChange({ target: { value: newValue }, currentTarget: { value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>);

            setIsBangSearchActive(false);
            setFilteredBangs([]);
            setHighlightedIndex(-1);
            textareaRef.current?.focus();

            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.style.height = 'auto';
                    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
                }
            }, 0);
        }
    };

    useEffect(() => {
        return () => {
            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (bangParam) {
            const bang = bangs.find(b => b.bang === bangParam);
            if (bang) {
                const newValue = `${bang.bang} `;
                onChange({ target: { value: newValue }, currentTarget: { value: newValue } } as React.ChangeEvent<HTMLTextAreaElement>);
                setIsBangSearchActive(false);
                setFilteredBangs([]);
            }
        }
    }, [bangParam]);

    const isHistoryVisible = focused && history.length > 0 && !value && !isBangSearchActive && !calculation;
    const isBangSuggestVisible = focused && isBangSearchActive && filteredBangs.length > 0 && value;
    const isCalculationVisible = focused && !isBangSearchActive && !isHistoryVisible && !Number.isNaN(calculation) && value && /[+\-*/]/.test(value) && calculation !== 0;
    const isDropdownVisible = isHistoryVisible || isBangSuggestVisible || isCalculationVisible;

    useEffect(() => {
        if (isBangSuggestVisible && highlightedIndex !== -1) {
            const listElement = bangSuggestContainerRef.current;
            const highlightedItem = listElement?.querySelector(`#search-item-${highlightedIndex}`);

            if (highlightedItem) {
                highlightedItem.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest'
                });
            }
        }
    }, [highlightedIndex, isBangSuggestVisible]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative bg-accent border-input flex min-h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] md:text-sm z-20",
                isDropdownVisible && "rounded-none rounded-t-md border-b-0",
                className
            )}>
            <div className="flex w-full items-start">
                <Search className="absolute top-[1.125rem] left-3 -translate-y-1/2 text-muted-foreground" size={18} />
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => {
                        const willBeHistoryVisible = focused && history.length > 0 && !e.target.value && !isBangSearchActive;
                        if (isHistoryVisible !== willBeHistoryVisible) {
                            setHighlightedIndex(-1);
                        }
                        onChange(e);
                    }}
                    rows={1}
                    className="w-full px-8 py-1 bg-transparent border-none focus:outline-none flex-1 resize-none overflow-y-auto max-h-[220px]"
                    placeholder="Search the Web or type ! for bangs..."
                    onInput={handleInput}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    aria-haspopup="listbox"
                    aria-activedescendant={highlightedIndex !== -1 ? `search-item-${highlightedIndex}` : undefined}
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

            {isHistoryVisible && (
                <div className="absolute box-content top-full left-0 -ml-[1px] w-full bg-accent border border-t-0 border-input rounded-b-md z-10 flex flex-col justif-center">
                    <div className="px-4 my-1">
                        <Separator decorative />
                    </div>
                    <ul role="listbox">
                        {history.map((item, index) => (
                            <li
                                id={`search-item-${index}`}
                                role="option"
                                aria-selected={highlightedIndex === index}
                                onClick={() => handleHistoryClick(item)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                key={index}
                                className={cn(
                                    "group px-3 py-2 flex items-center gap-4 rounded-sm hover:bg-popover cursor-pointer",
                                    highlightedIndex === index && "bg-popover"
                                )}
                            >
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
                    <div className="flex justify-center gap-4 my-2">
                        <Button type="submit" className="px-8 cursor-pointer">
                            <Search />
                            Search
                        </Button>
                        <Button className="px-8" asChild>
                            <Link href={"/bangs"}>
                                <Sparkles />
                                Bangs
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            {isBangSuggestVisible && (
                <div
                    ref={bangSuggestContainerRef}
                    className="absolute box-content top-full left-0 -ml-[1px] w-full bg-accent border border-t-0 border-input rounded-b-md z-10 flex flex-col justif-center max-h-60 overflow-y-auto"
                >
                    <div className="px-4 my-1">
                        <Separator decorative />
                    </div>
                    <ul role="listbox">
                        {filteredBangs.map((bang, index) => (
                            <li
                                id={`search-item-${index}`}
                                role="option"
                                aria-selected={highlightedIndex === index}
                                key={bang.bang}
                                onClick={() => handleBangSelect(bang)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onMouseDown={(e) => e.preventDefault()}
                                className={cn(
                                    "group px-3 py-2 flex items-center gap-4 rounded-sm hover:bg-popover cursor-pointer",
                                    highlightedIndex === index && "bg-popover"
                                )}
                            >
                                {bang.img ? (
                                    <img
                                        src={bang.img}
                                        alt={bang.name}
                                        width={20}
                                        height={20}
                                        className="flex-shrink-0"
                                        loading="lazy"
                                    />
                                ) : (
                                    <Sparkles className="flex-shrink-0 text-muted-foreground" size={16} />
                                )}
                                <span className="font-medium">{bang.bang}</span>
                                <span className="text-muted-foreground truncate flex-1 min-w-0">{bang.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isCalculationVisible && (
                <div className="absolute box-content top-full left-0 -ml-[1px] w-full bg-accent border border-t-0 border-input rounded-b-md z-10 flex flex-col justif-center">
                    <div className="px-4 my-1">
                        <Separator decorative />
                    </div>
                    <div className="px-3 py-2 flex flex-col items-end rounded-sm hover:bg-popover cursor-pointer">
                        <p className="truncate text-muted-foreground cursor-default flex-1 min-w-0">{value.trim().split(" ").join("")}=</p>
                        <p className="text-lg truncate cursor-default flex-1 min-w-0">{calculation}</p>
                    </div>
                    <div className="flex justify-center gap-4 my-2">
                        <Button type="submit" className="px-8 cursor-pointer">
                            <Search />
                            Search
                        </Button>
                        <Button className="px-8" asChild>
                            <Link href={"/bangs"}>
                                <Sparkles />
                                Bangs
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            <button ref={submitBtnRef} className="hidden" type="submit" />
        </div>
    );
}