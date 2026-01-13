import { useTRPC } from "@/trpc/client";
import { getQueryClient, trpc } from "@/trpc/server";

export default async function Home() {
  const trpc = useTRPC()
  const categories = await queryClient.fetchQuery(
    trpc.categories.getMany.queryOptions()
  );

  return <div>{JSON.stringify(categories, null, 2)}</div>;
}
 