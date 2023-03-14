import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function ComentarioUsuario(props) {
  const { comentario, getSingleRecomendacion } = props;
  const [recomendacion, setRecomendacion] = useState(null);

  useEffect(() => {
    getSingleRecomendacion(comentario.recomendacion_id).then((recomendacion) => {
      console.log(recomendacion)
      if (recomendacion) {
        setRecomendacion(recomendacion);
      }   
    });
  }, [comentario.recomendacion_id, getSingleRecomendacion]);
 
  return (
    <li>
      {recomendacion ? (
        <Link to={`/recomendacion/${comentario.recomendacion_id}/detalle`}>
          <p>{recomendacion[0].titulo}</p>
        </Link>
      ) : (
        <p>Recomendación no encontrada</p>
      )}
      <p>{comentario.comentario}</p>
      <p>{new Date(comentario.created_at).toLocaleDateString('es-ES')}</p>
    </li>
  );
}
export default ComentarioUsuario