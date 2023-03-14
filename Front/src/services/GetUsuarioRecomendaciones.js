export const GetUsuarioRecomendaciones = async (id) => {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/usuario/${id}/recomendaciones`
    );
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }
  
    return data.data;
  };
  