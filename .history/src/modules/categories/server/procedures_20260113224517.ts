import { getPayload } from "payload";
import configPromise from "@payload-config";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const payload = await getPayload({
      config: configPromise,
    });
    const data = await payload.find({
      collection: "categories",
      dept: 1, // Populate subcategories, subcategories.[0] will be a type of "Category"
      pagination: false,
      where: {
        parent: {
          exist: false,
        },
      },
      sort: "name",
    });

    const formattedData: CustomeCategory[] = data.docs.map((doc) => ({
      ...doc, 
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        // Becuase of "depth: 1" we are condident 
      }))
    }))
    return [{ hello: "world" }];
  }),
});
