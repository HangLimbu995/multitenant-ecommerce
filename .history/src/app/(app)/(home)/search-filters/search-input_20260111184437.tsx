import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Props {
  disabled?: boolean;
  data: CustomCa
}

export const SearchInput = ({ disabled }: Props) => {
  return (
    <div className="flex items-center w-full px-2 sm:px-0 max-w-xl mx-auto">
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
      {/* TODO: Add library button */}
    </div>
  );
};
