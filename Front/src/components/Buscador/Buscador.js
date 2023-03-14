import { useState } from "react";
import { BsSearch, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Buscador.css";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { toast } from "react-toastify";

const Buscador = () => {
  const [categoria, setCategoria] = useState("");
  const [lugar, setLugar] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [order, setOrder] = useState("");
  const [showResults, setShowResults] = useState(false);


  const handleSearch = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND}/recomendaciones/buscar?categoria=${categoria}&lugar=${lugar}&order=${order}`, {
          method:"GET",
        });
        console.log(res)
        const data = await res.json();
        setSearchResults(data.data);
        setShowResults(true);
        
      } catch (error) {
        toast.error(error.message);
      }
    };
    
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
      setCategoria("");
      setLugar("");
      setOrder("");
      setSearchResults([]);
      setShowResults(false);
    };

  return (
    <form className="buscador-container" onSubmit={(e) => e.preventDefault()}>
      <div className="buscador-inputs-1">
        <input
          className="buscador-input"
          type="text"
          value={lugar}
          placeholder="Buscar lugar"
          onChange={(event) => setLugar(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="buscador-button" onClick={handleSearch}>
          <BsSearch />
        </button>
        <button className="buscador-button" onClick={handleClear}>
          <BsTrash />
        </button>
      </div>
      <div className="buscador-inputs-2">
        <input
          className="buscador-input"
          type="text"
          value={categoria}
          placeholder="Buscar categoría"
          onChange={(event) => setCategoria(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <select
          className="buscador-select"
          value={order}
          onChange={(event) => setOrder(event.target.value)}
        >
          <option value="">Ordenar por votos</option>
          <option value="DESC">Más votados</option>
          <option value="ASC">Menos votados</option>
        </select>
      </div>
      {showResults && (
        <ul className="buscador-resultados">
          {searchResults.length > 0 ? (
            searchResults.map((result) => {
              if (
                (result.categoria === categoria || categoria === "") &&
                (result.lugar.toLowerCase().includes(lugar.toLowerCase()) ||
                    lugar === "")
                    ) {
                    return (
                    <li key={result.id}>
                    <Link to={`/recomendacion/${result.id}/detalle`}>
                    <h3>{result.titulo}</h3>
                    </Link>
                    <h4>📍{result.lugar}</h4>
                    <h4>{result.categoria}</h4>
                    <div className="estrellas">
                    {result.votos === null ? 
                        <p className="votos">Aún no hay votos registrados</p> : <>
                        <Box sx={{ '& > legend': { mt: 2 } }}>
                            <Rating name={`rating-${result.id}`} value={parseInt(result.votos, 10)} readOnly />
                        </Box>
                            <p className="votos">({parseInt(result.votos, 10)})</p>
                        </>
                    }
                      </div>
                      </li>
                      );
                      } else {
                      return null;
                      }
                      })
                      ) : (
                      <li>No se encontraron resultados</li>
                      )}
                      </ul>
                      )}
                      </form>
                      );
                      };
      export default Buscador;