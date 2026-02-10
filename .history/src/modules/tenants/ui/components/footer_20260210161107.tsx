import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Footer = () => {
  return (
    <footer className="border-t font-medium bg-white py-6">
      <div className=" mx-auto flex flex-col sm:flex-row  items-center gap-4 px-4 lg:px-12">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Powered by</span>
        </div>
        <Link href={process.env.NEXT_PUBLIC_APP_URL!}
         className="group transition">
          <span
            className={cn(
              "text-2xl font-semibold tracking-wide group-hover:text-primary transition-colors duration-200",
              poppins.className
            )}
          >
            funroad
          </span>
        </Link>
      </div>
    </footer>
  );
};