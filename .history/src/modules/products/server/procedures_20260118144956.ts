
import  z  from 'zod'

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from 'payload';
import { Category } from '@/payload-types';


type CategoryWithSubcategories = Category & {
  subcategories?: {
    docs: Category[];
  };
};

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional()
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {}

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: 'categories',
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category
            }
          }
        })

        const formattedData = data.docs.map((doc) => ({
          const doc = doc as categoriesWithSubcategories
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // Because of "depth: 1" we are confident "doc" will be a type of "Cateogry"
            ...(doc as Category),
            subcategories: undefined,
          }))
        }))

        const parentCategory = categoriesData.docs[0]

        if (parentCategory) {
          where['category.slug'] = {
            equals: parentCategory.slug
          }
        }
      }
      const data = await ctx.db.find({
        collection: "products",
        depth: 1, // Populate "Category" & "Image"
        where,
      });

      return data;
    }),
});
