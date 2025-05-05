"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search-input";
import SearchForm from "@/components/search-form";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6">
      <div className="h-0 sm:h-48" />
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">💥 Bang Search</h1>
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
        <SearchForm className="mt-8 space-y-4">
          {(value, onChange) => (
            <>
              <SearchInput
                autoFocus
                value={value}
                onChange={onChange}
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
    </main>
  );
}
