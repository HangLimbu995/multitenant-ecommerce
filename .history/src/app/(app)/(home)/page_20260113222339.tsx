import { getQueryClient } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient()
  const categories = await qu
  
  return <div>Home Page</div>;
}
