import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllRecomendaciones } from "../../services/GetAllRecomendaciones";
import { GetFotoRecomendacion } from "../../services/GetFotoRecomendacion";
import { useUser } from "../../context/UserContext";
import "./List3Ultimas.css"
import logoplanb from "../../logoplanb.png"
const Ultimas = () => {
    const [recomendaciones, setRecomendaciones] = useState([]);
    const [page] = useState(0);
    const [fotos, setFotos] = useState([]);
    const usuario = useUser();
    useEffect(() => {
      GetAllRecomendaciones(page).then((data) => setRecomendaciones(data));
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
      <section>
        <ul className="lista3Recomendaciones">
        {recomendaciones.length > 0 ? (
            recomendaciones.slice(0,3).map((recomendacion, index) => {
              const foto = fotos[index];

              return (
                <li key={recomendacion.id}>
                  <Link to={`/recomendacion/${recomendacion.id}/detalle`}>
                  {foto ? (
                    <img
                      src={`${process.env.REACT_APP_BACKEND}/public/${foto}`}
                      alt={recomendacion.titulo}
                    />
                  ) :  <img
                  src={logoplanb}
                  alt="logo plan b"
                  className="rellenologoplan"
                />}
    <h3>{recomendacion.titulo}</h3>

                  </Link>
                  </li>
            );
          })
        ) : (
            <section className="noRecomendaciones">
            <p className="noRecomendacion">
              Parece que de momento no hay recomendaciones para mostrar. ¡Puedes empezar creándolas tú!
            </p>
            {usuario ? ( 
              <div className="creaRecomendacion">
                <h3>Crea nuevas recomendaciones</h3>
                <Link to="/recomendacion/formulario" className="creaLink">
                  Crea
                </Link>
              </div>
            ) : (
              <>
              </>
            )}
          </section>
        )}
      </ul>
    </section>
  );
};
  export default Ultimas;