"use client";

import { createContext, useCallback, useContext, useSyncExternalStore } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

const STORAGE_KEY = "studiospace-theme";

// The DOM class on <html> is the source of truth — the inline script in
// layout.js applies it before hydration, and useSyncExternalStore keeps
// React state in sync without a setState-in-effect cascade.
function subscribe(onStoreChange) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(STORAGE_KEY, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(STORAGE_KEY, onStoreChange);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot() {
  // Used for SSR and the first hydration render (matches the light default);
  // React re-renders with the real theme right after hydration completes.
  return "light";
}

function applyTheme(next) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage unavailable (private mode) — theme just won't persist.
  }
  window.dispatchEvent(new Event(STORAGE_KEY));
}

export function ThemeProvider({ children }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
