"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // Default to light mode initially
  const [isThemeLoaded, setIsThemeLoaded] = useState<boolean>(false); // State to track theme loading

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      setIsDarkMode(true); 
    }
    setIsThemeLoaded(true); // Mark theme as loaded: important pour ne pas ecraser la valeur set par le user vers le default
  }, []); // Run only on mount

  useEffect(() => {
    if (isThemeLoaded) {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  }, [isDarkMode, isThemeLoaded]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
