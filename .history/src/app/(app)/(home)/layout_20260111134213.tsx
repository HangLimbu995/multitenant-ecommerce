import { getPayload } from "payload";
import Footer from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";

interface props {
  children: React.ReactNode;
}

type CategoryWithSubcategories = Category & {
  subcategories?: {
    docs: Category[];
  };
};

const Layout = async ({ children }: props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1, // Populate subcategories, subcategories.[0] will be a type of "Category"
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formattedData: CustomeCategory= data.docs.map((doc) => {
    const category = doc as CategoryWithSubcategories;
    return {
      ...doc,
      subcategories: (category.subcategories?.docs ?? []).map((subDoc) => ({
        // Because of "depth: 1" we are confident "doc" will be a type of "Category"
        ...subDoc,
        subcategories: undefined,
      })),
    };
  });


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
