import { CategoryDropdown } from "./category-dropdown";

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
  data: CategoryWithSubcategories[];
}

export const Categories = ({ data }: Props) => {
  console.log(data);
  return (
    <div>
      {data.map((category: CategoryWithSubcategories) => (
        <div key={category.id}>
          <CategoryDropdown
            category={category}
            isActive={false}
            isNavigationHovered={false}
          />
        </div>
      ))}
    </div>
  );
};
