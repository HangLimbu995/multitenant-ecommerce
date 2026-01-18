
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {

    const data = await ctx.db.find({
      collection: "products",
      depth: 0, // Populate "Category" & "Image"
    });



    return data;
  }),
});
