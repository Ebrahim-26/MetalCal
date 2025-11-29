"use client";
import MetalEntryField from "@/components/MetalEntryField";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 dark:bg-black">
      <p className="text-xl m-5 font-bold">Metal Calculator</p>
      <MetalEntryField />
    </div>
  );
}
