import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const useFetch = (url) => {
  const [data, setData] = useState();
  const user = useUser();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(url, {
        headers: user ? { Authorization: user.token } : {},
      });
      const value = await res.json();

      setData(value);
    };

    getData();
  }, [url, user]);

  return data;
};

export default useFetch;
