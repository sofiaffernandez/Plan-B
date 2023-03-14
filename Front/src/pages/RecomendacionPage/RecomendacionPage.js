import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Comentar from "../../components/Comentar/Comentar";
import Spinner from "../../components/Spinner/Spinner";
import  Votar  from "../../components/Voto/Votar";
import  useRecomendacion   from "../../hooks/UseRecomendacion"
import { RiDeleteBin6Line } from 'react-icons/ri';
import getUserDataService from "../../services/GetUserData";
import "./RecomendacionPage.css"
import { useThemeContext } from "../../context/ThemeContext";
import { GetFotoRecomendacion } from "../../services/GetFotoRecomendacion";
import GetAllComentarios from "../../services/GetAllComentariosRecomendacion";
import { GetAllUsers } from "../../services/GetAllUsers";
import getVotosMedia from "../../services/GetVotosMedia";
import {MdOutlineCreate} from "react-icons/md"

const RecomendacionPage = () => {
  const { theme } = useThemeContext();
  const { id } = useParams();
  const { recomendacion, loading } = useRecomendacion(id);
  const [usuarios, setUsuarios] = useState([]);
  const usuariosPromise = GetAllUsers();

  useEffect(() => {
    usuariosPromise.then(data => {
      setUsuarios(data);
    });
  }, [usuariosPromise]);

  let token;
  if (localStorage.getItem('user')) {
    token = JSON.parse(localStorage.getItem('user')).token;
  } 
  
  let idLogin;
  if (localStorage.getItem('user')) {
    idLogin = JSON.parse(localStorage.getItem('user')).id;
  } 
  
  const [usuario, setUsuario] = useState([]);
  //Establecimiento del status y su set 
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const [fotos, setFotos] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [votos, setVotos] = useState([]);



  useEffect(() => {
    const datos = getUserDataService(recomendacion.autor_id)
    datos.then(data => {
      const { datosUsuario } = data;
      const usuario = datosUsuario[0][0];
      if (usuario) {
      setUsuario({
        key: usuario.id,
        nombre: usuario.nombre,
        avatar: usuario.avatar,
        email: usuario.email,
        created_at: usuario.created_at
      })
    }
  })
 const dato = GetFotoRecomendacion(id)
 dato.then(data => {
  const { fotosRecomendacion } = data;
  const fotos = fotosRecomendacion[0][0];
   if (fotos){
     setFotos({
    key:fotos.id,
    created_at:fotos.created_at,
    foto:fotos.foto,
    })
   }
   const datoC = GetAllComentarios(id)
   datoC.then(data => {
    const {datosComentarios} = data
    const comentarios = datosComentarios[0]
    setComentarios(comentarios)   
   })
   
    const dataV = getVotosMedia(id);
    dataV.then(data => {
      const { votos_medios } = data[0];
      if (votos_medios) {
        const votosEnteros = parseInt(votos_medios, 10);
        setVotos(votosEnteros);
      }
 })
})
},[recomendacion.autor_id, id]);


  if (loading) {
    return <Spinner></Spinner>
  }
const handleClick = async (e) => {
  e.preventDefault()
  setStatus("loading");
  if (!window.confirm("¿Estás seguro de que deseas eliminar esta recomendación?")) {
    setStatus("");
    return;
  }
  try{
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/recomendacion/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }else{
      toast.success("Se ha eliminado correctamente");
      navigate("/");
    }
    }catch (error) {
      toast.error(error.message);
    } finally{
      setStatus("");
 }
}

const { nombre} = usuario;
const {foto} = fotos; 


    if (status === "loading") {
      return <Spinner />;
    }
    return (
      <main className={theme}>
    <section className="UnicaRecomendacion">
      {recomendacion && (
        <>
          <h2>{recomendacion.titulo}</h2>
          { foto ? (
            <img src={`${process.env.REACT_APP_BACKEND}/public/${foto}`} alt={recomendacion.titulo} />
            
            ):(
              null )
            }
                 
          <h3>📍{recomendacion.lugar}</h3>
          <h3>{recomendacion.categoria}</h3>
          <p>{recomendacion.entradilla}</p>
          <p>{recomendacion.texto}</p>
          <p className="creada">Creada por <Link to={`/usuario/${recomendacion.autor_id}/detalle`}>{nombre}</Link> {" "} 
         at {new Date(recomendacion.created_at).toLocaleDateString('es-ES')}
        </p>
        <div className="estrellas">
            { token ? (
                     <section>
                       <Votar /> 
        
                     </section>
                       ) : (
                         <p> Registrate para poder votar </p>
                       )}
        { votos.length === 0 ? (
          <p className="votos">Aún no hay votos registrados</p>
          ) :(
            <p className="votos"> ({votos})</p>
        )
        }
          
        </div>
        </>
      )}
        { recomendacion.autor_id === idLogin ? (
                         <section className="editRecomendacion">
                           <Link to={`/recomendacion/${id}/editar`}>
                             <MdOutlineCreate /> 
                            </Link>
                     
                         </section>
                           ) : (
                             null
                           )}
                  { recomendacion.autor_id === idLogin ? (
                         <section className="delete" >
                            < RiDeleteBin6Line onClick={handleClick}/>
                     
                         </section>
                           ) : (
                             null
                           )}
    
              <ul className="listacomentarios">
              {comentarios.length > 0 ? (
        <ul>
          {comentarios.map((comentario) => {
            const usuario = usuarios.find(
              (usuario) => usuario.id === comentario.usuario_id
            );
            return (
              <li key={comentario.id}>
                <Link to={`/usuario/${comentario.usuario_id}/detalle`}>
                <p className="nombreComentario"> {usuario.nombre}:</p>
                </Link>
                <p>{comentario.comentario}</p>
                <p className="fechaComentario">{new Date(comentario.created_at).toLocaleDateString('es-ES')}</p>
                {comentario.usuario_id === idLogin ? (
                    <section className="deleteComentario" >
                      <RiDeleteBin6Line onClick={async (e) => {
                        e.preventDefault();
                        setStatus("loading");
                        if (!window.confirm("¿Estás seguro de que deseas eliminar este comentario?")) {
                          setStatus("");
                          return;
                        }
                        try {
                          const res = await fetch(`${process.env.REACT_APP_BACKEND}/comentario/${comentario.id}`, {
                            method: "DELETE",
                            headers: {
                              Authorization: token,
                            },
                          });
                        
                          const data = await res.json();
                        
                          if (!res.ok) {
                            throw new Error(data.message);
                          } else {
                            toast.success("Se ha eliminado correctamente");
                            window.location.reload();
                            setStatus("");
                          }
                        } catch (error) {
                          toast.error(error.message);
                        } finally {
                          setStatus("");
                        }
                        
                      }} />                 
                    </section>
                  ) : null}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Parece que de momento no hay comentarios en esta recomendacion</p>
      )}
            </ul>
            {token ? (
                 <section className="comentar">
                  <Comentar /> 
                </section>
                  ) : (
                    <p> Registrate para poder comentar </p>
                  )}
    </section>
    </main>
  );
};

export default RecomendacionPage;

