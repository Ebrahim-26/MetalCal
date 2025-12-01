"use client";
import MetalEntryField from "@/components/MetalEntryField";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-zinc-50 dark:bg-black gap-5">
      <div className=" bg-blue-950 text-white w-full">
        <p className="text-4xl m-5 font-bold  text-white text-center">
          Metal Calculator
        </p>
      </div>

      <MetalEntryField />
    </div>
  );
}
