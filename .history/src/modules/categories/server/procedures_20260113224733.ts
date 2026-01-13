import { getPayload } from "payload";
import configPromise from "@payload-config";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";


type CategoryWithSubcategories = Category & {
  subcategories?: {
    docs: Category[]
  }
}

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

    const formattedData: CustomeCategory[] = data.docs.map((doc) => ({
      const category  = doc as CategoryWithSubcategories;
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Becuase of "depth: 1" we are confident "doc" will be a type of "Cateogry"
        ...(doc as Category),
        subcategories: undefined,
      })),
    }));
    return [{ hello: "world" }];
  }),
});
