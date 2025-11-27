"use client";
import MetalEntryField from "@/components/MetalEntryField";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <p className="text-xl">Metal Calculator</p>
      <MetalEntryField />
    </div>
  );
}
