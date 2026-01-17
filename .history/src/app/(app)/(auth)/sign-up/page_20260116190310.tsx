import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  // The session is fetched once and destructured for clarity.
  // Early redirect if user is already signed in; nothing extra to optimize.
  const { user } = await caller.auth.session();

  if (user) {
    redirect("/");
    // No further action needed since redirect short-circuits the render.
  }
    redirect("/");
  }

  return <SignUpView />;
};

export default Page;
