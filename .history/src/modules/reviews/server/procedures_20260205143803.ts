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

            const reviewsData = await ctx.db.find({
                collection: "reviews",
                limit: 1,
                where: {
                    and: [
                        {
                            product: {
                                equals: product.id,
                            }
                        }, {
                            user: {
                                equals: ctx.session.user.id,
                            }
                        }
                    ]
                }
            })

            const review = reviewsData.docs[0]

            if (!review) {
                return null;
            }

            return review;
        }),
    create: protectedProcedure
        .input(
            z.object({
                productId: z.string(),
                rating: z.number().min(1, { message: "Rating is required" }).max(5),
                description: z.string().min(1, { message: "Description is required" })
            })
        )
        .mutation(async ({ ctx, input }) => {
            const product = await ctx.db.findByID({
                collection: 'products',
                id: input.productId
            })

            if (!product) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Product not found"
                })
            }

            const existing
        })
})