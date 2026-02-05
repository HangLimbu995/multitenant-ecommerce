import { DEFAULT_LIMIT } from "@/constants";
import {  createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const reviewsRouter = createTRPCRouter({
    getOne: protectedProcedure
    .input(
        z.object({
            cursor: z.number().default(1),
        })
    )
    .query(async({ctx,input}) => {
        const data = await ctx.db.find({
            collection: 'tags',
            page: input.cursor,
            limit: input.limit
        })

        return data;
    })
})