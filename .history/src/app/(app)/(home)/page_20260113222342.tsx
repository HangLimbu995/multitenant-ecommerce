import { getQueryClient } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient()
  const categories = await queryClient
  
  return <div>Home Page</div>;
}
