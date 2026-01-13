import { useTRPC } from "@/trpc/client";
import { getQueryClient, trpc } from "@/trpc/server";
import { useQuery } from "@tanstack/react-query";

export default  function Home() {
  const trpc = useTRPC()
  const categories =  useQuery(
    trpc.categories.getMany.queryOptions()
  );

  return <div>{JSON.stringify(categories, null, 2)}</div>;
}
 