import { getQueryClient, trpc } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient()
  const categories = await queryClient.fetchQuery(trpc, )
  
  return <div>Home Page</div>;
}
