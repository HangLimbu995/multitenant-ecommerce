import { getPayload } from "payload";
import configPromise from "@payload-config";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";


type CategoryWithSubcategories = Category & {
  subcategories?: {
    docs: Category[];
  };
};

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
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
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => ({
      const category = doc as CategoryWithSubcategories;
      return {
        ...doc,
        subcategories: (category.subcategories?.docs ?? []).map((subDoc) => ({
          // Becuase of "depth: 1" we are confident "doc" will be a type of "Cateogry"
          ...subDoc,
          subcategories: undefined,
        })),
      }
    }));

    const formattedData: CustomCategory[] = data.docs.map((doc) => {
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
    return [{ hello: "world" }];
  }),
});
