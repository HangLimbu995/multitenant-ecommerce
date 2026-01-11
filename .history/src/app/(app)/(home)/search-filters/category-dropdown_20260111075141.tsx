"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Extend the Category type so TypeScript knows about subcategories!
type CategoryWithSubcategories = {
  id: string;
  name: string;
  slug: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
  subcategories?: CategoryWithSubcategories[];
  // ...add other props from your payload if needed
};

interface Props {
  category: CategoryWithSubcategories;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

import { useRef, useState } from "react";
import { useDropdownPosition } from "./use-dropdown-position";

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props) => {
  // This will now typecheck because we extended the type above
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
   const {getDropdownPosition} = useDropdownPosition(dropdownRef)

  const onMouseEnter = () => {
    if (category?.subcategories && category.subcategories.length > 0) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => setIsOpen(false);

  const dropdownPosition = 

  return (
    <div
      className="relative"
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative group">
        <Button
          variant="elevated"
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHovered && "bg-white border-primary"
          )}
        >
          {category.name}
        </Button>
        {/* Only show the dropdown arrow when the button is hovered */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 pointer-events-none absolute -bottom-3 w-0 h-0 border-l-10 border-r-10 border-b-10 border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-150"
            )}
          />
        )}
      </div>
    </div>
  );
};
