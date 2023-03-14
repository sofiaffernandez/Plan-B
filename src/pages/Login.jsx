import { useState } from "react";
import { useUser, useSetUser } from "../contexts/UserContext";
import Spinner from "../components/Spinner";
import { Navigate } from "react-router-dom";

const { REACT_APP_API } = process.env;

const Login = () => {

  const [email, setEmail] = useState("");

  const [contraseña, setContraseña] = useState("");

  const [status, setStatus] = useState("");
 
  const [error, setError] = useState("");
  
  const setUser = useSetUser();
  const user = useUser();


  const handleSubmit = async (e) => {

    e.preventDefault();
  
    setStatus("loading");
   
    const res = await fetch(`${REACT_APP_API}/usuario/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, contraseña }),
    });
  
    const data = await res.json();
    
    

    if (data.status === "error") {
      setStatus("error");
      setError(data.message);
    } else {
     
      setUser(data.data);
    }
   
  };

  
  if (status === "loading") {
    return <Spinner />;
  }
  
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <main className="login">
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
        </ul>
    <ul>
      <li>
        <label>
          Contraseña
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
        <button>Accede</button>
        {/* En caso de error visualizo un parrafo con el mensaje de error */}
        {status === "error" && <p className="error">{error}</p>}
      </form>
    </main>
  );
};

export default Login;
