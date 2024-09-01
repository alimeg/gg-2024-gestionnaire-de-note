"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"; 
import { Home } from "lucide-react";

interface ArchiveIconButtonProps {
  className?: string;
}

function ArchiveNoteButton({ className }: ArchiveIconButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/"); 
    return 
    
  };

  return (
    <button
      className={cn(
        "text-secondary hover:text-primary transition-colors duration-200 ease-in-out",
        className
      )}
      onClick={handleClick}
    >
      <Home className="size-10 sm:size-12" />
    </button>
  );
}

export default ArchiveNoteButton;