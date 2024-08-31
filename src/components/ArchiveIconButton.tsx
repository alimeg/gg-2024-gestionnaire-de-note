"use client";

import { useRouter } from "next/navigation";
import { Archive } from "lucide-react"; 
import { cn } from "@/lib/utils"; 

interface ArchiveIconButtonProps {
  className?: string;
}

function ArchiveIconButton({ className }: ArchiveIconButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/archive"); 
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
      <Archive className="size-10 sm:size-12" />
    </button>
  );
}

export default ArchiveIconButton;