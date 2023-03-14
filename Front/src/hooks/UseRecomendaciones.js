import { useEffect, useState } from "react";
import { GetAllRecomendaciones } from "../services/GetAllRecomendaciones";
import { GetUsuarioRecomendaciones } from "../services/GetUsuarioRecomendaciones"

const useRecomendaciones = (id) => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecomendaciones = async () => {
      try {
        setLoading(true);
        const data = id
          ? await GetUsuarioRecomendaciones(id)
          : await GetAllRecomendaciones();

        setRecomendaciones(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecomendaciones();
  }, [id]);

  const addRecomendacion = (data) => {
    setRecomendaciones([data, ...recomendaciones]);
  };

  const deleteRecomendacion = (id) => {
    setRecomendaciones(recomendaciones.filter((recomendacion) => recomendacion.id !== id));
  };

  return { recomendaciones, error, loading, addRecomendacion, deleteRecomendacion };
};

export default useRecomendaciones;