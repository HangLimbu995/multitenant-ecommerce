import Footer from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { getQueryClient, trpc } from "@/trpc/server";

interface props {
  children: React.ReactNode;
}

const Layout = async ({ children }: props) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions()
  )

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};
export default Layout;
