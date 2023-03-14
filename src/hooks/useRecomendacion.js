import useFetch from "./useFetch";

export const useRecomendaciones = () =>
  useFetch("https://localhost:4000/recomendacion");
export const useRecomendacion = (id) =>
  useFetch(`https://localhost:4000/recomendacion${id}`);