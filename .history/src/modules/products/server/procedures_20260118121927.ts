
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ctx}) => {
    
    const data = await ctx.db.find({
      collection: "products",
      depth: 1, // Populate "Category" & "Image"
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    const formattedData = data.docs.map((doc) => {
      const category = doc as CategoryWithSubcategories;
      return {
        ...doc,
        subcategories: (category.subcategories?.docs ?? []).map((subDoc) => ({
          // Becuase of "depth: 1" we are confident "doc" will be a type of "Cateogry"
          ...subDoc,
          subcategories: undefined,
        })),
      };
    });

    return formattedData;
  }),
});
