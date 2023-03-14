import { useThemeContext } from "../contexts/ThemeContext";
function Home() {
  const { theme } = useThemeContext();
    return (
    <main className={theme}>Home page</main>)
  }
  
  export default Home;
  