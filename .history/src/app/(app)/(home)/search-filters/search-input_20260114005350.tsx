'use client'

import { Input } from "@/components/ui/input";
import { ListFilterIcon, SearchIcon } from "lucide-react";
import { CustomCategory } from "../types";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({ disabled }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex items-center w-full px-2 sm:px-0 max-w-xl mx-auto">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
        <Input
          className="pl-14 pr-4 py-2 md:py-3 rounded-xl border border-neutral-200 focus:border-blue-500 transition-colors shadow bg-white placeholder:text-neutral-400 text-base w-full"
          placeholder="Search for products..."
          disabled={disabled}
          aria-label="Search products"
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
      {/* TODO: Add library button */}
    </div>
  );
};
