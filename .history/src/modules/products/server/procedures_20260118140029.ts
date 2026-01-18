
import { z } from 'zod'

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({ category: z.string().nullable().optional() })
    )
    .query(async ({ ctx }) => {

      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // Populate "Category" & "Image"
      });

      return data;
    }),
});
