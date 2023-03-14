import { useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import "./RegisterPage.css"
import {MdOutlineVisibility} from "react-icons/md"
import { useThemeContext } from "../../context/ThemeContext";
const Registro = ({ setUser }) => {
  const { REACT_APP_BACKEND} = process.env;
    //Establecer email 
  const [email, setEmail] = useState("");
   //Establecer contrseña 
  const [contraseña, setContraseña] = useState("");
   //Establecer nombre 
  const [nombre, setNombre] = useState("");
  //Establecer status
  const [status, setStatus] = useState("");
  const [shown, setShown] = useState(false);
  const { theme } = useThemeContext();

  const handleSubmit = async (e) => {
    try {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch(`${REACT_APP_BACKEND}/usuario/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, contraseña }),
    });
    const data = await res.json();
  
    if (!res.ok || data.status === "error") {
        throw new Error(data.message);
      }
      toast.success(data.message);
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
      <form className="loginregistro" onSubmit={handleSubmit}>
        <h2> Encantados de conocerte</h2>
        <ul>
          <li>
        <label>
          Nombre <br/>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            name="nombre"
          />
        </label>
          </li>
          <li>
        <label>
          Email <br/>
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
          Contraseña <br/>
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
          <li className="contrasena">
        <label>
          Repite tu contraseña <br/>
          <input
            type={shown ? 'text' : 'password'}
            name="contraseña"
          />
        </label>
           < MdOutlineVisibility className="verContrasena" onClick={switchShown} />
          </li>
        </ul>
        <button>Unete</button>
      </form>
    </main>
  );
};

export default Registro;