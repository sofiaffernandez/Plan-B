import { NavLink } from "react-router-dom";
import { useUser, useSetUser } from "../contexts/UserContext";
import logo from "./../logoplanb.png"
import ThemeSwitcher from "./ThemeSwitcher";

const Header = () => {
  const user = useUser();
  const setUser = useSetUser();

  return (
    <header>
      <span> <NavLink to="/"> <img src={logo} alt ="logo pagina"></img></NavLink>
  </span>
      <span>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
       
      </span>
      <span className="userSection">
        {/* Si tengo el usuario visualizo email y icono logout */}
        {/* Si no tengo usuario visualizo los botones para hacer login o registrarme */}
        {user ? (
          <>
            👤 {user.email}
            <span onClick={() => setUser()}>❌</span>
          </>
        ) : (
          <>
            <NavLink to="/usuario/login">Login</NavLink>
            <NavLink to="/usuario/crear">Register</NavLink>
          </>
        )}
      </span>
      <span> <ThemeSwitcher /> </span>
    </header>
  );
};

export default Header;
