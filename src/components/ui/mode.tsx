"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {/* Show Sun in light mode, Moon in dark mode */}
      {!mounted ? null : theme === "dark" ? (
        <Sun className="h-5 w-5 transition-all" />
      ) : (
        <Moon className="h-5 w-5 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
