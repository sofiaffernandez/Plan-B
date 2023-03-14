import { useState, useContext, createContext } from "react";
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("day");

  const toggleTheme = () => {
    if (theme === "day") {
      setTheme("night");
    } else {
      setTheme("day");
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>     
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
