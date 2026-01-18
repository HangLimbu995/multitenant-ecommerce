import React from "react";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { category, subcategory } = await params;

  const 
  
  return (
    <div>
      Category: {category} <br />
      Subcategory: {subcategory}
    </div>
  );
};

export default Page;
