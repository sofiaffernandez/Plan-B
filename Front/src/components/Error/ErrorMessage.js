import { Link } from "react-router-dom";

export const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <p>{message}</p>
      <h1>Ups! Se ha producido un error</h1>
      <Link to={"/"}>Regresa a la Home</Link>
    </section>
  );
};