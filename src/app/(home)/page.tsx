import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-white to-secondary/40 py-12">
      <div className="w-full max-w-md p-8 bg-white/90 rounded-2xl shadow-xl border space-y-7">
        <div className="flex items-center gap-3 mb-2">
          <Image
            alt="Logo"
            src="/logo.svg"
            width={40}
            height={40}
            className="rounded-full border-2 border-primary shadow"
          />
          <h1 className="text-3xl font-extrabold tracking-tighter bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
            Welcome!
          </h1>
        </div>
        <p className="text-lg text-muted-foreground font-medium mb-4">We’re glad you’re here. Sign in or send us a message below:</p>
        <div className="space-y-4">
          <Input type="text" placeholder="Enter your name" className="bg-white shadow-sm"/>
          <Textarea placeholder="Enter your message" className="bg-white shadow-sm"/>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <Progress value={50} className="flex-1 h-2 rounded-full" />
          <span className="text-xs font-semibold text-primary">{'50%'} Complete</span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer select-none">I agree to the Terms</label>
        </div>
        <Button variant="elevated" className="w-full h-12 text-lg font-semibold shadow-lg hover:-translate-y-1 transition">
          🚀 Click me
        </Button>
      </div>
    </div>
  );
}

