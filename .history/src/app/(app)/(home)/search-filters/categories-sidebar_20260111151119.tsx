
import {
    Sheet, SheetContent, SheetHeader, SheetTitle
} from ''

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  return <div>Categories Sidebar</div>;
};
