const getVotosMedia = async (id) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/votos/${id}`);
    const json = await res.json();
  
    if (!res.ok) {
      throw new Error(json.message);
    }
  
    return json.data;
  };
  
  export default getVotosMedia;