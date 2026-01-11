
import {
    Sheet, SheetContent, SheetHeader, SheetTitle
} from '@/components/ui/sheet'

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[];
}

export const CategoriesSidebar = ({ open, onOpenChange, data }: Props) => {
  return <div>Categories Sidebar</div>;
};
