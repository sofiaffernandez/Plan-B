import Box from '@mui/material/Box';
import Spinner from "../../components/Spinner/Spinner";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import getVotosMedia from "../../services/GetVotosMedia";

const Votar = () => {
  const { id } = useParams();
  const token = JSON.parse(localStorage.getItem('user')).token;
  //Establecimiento del status y su set 
  const [status, setStatus] = useState("");
const [votosEnteros, setVotos] = useState(0)
useEffect (() =>{
  const dataV = getVotosMedia(id);
    dataV.then(data => {
      const { votos_medios } = data[0];
      if (votos_medios) {
        const votosEnteros = parseInt(votos_medios, 10);
        setVotos(votosEnteros);
        setVoto(votosEnteros);
      }
})
}, [id])
  const [voto, setVoto] = useState(0);
  
  const handleClickRating = async (e, voto) => {
    e.preventDefault();
    
    try {
      setStatus("loading");
      setVoto(voto);
      
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/recomendacion/${id}/votar`, {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ voto: voto })
      });

    const data = await res.json();
    if(!res.ok || data.status ==="error"){
      toast.error(data.message);
      }
      else{
        toast.success("Se ha publicado correctamente");
      }
  
    } catch (error) {
      toast.error(error.message);
    } finally{
      setStatus("");
    }
}
if (status === "loading") {
  return <Spinner />;
}
return (
  token ? (
        <Box
        sx={{
        '& > legend': { mt: 2 },
        }}>
        <Rating
        name="simple-controlled"
        value={voto}
        onChange={(e, voto) => handleClickRating(e, voto)}/>
        </Box>

) : (
        <p>Registrate para poder votar</p>
     )
)
}
export default Votar;

