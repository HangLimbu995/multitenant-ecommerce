import { getQueryClient } from "@/trpc/server";
import React from "react";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;

  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.)
  
  return (
    <div>
      Category: {category} <br />
      Subcategory: {subcategory}
    </div>
  );
};

export default Page;
