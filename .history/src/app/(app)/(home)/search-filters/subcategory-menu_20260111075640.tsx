import { Category } from "@/payload-types";

interface Props {
    category: Category; // TODO: Change this
    isOpen: boolean;
    position: {top: number, left: number}
}

export const SubcategoryMenu = ({
    category, isOpen, position
}: Props) => {
    if(!isOpen || !category.subcategories || category.subcategories.length === 0) {
        return null;
    }

const backgroundColor = category.color || '#f5f5f5'

return (
    <div className="fixed z-100"
    style={{top: position.top, left: position.left}}
)

}