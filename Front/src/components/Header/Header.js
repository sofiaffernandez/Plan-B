import { Link } from "react-router-dom";
//import de logo para el header
import logo from "./../../logoplanb.png"
//import icono 
import { AiOutlineLogout } from "react-icons/ai";
import { RxAvatar } from  "react-icons/rx"
import {MdOutlineCreate} from "react-icons/md"
//import del cambio de tema
import  ThemeSwitcher   from "./../ThemeSwitcher/ThemeSwitcher";

import { useUser, useSetUser } from "../../context/UserContext";

//import css
import "./Header.css"

const Header = () => {
  const usuario = useUser();
  const setUser = useSetUser();

  return (
    <header className="principal">
        <nav>
            <ul>
                <li className="logoPagina">
                    <Link to="/" >
                    <img src={logo} alt ="logo pagina" />
                    </Link>
                </li>
                <li>
                    <Link to="/" className="my-link">
                    Home
                    </Link>
                </li>
                <li>
                    <Link to="/recomendaciones" className="my-link">
                    Recomendaciones
                    </Link>
                </li>
                <li>
                    <Link to="/usuarios" className="my-link">
                    Perfiles
                    </Link>
                </li>
                <li>
                    <Link to="/about" className="my-link">
                    AboutUs
                    </Link>
                </li>
                { usuario ? (
                <section>
                  <Link to={"/recomendacion/formulario"}>
                  <MdOutlineCreate /> 
                  </Link>
                  <Link to={`/usuario/${usuario.id}/detalle`}>
                  < RxAvatar /> </Link>
                  <AiOutlineLogout  onClick={() => setUser()} />
                </section>
              
              ) : (
            <>
              <li>
                <Link to="/usuario/login" className="my-link" >Accede</Link>
              </li>
              <li>
                <Link to="/usuario/crear" className="my-link" >Únete</Link>
              </li>
            </>
          )}
      <li>
      <ThemeSwitcher />
      </li>
      </ul>
      </nav>
    </header>
  );
};

export default Header;
