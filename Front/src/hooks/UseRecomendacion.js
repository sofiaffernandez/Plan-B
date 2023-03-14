import { useEffect, useState } from "react";
import  getSingleRecomendacion  from "../services/GetSingleRecomendacion";

const useRecomendacion = (id) => {
  const [recomendacion, setRecomendacion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRecomendacion = async () => {
      try {
        setLoading(true);
        const data = await getSingleRecomendacion(id);

        setRecomendacion(data[0]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  if (id) {
    loadRecomendacion();
  }
}, [id]);


  return { recomendacion, error, loading };
};
export default useRecomendacion;
