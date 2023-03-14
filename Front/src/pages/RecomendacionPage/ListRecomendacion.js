import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllRecomendaciones } from "../../services/GetAllRecomendaciones";
import "./ListRecomendacion.css"
import { useThemeContext } from "../../context/ThemeContext";
import { GetFotoRecomendacion } from "../../services/GetFotoRecomendacion";

const ListRecomendaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [page, setPage] = useState(0);
  const { theme } = useThemeContext();
  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    GetAllRecomendaciones(page).then((data) => {
      setRecomendaciones(data);
    });
  }, [page]);

  useEffect(() => {
    // Se utiliza la variable recomendaciones para obtener las fotos
    const promises = recomendaciones?.map((recomendacion) => {
      return GetFotoRecomendacion(recomendacion.id);
    });

    // Se utiliza Promise.all para esperar a que todas las promesas se resuelvan
    Promise.all(promises).then((fotoData) => {
      const fotos = fotoData?.map((data) =>
      data && data.fotosRecomendacion?.length > 0 ? data.fotosRecomendacion[0][0]?.foto : null
    );
      setFotos(fotos);
    });
  }, [recomendaciones]);
  return (
    <main className={theme}>
      <section className="lista">
        <ul className="listaRecomendaciones">
          {recomendaciones.length > 0 ? (
            recomendaciones.slice(page * 10, page * 10 + 10).map((recomendacion, ) => {
              const {foto} = recomendacion;
                 
              return (
                <li key={recomendacion.id}>
                  <Link to={`/recomendacion/${recomendacion.id}/detalle`}>
                    <h3>{recomendacion.titulo}</h3>
                  </Link>
                  <h4>📍{recomendacion.lugar}</h4>
                  <h4>{recomendacion.categoria}</h4>
                  <p>{recomendacion.entradilla}</p>
                  {foto ? (
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/public/${foto}`}
                      alt={recomendacion.titulo}
                    />
                  ) : null}
                </li>
              );
            })
          ) : (
            <p>Parece que de momento no hay recomendaciones para mostrar.</p>
          )}
        </ul>
            {page > 0 && (
            <button
            className="listarrecomendacion"
            onClick={() => setPage(page - 1)}
            >
            Anteriores
            </button>
            )}
            {page * 10 + 10 < recomendaciones.length && (
            <button
            className="listarrecomendacion"
            onClick={() => setPage(page + 1)}
            >
            Siguientes
            </button>
            )}
            </section>
            </main>
            );
};

export default ListRecomendaciones;