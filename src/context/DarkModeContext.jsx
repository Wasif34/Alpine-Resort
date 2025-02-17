import { createContext, useContext } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";
const DarkModeContext = createContext();

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Provides the `isDarkMode` and `toggleDarkMode` state values
 * to descendant components via the `DarkModeContext`.
 *
/******  7c9edc73-f71a-4cc3-a7f0-43ec9bc7908c  *******/ function DarkModeProvider({
  children,
}) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}

export { DarkModeProvider, useDarkMode };
