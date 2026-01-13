import { CategoriesGetManyOutput } from './../../../.history/src/modules/categories/types_20260114013544';
import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_api";

export type CategoriesGetmanyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type CategoriesGetManyOutputSingle = CategoriesGetManyOutput[0];
