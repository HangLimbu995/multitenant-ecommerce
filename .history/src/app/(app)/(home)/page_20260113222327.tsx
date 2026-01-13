import { getQueryClient } from "@/trpc/server";

export default async function Home() {
  const queryClient = getQueryClient
  
  return <div>Home Page</div>;
}
