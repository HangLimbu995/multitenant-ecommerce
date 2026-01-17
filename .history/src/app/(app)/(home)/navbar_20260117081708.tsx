"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState, useEffect, useRef } from "react";
import { MenuIcon } from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
  // Important for layout shift: use "display:swap" ensures fallback
  display: "swap",
});

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

const navbvarItems = [
  { href: "/", children: "Home" },
  { href: "/about", children: "About" },
  { href: "/features", children: "Features" },
  { href: "/pricing", children: "Pricing" },
  { href: "/contact", children: "Contact" },
];

// --- FONT PRELOADING FOR PREVENTING LAYOUT SHIFT ---
/**
 * This is a workaround for font-based layout shifts.
 * We render a visually hidden (but accessible) span with the Poppins font to "preload" it,
 * so the correct font metrics are available as soon as possible,
 * preventing a jarring shift as the font loads.
 */
const FontPreload = () => (
  <span
    aria-hidden="true"
    style={{
      position: "absolute",
      width: 0,
      height: 0,
      overflow: "hidden",
      whiteSpace: "nowrap",
      fontFamily: poppins.style.fontFamily,
      fontWeight: 700,
      fontSize: "64px",
      visibility: "hidden",
    }}
    className={poppins.className}
  >
    Funroad
  </span>
);

export const Navbar = () => {
  // Prevent hydration mismatch by only rendering client-aware code after mount
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  // fix for popping/jumping: force exact navbar height from the start (theme is 5rem/20)
  const navbarRef = useRef<HTMLDivElement>(null);

  // (For SSR/CSR font metric difference; no visual content shift if poppins not yet loaded)
  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.style.minHeight = "5rem"; // force it
      navbarRef.current.style.height = "5rem";
    }
  }, []);

  return (
    <div
      ref={navbarRef}
      className="h-20 min-h-20 flex border-b justify-between font-medium bg-white relative"
      style={{
        minHeight: "5rem",
        height: "5rem",
      }}
    >
      {/* Font preload measure: fix layout shift caused by poppins */}
      <FontPreload />

      <Link href="/" className="pl-6 flex items-center">
        <span
          className={cn("text-5xl font-semibold", poppins.className)}
          style={{
            minWidth: "178px", // Ensures logo space doesn't jump
            display: "inline-block",
          }}
        >
          Funroad
        </span>
      </Link>

      <NavbarSidebar
        items={navbvarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbvarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>
{session.data?.user ? (
  <></>
): (

      <div className="hidden lg:flex">
        <Button
          asChild
          variant="secondary"
          className="border border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
        >
          <Link prefetch href="/sign-in">
            Login in
          </Link>
        </Button>
        <Button
          asChild
          className="border border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
        >
          <Link prefetch href="/sign-up">
            Start selling
          </Link>
        </Button>
      </div>

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
)}

    </div>
  );
};
