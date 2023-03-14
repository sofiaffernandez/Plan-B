 const getUserDataService = async (id) => {

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/usuario/${id}/detalle`);
  
    const json = await res.json();
  
    if (!res.ok) {
      throw new Error(json.message);
    }
  
    return json.data.detalle;
  };
export default getUserDataService