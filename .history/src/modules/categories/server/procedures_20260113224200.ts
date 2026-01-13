import { getPayload } from "payload";
import configPromise from "@payload-config";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  const payload = await getPayload({
    config: configPromise,
  })
  
  getMany: baseProcedure.query(async () => {
    return [{ hello: "world" }];
  }),
});
