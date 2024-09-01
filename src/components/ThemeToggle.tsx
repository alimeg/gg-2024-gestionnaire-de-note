"use client";

import { useTheme } from "@/components/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils"; // Ensure this is correctly imported if needed


const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      className={cn(
        "flex items-center space-x-2 rounded-md p-2 transition-colors duration-200 ease-in-out",
        "text-secondary hover:text-primary"
      )}
    >
      {isDarkMode ? (
          <Sun className="size-10 sm:size-12 text-yellow-400" />
        
      ) : (
          <Moon className="size-10 sm:size-12 text-gray-800 text-secondary hover:text-primary transition-colors duration-200 ease-in-out"/>
      )}
   </div>
  );
};
export default ThemeToggle;
