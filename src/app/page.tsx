import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-4">
      <h1>Welcome to Next-Electron</h1>
      <Button asChild className="">
        <Link href={`/login`}>Login</Link>
      </Button>
    </main>
  );
}