import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function EditUser() {
  const { id } = useParams();
  const user = useFetch("https://localhost:4000/usuario" + id);

  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [nuevoEmail, setNuevoEmail] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  useEffect(() => {
    setNombre(user?.nombre);
    setEmail(user?.email);
    setNuevoEmail(user?.nuevoEmail);
    setAvatarPreview(user?.avatar);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email); 
    formData.append("nuevoEmail", nuevoEmail); 
    formData.append("avatar", avatar); 


    const res = await fetch("" + id, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <form className="useracter edit" onSubmit={handleSubmit}>
      <label>
        <span>Nombre:</span>
        <input
          name="nombre"
          value={nombre}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        <span>Email:</span>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Nuevo email:</span>
        <input
          name="nuevoEmail"
          type="email"
          value={nuevoEmail}
          onChange={(e) => setNuevoEmail(e.target.value)}
        />
      </label>
      <label>
        <span>Imagen:</span>
        <input
          className="image-picker"
          name="avatar"
          type="file"
          onChange={handleFile}
        />
        {avatarPreview && <img src={avatarPreview} alt="preview" />}
      </label>
      <button>Guardar cambios</button>
    </form>
  );
}

export default EditUser;
