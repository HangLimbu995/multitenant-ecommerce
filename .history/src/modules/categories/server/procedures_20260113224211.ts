import { getPayload } from "payload";
import configPromise from "@payload-config";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({

  getMany: baseProcedure.query(async () => {
    const payload = await getPayload({
      config: configPromise,
    })
    
    return [{ hello: "world" }];
  }),
});
