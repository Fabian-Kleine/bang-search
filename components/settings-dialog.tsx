"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Button } from "./ui/button";

import { Switch } from "./ui/switch";

import Image from "next/image";

import { useTheme } from "next-themes";

import useSettingsStore from "@/hooks/useSettings";
import useCustomBangsStore from "@/hooks/useCustomBangs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CircleHelp, Pencil, Settings2, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { bangs } from "@/lib/bangs";
import { Checkbox } from "./ui/checkbox";

interface SettingsDialogProps {
    children: React.ReactNode;
}

export default function SettingsDialog({ children }: SettingsDialogProps) {
    const {
        searchEngine,
        setSearchEngine,
        openInNewTab,
        setOpenInNewTab,
        searchHistoryActive,
        setSearchHistoryActive,
    } = useSettingsStore();

    const { theme, setTheme } = useTheme();

    const handleClearData = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
    }

    const [addCustomBangFormActive, setAddCustomBangFormActive] = useState(false);
    const [newBangName, setNewBangName] = useState("");
    const [newBangURL, setNewBangURL] = useState("");
    const [newBangShortcut, setNewBangShortcut] = useState("");
    const [newBangNameError, setNewBangNameError] = useState(false);
    const [newBangURLError, setNewBangURLError] = useState(false);
    const [newBangShortcutError, setNewBangShortcutError] = useState(false);
    const [newBangErrorMsg, setNewBangErrorMsg] = useState("");
    const { addBang, bangs: customBangs, removeBang, setBangDisabled } = useCustomBangsStore();

    const handleAddCustomBang = () => {
        const bangSchema = z.object({
            name: z.string().min(1, "Name is required"),
            url: z.string().url("Invalid URL").min(1, "URL is required")
            .refine((val) => {
                const count = (val.match(/%s/g) || []).length;
                return count === 1;
            }, "URL must contain exactly one %s placeholder"),
            shortcut: z.string().min(1, "Shortcut is required").refine((val) => !val.includes("!"), {
            message: "Shortcut should not include '!' anywhere",
            }),
        });

        const result = bangSchema.safeParse({
            name: newBangName,
            url: newBangURL,
            shortcut: newBangShortcut,
        });

        if (result.success) {
            const shortcutExists = customBangs.some(bang => bang.bang === `!${result.data.shortcut}`) || bangs.some(bang => bang.bang === `!${result.data.shortcut}`);
            if (shortcutExists) {
                setNewBangShortcutError(true);
                setNewBangErrorMsg("Shortcut already exists");
                return;
            }

            addBang({
                name: result.data.name,
                url: result.data.url,
                bang: `!${result.data.shortcut}`,
            });
            setAddCustomBangFormActive(false);
            setNewBangName("");
            setNewBangURL("");
            setNewBangShortcut("");
            setNewBangNameError(false);
            setNewBangURLError(false);
            setNewBangShortcutError(false);
            setNewBangErrorMsg("");
        } else {
            const errors = result.error.format();
            setNewBangNameError(!!errors.name?._errors.length);
            setNewBangURLError(!!errors.url?._errors.length);
            setNewBangShortcutError(!!errors.shortcut?._errors.length);
            setNewBangErrorMsg(errors.name?._errors[0] || errors.url?._errors[0] || errors.shortcut?._errors[0] || "");
        }
    }

    const handleEditBang = (index: number) => {
        const bang = customBangs[index];
        setNewBangName(bang.name);
        setNewBangURL(bang.url);
        setNewBangShortcut(bang.bang.replace("!", ""));
        setAddCustomBangFormActive(true);
        removeBang(index);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-6xl h-[80vh] overflow-y-auto p-0">
                <DialogHeader className="sr-only">
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Bang Search Settings
                    </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="settings" className="flex flex-col sm:flex-row gap-6">
                    <TabsList className="flex flex-row mx-auto sm:mx-0 sm:flex-col sm:gap-2 sm:h-auto sm:w-2xs overflow-x-auto sm:overflow-x-visible bg-transparent sm:bg-muted p-1 sm:py-4 sm:justify-start rounded-none">
                        <TabsTrigger value="settings" className="w-full justify-start sm:max-h-fit sm:hover:bg-background sm:dark:hover:bg-input/30 sm:py-1 sm:px-4 cursor-pointer sm:rounded-sm sm:dark:shadow-none sm:!border-none">
                            <Settings2 />
                            Settings
                        </TabsTrigger>
                        <TabsTrigger value="bangs" className="w-full justify-start sm:max-h-fit sm:hover:bg-background sm:dark:hover:bg-input/30 sm:py-1 sm:px-4 cursor-pointer sm:rounded-sm sm:dark:shadow-none sm:!border-none">
                            <Sparkles />
                            Bangs
                        </TabsTrigger>
                    </TabsList>
                    <div className="flex-1 py-6 px-8">
                        <TabsContent value="settings">
                            <h2 className="border-b mb-4 pb-3 font-semibold text-lg">General</h2>
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                                <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                    <h3 className="text-sm">Theme</h3>
                                    <p className="text-muted-foreground text-[0.813rem] ">
                                        Select the theme you want to use.
                                    </p>
                                </div>
                                <Select defaultValue={theme} onValueChange={(value) => setTheme(value)}>
                                    <SelectTrigger className="w-full mt-2 sm:mt-0">
                                        <SelectValue placeholder="Select a theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full h-4" />
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                                <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                    <h3 className="text-sm">Clear Data</h3>
                                    <p className="text-muted-foreground text-[0.813rem] ">
                                        Clears all the data stored in your browser, including search history and settings.
                                    </p>
                                </div>
                                <Button variant="secondary" className="mt-2 sm:mt-0 cursor-pointer" onClick={handleClearData}>
                                    Clear Data
                                </Button>
                            </div>
                            <div className="h-10 w-full" />
                            <h2 className="border-b mb-4 pb-3 font-semibold text-lg">Search</h2>
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                                <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                    <h3 className="text-sm">Default Search Engine</h3>
                                    <p className="text-[0.813rem] text-muted-foreground">
                                        Select the search engine you want to use by default.
                                    </p>
                                </div>
                                <Select defaultValue={searchEngine} onValueChange={setSearchEngine}>
                                    <SelectTrigger className="w-full mt-2 sm:mt-0">
                                        <SelectValue placeholder="Select a search engine" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="google">
                                            <Image src="/logos/google.png" alt="Google Logo" width={15} height={15} />
                                            Google
                                        </SelectItem>
                                        <SelectItem value="duckduckgo">
                                            <Image src="/logos/duckduckgo.png" alt="DuckDuckGo Logo" width={15} height={15} />
                                            DuckDuckGo
                                        </SelectItem>
                                        <SelectItem value="bing">
                                            <Image src="/logos/bing.png" alt="Bing Logo" width={15} height={15} />
                                            Bing
                                        </SelectItem>
                                        <SelectItem value="yahoo">
                                            <Image src="/logos/yahoo.png" alt="Yahoo Logo" width={15} height={15} />
                                            Yahoo
                                        </SelectItem>
                                        <SelectItem value="ecosia">
                                            <Image src="/logos/ecosia.png" alt="Ecosia Logo" width={15} height={15} />
                                            Ecosia
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-full h-4" />
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                                <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                    <h3 className="text-sm">Open in new Tab</h3>
                                    <p className="text-[0.813rem] text-muted-foreground">
                                        Open the search results in a new tab.
                                    </p>
                                </div>
                                <Switch checked={openInNewTab} onCheckedChange={setOpenInNewTab} className="scale-[120%]" />
                            </div>
                            <div className="w-full h-4" />
                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                                <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                    <h3 className="text-sm">Search History</h3>
                                    <p className="text-[0.813rem] text-muted-foreground">
                                        Save the search history to your device.
                                    </p>
                                </div>
                                <Switch checked={searchHistoryActive} onCheckedChange={setSearchHistoryActive} className="scale-[120%]" />
                            </div>
                        </TabsContent>
                        <TabsContent value="bangs">
                            <h2 className="border-b mb-4 pb-3 font-semibold text-lg">Custom Bangs</h2>
                            {addCustomBangFormActive ? (
                                <div className="flex flex-col items-center gap-4 mt-4 border p-4 rounded-md">
                                    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default w-full">
                                        <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                            <h3 className="text-sm">Add custom bang</h3>
                                            <p className="text-[0.813rem] text-muted-foreground">
                                                Add your own custom bang to the list.
                                            </p>
                                        </div>
                                        <Button variant="secondary" className="mt-2 sm:mt-0 cursor-pointer" onClick={() => setAddCustomBangFormActive(false)}>
                                            Cancel
                                        </Button>
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="bangName">Bang Name</Label>
                                        <Input id="bangName" placeholder="Google" value={newBangName} onChange={(e) => setNewBangName(e.target.value)} className={cn("w-full", newBangNameError && "border-destructive")} />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="bangURL" className="flex items-center gap-1">
                                            URL
                                            <Popover>
                                                <PopoverTrigger className="cursor-pointer p-1 rounded-full hover:bg-muted/50">
                                                    <CircleHelp className="size-4" />
                                                    <span className="sr-only">Info</span>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[200px]">
                                                    <p className="text-sm">Place <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">%s</code> where the search query goes</p>
                                                </PopoverContent>
                                            </Popover>
                                        </Label>
                                        <Input id="bangURL" placeholder="https://google.com/search?q=%s" value={newBangURL} onChange={(e) => setNewBangURL(e.target.value)} className={cn("w-full", newBangURLError && "border-destructive")} />
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5">
                                        <Label htmlFor="bangShortcut">Bang Shortcut</Label>
                                        <Input id="bangShortcut" placeholder="google" value={newBangShortcut} onChange={(e) => setNewBangShortcut(e.target.value)} className={cn("w-full", newBangShortcutError && "border-destructive")} />
                                    </div>
                                    {newBangErrorMsg && (
                                        <p className="text-sm text-destructive">{newBangErrorMsg}</p>
                                    )}
                                    <Button className="w-full max-w-sm cursor-pointer" onClick={handleAddCustomBang}>Save</Button>
                                </div>
                            ) : (
                                <div className="flex flex-wrap sm:flex-nowrap items-center justify-between cursor-default">
                                    <div className="flex flex-col mr-[5%] min-w-[65%] gap-1.5">
                                        <h3 className="text-sm">Add custom bang</h3>
                                        <p className="text-[0.813rem] text-muted-foreground">
                                            Add your own custom bang to the list.
                                        </p>
                                    </div>
                                    <Button variant="secondary" className="mt-2 sm:mt-0 cursor-pointer" onClick={() => setAddCustomBangFormActive(true)}>
                                        Add Custom Bang
                                    </Button>
                                </div>
                            )}
                            <div className="h-10 w-full" />
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[25%]">Bang Name</TableHead>
                                        <TableHead className="w-[40%]">Bang URL</TableHead>
                                        <TableHead className="w-[15%]">Bang Shortcut</TableHead>
                                        <TableHead className="w-[10%]">Enabled</TableHead>
                                        <TableHead className="w-[10%]" />
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {customBangs.map((bang, index) => (
                                        <TableRow key={bang.bang}>
                                            <TableCell className="max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{bang.name}</TableCell>
                                            <TableCell className="max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{bang.url}</TableCell>
                                            <TableCell className="max-w-0 overflow-hidden text-ellipsis whitespace-nowrap">{bang.bang}</TableCell>
                                            <TableCell>
                                                <Label htmlFor={`bang-${index}`} className="sr-only">Enabled</Label>
                                                <Checkbox id={`bang-${index}`} checked={!bang.disabled} onCheckedChange={(val: boolean) => setBangDisabled(index, !val)} className="cursor-pointer" />
                                            </TableCell>
                                            <TableCell>
                                                <Button variant="ghost" size="icon" className="cursor-pointer" onClick={() => handleEditBang(index)}>
                                                    <Pencil />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="cursor-pointer text-destructive hover:text-destructive" onClick={() => removeBang(index)}>
                                                    <Trash2 />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabsContent>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}