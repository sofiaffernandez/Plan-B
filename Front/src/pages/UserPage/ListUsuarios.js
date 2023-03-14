import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {GetAllUsers} from "../../services/GetAllUsers"
import "../RecomendacionPage/ListRecomendacion.css"
import { useThemeContext } from "../../context/ThemeContext";
import "./ListUsuarios.css"
const ListUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [page, setPage] = useState(0);
  const { theme } = useThemeContext();
  
  useEffect(() => {
    GetAllUsers(page).then((data) => {
      // Filtrar usuarios duplicados
      const filteredData = data.filter((user, index, self) => 
        index === self.findIndex(u => u.id === user.id)
      );
      // Ordenar por fecha de creación descendente
      filteredData.sort((a, b) => new Date(b.fecha_creacion) - new Date(a.fecha_creacion));
      setUsuarios(filteredData);
    });
  }, [page]);
    return (
      <main className={theme}>
        <section className="sectionListaPerfiles">
          <ul className="listaPerfiles">
            {usuarios.length > 0 ? (
              usuarios.slice(page * 10, page * 10 + 10).map((usuario) => (
                <li key={usuario.id}>
                  <Link to={`/usuario/${usuario.id}/detalle`}>
                    <h2>{usuario.nombre}</h2>
                  </Link>
                  <h3>{usuario.email}</h3>
                  <p>Creado en {new Date(usuario.created_at).toLocaleDateString('es-ES')}</p>
                  {usuario.avatar ? (
                    <img src={`${process.env.REACT_APP_BACKEND}/public/${usuario.avatar}`} alt="Avatar"></img>
                  ) : (
                    <p>Parece que de momento no tiene avatar.</p>
                  )}
                </li>
              ))
            ) : (
              <p>No hay usuarios.</p>
            )}
          </ul>
      {page > 0 && <button className="listarperfiles" onClick={() => setPage(page - 1)}>
      Anteriores
      </button>}
      {page * 10 + 10 < usuarios.length && <button className="listarperfiles"onClick={() => setPage(page + 1)}>
      Siguientes
      </button>}
  </section>
  </main>
  )
};

export default ListUsuarios;