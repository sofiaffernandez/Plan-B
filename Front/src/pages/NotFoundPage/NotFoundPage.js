import { ErrorMessage } from "../../components/Error/ErrorMessage";
import { useThemeContext } from "../../context/ThemeContext";
import chicoviajero from "./../../Imagenes/chicoviajero.png"
import "./NotFoundPage.css"
export default function NotFoundPage () {
  const { theme } = useThemeContext();
  return (
    <main className={theme}>
      <div className="error">
      <img className="fotoViajero" src={chicoviajero} alt="chico joven con el mapamundi detrás"/>
    <ErrorMessage message={"Conocemos muchos recovecos del mundo, pero este aún no"} />

      </div>
    </main>
  )
};