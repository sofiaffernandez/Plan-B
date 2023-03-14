import { useThemeContext } from "../contexts/ThemeContext";

export default function ThemeSwitcher() {
 
  const { toggleTheme, theme } = useThemeContext();

  return (
    <button className="botonDia" onClick={toggleTheme}>{theme === "day" ? "🌙" : "🔅"}</button>
  );
}

