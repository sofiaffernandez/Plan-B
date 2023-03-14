export const GetAllUsers = async () => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND}/usuarios`);
  
    const data = await res.json();
  
    if (!res.ok) {
      throw new Error(data.message);
    }

    return data.data;
  };