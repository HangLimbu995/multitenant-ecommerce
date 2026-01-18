
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {

    const data = await ctx.db.find({
      collection: "products",
      depth: 1, // Populate "Category" & "Image"
    });

    // Artificial delay for devleopment/testing
    await new Promise((resolve) => setTimeout(resolve, 5000))

    return data;
  }),
});
