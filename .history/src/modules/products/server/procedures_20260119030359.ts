
import z from 'zod'

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
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
      }

      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice
        }
      } elase if(input.minPrice) {
        where.
      }

      if (input.maxPrice) {
        where.price = {
          ...where.price,
          less_than_equal: input.minPrice
        }
      }

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

        console.log(JSON.stringify(categoriesData, null, 2))

        const formattedData = categoriesData.docs.map((doc) => {
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

        const subcategoriesSlugs = []
        const parentCategory = formattedData[0]



        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map((subcategory) => subcategory.slug)
          )

          where['category.slug'] = {
            in: [parentCategory.slug, ...subcategoriesSlugs]
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
