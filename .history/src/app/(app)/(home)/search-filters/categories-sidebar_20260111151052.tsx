interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[]
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  return <div>Categories Sidebar</div>;
};
