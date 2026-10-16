import { useEffect, useState } from "react";

const getTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
  const activeTheme = document.documentElement.dataset.theme;
  if (!activeTheme) return 'dark';
  return activeTheme === "light" || activeTheme === "dark" ? activeTheme : localStorage.getItem("theme") || "dark";
};

export function useLandingTheme() {
  const [theme, setTheme] = useState(getTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "dark" ? "#131722" : "#ffffff");
  }, [theme]);
  return { theme, toggleTheme: () => setTheme((value) => value === "dark" ? "light" : "dark") };
}
