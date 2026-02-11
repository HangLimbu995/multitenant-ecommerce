"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";

import { CategoriesSidebar } from "./categories-sidebar";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [filters, setFilters] = useProductFilters()
  const [searchValue, setSearchValue] = useState(filters.search)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const timeoutid = setTimeout(() => {
setFilters({})
    },500)
  })

  return (
    <div className="flex items-center w-full px-2 sm:px-0 max-w-xl mx-auto">
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
        <Input
          className="pl-14 pr-4 py-2 md:py-3 rounded-md border border-neutral-200 focus:border-blue-500 transition-colors shadow bg-white placeholder:text-neutral-400 text-base w-full"
          placeholder="Search for products..."
          disabled={disabled}
          aria-label="Search products"
          value={filters.search || ''}
          onChange={e => setFilters({search: e.target.value})}
        />
      </div>
      {/* TODO: Add categories view all button */}
      <Button
        variant="elevated"
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button asChild variant="elevated" className="ml-2">
          <Link prefetch href="/library">
            <BookmarkCheckIcon /> Library
          </Link>
        </Button>
      )}
      {/* TODO: Add library button */}
    </div>
  );
};
