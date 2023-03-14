import { useThemeContext } from "../../context/ThemeContext";
import React from "react";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import getUserDataService from "../../services/GetUserData";
import getSingleRecomendacion  from "../../services/GetSingleRecomendacion"
import { Link } from "react-router-dom";
import {TbEdit} from  "react-icons/tb"
import "./UserPage.css"
import ComentarioUsuario from "./ComentarioUsuario";
const PaginaUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState([]);
  const [comentariosUsuario, setComentariosUsuario] = useState([])
  const { theme } = useThemeContext();
  let idLogin;
  if (localStorage.getItem('user')) {
    idLogin = JSON.parse(localStorage.getItem('user')).id;
  } 
  
  const [recomendaciones, setRecomendaciones] = useState([]);

  useEffect(() => {
    const datos = getUserDataService(id)
    datos.then(data => {
      const { datosUsuario } = data;
      console.log(data)
      const usuario = datosUsuario[0][0];
      if (usuario) {
      setUsuario({
        key: usuario.id,
        nombre: usuario.nombre,
        avatar: usuario.avatar,
        email: usuario.email,
        created_at: usuario.created_at
      });
    }

    const {datosRecomendacionesUsuario} = data
    const recomendaciones = datosRecomendacionesUsuario[0]
      setRecomendaciones(recomendaciones)
    const {datosComentariosUsuarios} = data
    const comentariosUsuario = datosComentariosUsuarios[0]
    setComentariosUsuario(comentariosUsuario)   
})},[id]);


  const { nombre, avatar, email, created_at } = usuario;

   return (
     <main className={theme}>
       <section className='Perfil'>
         <h2>Perfil de {nombre}</h2>
         <div className="infoPerfil">
           {avatar  ? (
             <img className="avatar" src={`${process.env.REACT_APP_BACKEND}/public/${avatar}`} alt="Avatar"></img>
        ) : (
          null
          )}
          <div className="contenedorTextPerfil">
          <h3>{nombre}</h3>
           <h3>{email} </h3>
           <p>Creado en {new Date(created_at).toLocaleDateString('es-ES')}</p>
        {id == idLogin ? (
             <Link to={`/usuario/${id}`}>
               <TbEdit className="editar"/>
             </Link>
              ) : (
              null
              )}
         </div>

         </div>
        </section>
    <section className='RecomendacionesPerfil'>
          <h2> Recomendaciones de {nombre} </h2>
          <div className="divRecomendaciones">
          {recomendaciones.length > 0 ?  ( 
            recomendaciones.map((recomendacion) =>
          <li key={recomendacion.id} > 
          <Link to={`/recomendacion/${recomendacion.id}/detalle`}>
             <h3>{recomendacion.titulo}</h3>
          </Link>
              <h4>{recomendacion.lugar}</h4>
              <h4>{recomendacion.categoria}</h4>
              <p>{recomendacion.entradilla}</p>
          </li> 
            )
        ) : (
          <p>Parece que de momento no hay recomendaciones para mostrar.</p>
          )}
          </div>
        </section>
        <section className='ComentariosPerfil'>
  <h2> Comentarios de {nombre} </h2>
  <div className="divComentarios">
  {comentariosUsuario.length > 0 ? (
  <>
    {comentariosUsuario.map((comentario) => {
      return (
        <ComentarioUsuario
          key={comentario.id}
          comentario={comentario}
          getSingleRecomendacion={getSingleRecomendacion}
        />
      );
    })}
  </>
) : (
  <p>Parece que de momento no hay comentarios para mostrar.</p>
)}
  </div>

</section>
    </main>
       );
    };
 export default PaginaUsuario;
