import { DEFAULT_LIMIT } from "@/constants";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const reviewsRouter = createTRPCRouter({
    getOne: protectedProcedure
        .input(
            z.object({
                productId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const product = await ctx.db.findByID({
                collection: 'products',
                id: input.productId,
            })

            if (!product)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                })

            return;
        })
})