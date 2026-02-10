import { SignUpView } from "@/modules/auth/ui/views/sign-up-view";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

const Page = async () => {
  // Pre-fetch the session only once at the top
  const { user } = await caller.auth.session();

  if (user) {
    // Use redirect early to avoid unnecessary render
    redirect("/");
  }

  return <SignUpView />;
};

export default Page;
