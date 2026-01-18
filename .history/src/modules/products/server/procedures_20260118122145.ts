
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ctx}) => {

    const data = await ctx.db.find({
      collection: "product", // Fixed: Use the correct CollectionSlug
      depth: 1, // Populate "Category" & "Image"
      sort: "name",
    });


   

    return data;
  }),
});
