import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import carga
import Spinner from "../../components/Spinner/Spinner";
//import para ver los errores en pantalla para el usuario
import { toast } from "react-toastify";
import { useThemeContext } from "../../context/ThemeContext";
import { useSetUser } from "../../context/UserContext";
import {MdOutlineVisibility} from "react-icons/md"
import "./LoginPage.css"

const Login = () => {
  const setUser = useSetUser();
  const navigate = useNavigate();
    //Establecimiento del email y su set 
    const [email, setEmail] = useState("");
    //Establecimiento de la contraseña y su set 
    const [contraseña, setContraseña] = useState("");
    //Establecimiento del status y su set 
    const [status, setStatus] = useState("");
    const [shown, setShown] = useState(false);
const { theme } = useThemeContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setStatus("loading");
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/usuario/login`, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          contraseña: contraseña
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const data = await res.json();
    
      if (!res.ok || data.status === "error") {
        throw new Error(data.message);
      }
    
      setUser(data.data);
      navigate("/");
      toast.success("¡Te has logueado correctamente!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setStatus("");
    }
  };

  
  if (status === "loading") {
    return <Spinner />;
  }
  const switchShown = () => setShown(!shown);
  return (
    <main className={theme}>
      <form className="login" onSubmit={handleSubmit}>
        <h2>¡Hola de nuevo!</h2>
        <ul>
          <li>
          <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
        </label>
          </li>
      <li className="contrasena">
        <label>
          Contraseña
          <input
            value={contraseña}
            onChange={(e) => {
              setContraseña(e.target.value);
            }}
            type={shown ? 'text' : 'password'}
            name="contraseña"
          />
        </label>
      < MdOutlineVisibility className="verContrasena" onClick={switchShown} />
      </li>
    </ul>
        <button>Accede</button>
      </form>
    </main>
  );
};

export default Login;
