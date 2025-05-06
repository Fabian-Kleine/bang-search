"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search-input";
import SearchForm from "@/components/search-form";
import { ArrowDown, ArrowRight, Download, LockKeyhole, Search, Settings, Sparkles, Clipboard, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <main className="relative flex-1 flex flex-col items-center justify-start px-4 sm:px-6 min-h-[95vh]">
        <div className="h-0 sm:h-48" />
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl/none font-bold tracking-tighter">💥 Bang Search</h1>
            <p className="mt-4 text-sm text-muted-foreground">
              Use
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">
                !
              </code>
              for bangs or
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">
                =
              </code>
              for calculations.
            </p>
          </div>
          <SearchForm className="flex flex-col justify-center items-center mt-8 space-y-4">
            {(value, onChange) => (
              <>
                <SearchInput
                  autoFocus
                  value={value}
                  onChange={onChange}
                  className="w-full max-w-md"
                />
                <div className="flex justify-center gap-4">
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
              </>
            )}
          </SearchForm>
        </div>
        <div className="absolute bottom-20 hidden [@media(min-height:600px)]:flex flex-col items-center justify-center gap-4 ">
          <span className="text-base font-semibold">Find out more</span>
          <Button variant={"outline"} className="rounded-full size-12" size={"lg"} asChild>
            <Link href={"#features"}>
              <ArrowDown className="size-6" />
              <span className="sr-only">Find out more</span>
            </Link>
          </Button>
        </div>
      </main>
      <section id="features" className="flex flex-col items-center justify-start px-4 sm:px-6 overflow-x-hidden">
        <div className="relative flex flex-col lg:flex-row justify-center md:items-center gap-8 box-content md:min-h-[400px] py-24">
          <div className="flex flex-col lg:min-w-xl max-w-xl px-4 sm:px-6">
            <h2 className="tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none font-bold mb-8">Features</h2>
            <p className="mb-4 text-xl">
              <b>Bang Search</b> is a &quot;search engine&quot; that supports:
            </p>
            <ul className="list-['💥'] list-inside space-y-4 mb-4 text-lg">
              <li><b>!Bangs</b>: Shortcuts to search different websites</li>
              <li><b>Calculations</b>: Use <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">=</code> to perform calculations</li>
              <li><b>Search History</b>: Save History locally</li>
            </ul>
          </div>
          <div className="relative w-[400px] h-[400px]">
            <div className="absolute right-12 -top-24 dark:right-24 dark:-top-32 lg:top-42 dark:lg:right-36 dark:lg:top-48 w-[400px] h-[400px] dark:w-[300px] dark:h-[300px] bg-linear-to-tr from-[#ffd319] via-[#ff2975] to-[#8c1eff] rounded-full -z-10 blur-[100px] opacity-60 md:opacity-100 md:dark:opacity-85" />
            <img className="absolute -right-[125%] shadow-xl min-w-[800px]" src={resolvedTheme === "dark" ? "/bang-search-mockup.png" : "/bang-search-mockup_light.png"} alt="Bang Search Mockup" />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row justify-center items-center md:items-end gap-8 py-24">
          <img className="shadow-xl roudned-md overflow-hidden" src={resolvedTheme === "dark" ? "/bangs.png" : "/bangs_light.png"} alt="Bangs" width={400} />
          <div className="flex flex-col w-full max-w-2xl mt-10 px-4 sm:px-6">
            <h2 className="tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none font-bold mb-8">!Bangs</h2>
            <p className="text-lg">
              Bangs are shortcuts that quickly take you to search results on other sites. For example, when you know you want to search on another site like Wikipedia or Amazon, our bangs get you there fastest. A search for <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1 -z-10">!w filter bubble</code> will take you directly to Wikipedia.
              <br />
              You can also add your own custom bangs in the settings menu.
            </p>
            <Link href={"/bangs"} className="text-sky-600 font-bold hover:underline mt-4 w-fit">Learn More</Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 py-24">
          <div className="flex flex-col w-full max-w-2xl mt-10 px-4 sm:px-6">
            <h2 className="tracking-tighter text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none font-bold mb-8">Search Engine</h2>
            <p className="mb-4 text-xl">
              Choose from a variety of search engines like Google, Bing, DuckDuckGo, and more.
            </p>
            <p>
              Find out more in the settings menu
              <span className="flex items-center gap-1 mt-2">
                <ArrowRight size={20} />
                <Settings size={20} />
              </span>
            </p>
          </div>
          <img src={resolvedTheme === "dark" ? "/search-engine-dropdown.png" : "/search-engine-dropdown_light.png"} alt="Search Engine" width={300} />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 py-36">
          <LockKeyhole size={64} />
          <h2 className="tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none font-bold mb-8">Privacy</h2>
          <p className="text-xl sm:text-2xl lg:text-3xl text-center sm:leading-10 lg:leading-14">
            <b>Bang Search</b> does not track you. Your searches are not stored or shared with third parties.*
            <br />
            Everything is done locally in your browser.
          </p>
          <p className="text-muted-foreground text-sm text-center">
            *Bang Search redirects to other websites which may track you.<br /> Please check their privacy policies.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-4 py-24 max-w-2xl">
          <Download size={72} />
          <h2 className="tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl/none font-bold mb-8">Installation</h2>
          <p className="mb-4 text-xl text-center leading-8">
            If you want to use <b>Bang Search</b>&apos;s features like !bangs in your own browser you can either set this page as your browsers <a className="text-muted-foreground underline hover:text-muted-foreground/75" href="https://chromewebstore.google.com/detail/custom-new-tab-url/mmjbdbjnoablegbkcklggeknkfcjkjia" target="_blank">new Tab page</a> or add the following URL as a custom search engine to your browser.
            <br />This enables <Link className="text-muted-foreground underline hover:text-muted-foreground/75" href="/bangs">all of our bangs</Link>.
          </p>
          <div className="flex items-center gap-2 w-full max-w-md">
            <Input readOnly value="https://search.fabian-kleine.dev/search?q=%s" />
            <Button onClick={() => {
              navigator.clipboard.writeText("https://search.fabian-kleine.dev/search?q=%s");
              setCopyClicked(true);
            }} variant="ghost" size={"lg"} className="size-10 cursor-pointer">
              {copyClicked ? (
                <ClipboardCheck />
              ) : (
                <Clipboard />
              )}
              <span className="sr-only">{copyClicked ? "Copied" : "Copy"}</span>
            </Button>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            You can add <code className="relative rounded bg-muted px-[0.3rem] py-[0.1rem] font-mono text-sm mx-1">&se=</code> to the URL to define the default search engine.
            <br /> Possible values are: google, bing, duckduckgo, yahoo and ecosia.
          </p>
        </div>
      </section>
    </>
  );
}
