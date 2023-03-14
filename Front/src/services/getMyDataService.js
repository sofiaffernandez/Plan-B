export const getMyDataService = async (token) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/usuario`, {
      headers: {
        Authorization: token,
      },
    });
  
    const data = await res.json();
  
    if (!data.ok) {
      throw new Error(data.message);
    }
  
    return data.data;
  };