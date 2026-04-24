"use client";

import React, { useEffect, useState } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for component to mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ToggleButton
        prefixIcon="light"
        aria-label="Loading theme toggle"
        style={{ opacity: 0 }}
      />
    );
  }

  // Resolve current theme safely from data attribute to ensure sync with CSS
  const currentTheme = (typeof document !== "undefined" && document.documentElement.getAttribute("data-theme")) || theme || "dark";
  
  const isDark = currentTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const icon = isDark ? "light" : "dark"; // Show Sun (light) when currently Dark, Moon (dark) when currently Light

  const handleToggle = () => {
    const newTheme = nextTheme;
    setTheme(newTheme);
    // Explicitly set attribute for absolute safety and CSS module reactivity
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("data-theme", newTheme);
  };

  return (
    <ToggleButton
      prefixIcon={icon}
      onClick={handleToggle}
      aria-label={`Switch to ${nextTheme} mode`}
      tooltip={`${nextTheme} mode`}
    />
  );
};
