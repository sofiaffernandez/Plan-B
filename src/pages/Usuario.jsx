import { userContext } from "../../contexts/userContext";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";


const PaginaUsuario = () => {
  const { token } = userContext();
  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/usuario`, {
          headers: { Authorization: `${token}` },
        });
        const body = await res.json();

        if (res.ok) {
            setNombre(user.data.nombre);
            setEmail(user.dataemail);
            setAvatarPreview(user.data.avatar);
        } else {
          throw new Error(body.message);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!token) {
    return <Navigate to="/login" />;
  }

  // se puede añadir las entradas que tenga también
  return (
    <section>
      <h2>Mi perfil</h2>
      <h3>Nombre: {nombre}</h3>
      <h3>Mi email: {email} </h3>
      <img src={avatarPreview} alt="Avatar de ${nombre}"></img>
    </section>
  );
};

export default PaginaUsuario;