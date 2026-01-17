import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  // Pre-fetch the session only once at the top
  const { user } = await caller.auth.session();

  if (user) {
    // Use redirect early to avoid unnecessary render
    redirect("/");
    // Optionally, you could 'return null' after to clarify intent; not strictly required
  }

  return <SignUpView />;
};

export default Page;
