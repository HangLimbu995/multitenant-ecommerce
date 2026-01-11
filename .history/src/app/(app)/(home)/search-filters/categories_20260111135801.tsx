import { CategoryDropdown } from "./category-dropdown";
import { CustomCategory } from "../types";
import { useRef, useState } from "react";

interface Props {
  data: CustomCategory[];
}

export const Categories = ({ data }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setisSidebarOpen] = useState(false);

  return (
    <div className="relative w-full">
      <div className="flex flex-nowrap items-center">
        {data.map((category: CustomCategory) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
