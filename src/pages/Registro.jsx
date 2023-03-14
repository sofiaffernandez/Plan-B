import { useState } from "react";
import Spinner from "../components/Spinner";
import { useUser, useSetUser } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";
/* Mirar lo comentarios del componente LOGIN
Los dos componentes son casi iguales. */

const { REACT_APP_API } = process.env;

const Registro = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [nombre, setNombre] = useState("");
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const user = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch(`${REACT_APP_API}/usuario/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, contraseña }),
    });
    const data = await res.json();
  
    if (data.status === "error") {
      setStatus("error");
    } else {
      setStatus("");
    }
    setMessage(data.message);
  };
  if (user) {
    return <Navigate to="/" />;
  }
  if (status === "loading") {
    return <Spinner />;
  }

  // Defino JSX del componente Registro
  return (
    <main className="loginregistro">
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
        </ul>
        <ul>
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
        </ul>
        <ul>
          <li>
        <label>
          Contraseña <br/>
          <input
            value={contraseña}
            onChange={(e) => {
              setContraseña(e.target.value);
            }}
            type="password"
            name="contraseña"
          />
        </label>
          </li>
        </ul>
        <ul>
          <li>
        <label>
          Repite tu contraseña <br/>
          <input
            type="password"
            name="contraseña"
          />
        </label>
          </li>
        </ul>
        <button>Unete</button>
        {message && (
          <p className={`message ${status === "error" && "error"}`}>
            {message}
          </p>
        )}
      </form>
    </main>
  );
};

export default Registro;
