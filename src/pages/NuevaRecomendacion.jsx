import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const { REACT_APP_API } = process.env;

const NuevaRecomendacion = () => {
    const recomendacion = useFetch({REACT_APP_API} + id);
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [lugar, setLugar] = useState("");
  const [entradilla, setEntradilla] = useState("");
  const [texto, setTexto] = useState("");
  const [foto, setFoto] = useState("");
  const [fotoPreview, setFotoPreview] = useState("");

  useEffect(() => {
    setTitulo(recomendacion?.titulo);
    setCategoria(recomendacion?.categoria);
    setLugar(recomendacion?.lugar);
    setEntradilla(recomendacion?.entradilla);
    setTexto(recomendacion?.texto);
    setFoto(recomendacion?.foto);
    
  }, [recomendacion]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("categoria", categoria); 
    formData.append("lugar", lugar); 
    formData.append("entradilla", entradilla); 
    formData.append("texto", texto); 
    formData.append("foto", foto); 

    const res = await fetch("" + id, {
      method: "PUT",
      body: formData,
    });
    const data = await res.json();
    console.log(data);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  return (
    <form className="useracter edit" onSubmit={handleSubmit}>
      <label>
        <span>Titulo:</span>
        <input
          name="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </label>
      <label>
        <span>Categoria:</span>
        <input
          name="categoria"
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </label>
      <label>
        <span>Lugar:</span>
        <input
          name="lugar"
          type="text"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
        />
      </label>
      <label>
        <span>Entradilla</span>
        <input
          name="entradilla"
          type="text"
          value={entradilla}
          onChange={(e) => setEntradilla(e.target.value)}
        />
      </label>
      <label>
        <span>Texto</span>
        <textarea
          name="texto"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>
      <label>
        <span>Foto:</span>
        <input
          className="image-picker"
          name="foto"
          type="file"
          onChange={handleFile}
        />
        {fotoPreview && <img src={fotoPreview} alt="preview" />}
      </label>
      <button>Publicar recomendación</button>
    </form>
  );
}

export default NuevaRecomendacion;
