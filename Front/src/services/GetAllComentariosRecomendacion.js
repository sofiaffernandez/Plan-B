 const GetAllComentarios = async (id) => {

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/recomendacion/${id}/detalle`);

    const json = await res.json();
    if (!res.ok || json.status === "error") {
      throw new Error(json.message);
    }

    return json.data.detalle
  };
  export default GetAllComentarios