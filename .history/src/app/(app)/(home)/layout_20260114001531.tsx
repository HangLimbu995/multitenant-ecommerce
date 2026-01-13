import { getPayload } from "payload";
import configPromise from "@payload-config";
import Footer from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";
import { getQueryClient } from "@/trpc/server";
import { QueryClient } from "@tanstack/react-query";

interface props {
  children: React.ReactNode;
}

type CategoryWithSubcategories = Category & {
  subcategories?: {
    docs: Category[];
  };
};

const Layout = async ({ children }: props) => {
  const queryClient = getQueryClient();
  void QueryClient.prefetchQuery(
    
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
