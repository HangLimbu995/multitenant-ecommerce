import { getQueryClient } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient()
  const categories = await queryClient.fetchQuery
  
  return <div>Home Page</div>;
}
