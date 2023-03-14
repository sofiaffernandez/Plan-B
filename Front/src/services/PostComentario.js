const postComentario = async ({ id, comentario, token }) => {
    const res =  fetch(`${process.env.REACT_APP_BACKEND}/recomendacion/${id}/votar`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({ comentario })
      });
    
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
  };

  export default postComentario;