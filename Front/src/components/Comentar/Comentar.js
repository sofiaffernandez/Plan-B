import Spinner from "../../components/Spinner/Spinner";
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Comentar.css"
const Comentar = () => {
  const { id } = useParams();
    const [ comentarios, setComentarios ] = useState([]);
    const [ comentario, setComentario ] = useState('');
    const token = JSON.parse(localStorage.getItem('user')).token;

  //Establecimiento del status y su set 
  const [status, setStatus] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!comentario) return;
try{
  setStatus("loading");
  const formData = new FormData();
  formData.append("comentario", comentario);
  const res = await fetch(`${process.env.REACT_APP_BACKEND}/recomendacion/${id}/comentar`, {
    method: "POST",
    headers: {
      Authorization: token,
    },
    body: formData,
  });

  const data = await res.json();

  if(!res.ok || data.status ==="error"){
  toast.error(data.message);
  }
  else{
    toast.success("Se ha publicado el comentario correctamente");
    setComentarios([...comentarios, data.data]);
    window.location.reload()
  }

} catch (error) {
  toast.error(error.message);
} finally{
  setStatus("");
}
}
if (status === "loading") {
  return <Spinner />;
}

return (
<>
<form className="formcomentar" onSubmit={handleSubmit}>
      <textarea
        type="text"
        className="texto-comentario"
        placeholder="Deja tu comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}/>
    <button type="submit">Comenta</button>
</form>
</>
)}

export default Comentar;
