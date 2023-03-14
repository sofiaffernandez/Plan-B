import { useThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeSwitcher.css';

function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <button
    className={`theme-switcher ${theme}`}
    onClick={toggleTheme}
    style={{ cursor: "pointer" }}
  >
    {theme === "light" ? <FaMoon /> : <FaSun />}
  </button>
);
}

export default ThemeSwitcher;
