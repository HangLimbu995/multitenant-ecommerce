import { SignInView } from "@/modules/auth/ui/views/sign-in-view";
import React from "react";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

const Page = async () => {
  const { user } = await caller.auth.session();
  if (user) {
    redirect("/");
  }

  return <SignInView />;
};

export default Page;
