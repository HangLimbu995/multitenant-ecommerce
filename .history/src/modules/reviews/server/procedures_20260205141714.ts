import { DEFAULT_LIMIT } from "@/constants";
import {  createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const reviewsRouter = createTRPCRouter({
    getOne: protectedProcedure
    .input(
        z.object({
            productId: z.string(),
        })
    )
    .query(async({ctx,input}) => {
        const data = await ctx.db.find({
            collection: 'reviews',
        })

        return data;
    })
})