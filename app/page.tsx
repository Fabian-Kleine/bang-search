"use client";

import { Button } from "@/components/ui/button";
import SearchInput from "@/components/search-input";
import SearchForm from "@/components/search-form";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
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
  );
}
