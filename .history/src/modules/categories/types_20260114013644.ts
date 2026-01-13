import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type CategoriesGetmanyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type CategoriesGetManyOutputSingle = CategoriesGetmanyOutput[0];
