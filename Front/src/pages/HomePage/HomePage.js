import { Link } from "react-router-dom";
import { useThemeContext } from "../../context/ThemeContext";
import "./HomePage.css"
import chicamundo from"./../../Imagenes/chicamundo.png"
import chicosplaya from "./../../Imagenes/chicosplaya.png"
import Ultimas from "../RecomendacionPage/List3Ultimas";
import { useUser } from "../../context/UserContext";
import chicaconposte from "../../Imagenes/chicaposte.png"
import Buscador from "../../components/Buscador/Buscador";

function Home() {
  const { theme } = useThemeContext();
  const usuario = useUser();
    return (
    <main className={theme}>
      <h1>Explora el mundo con Plan B</h1>
      <section   className="Presentacion">
      <p>Comparte tus recomendaciones de viaje con otros usuarios y descubre los mejores planes para tu próximo viaje. Nuestra plataforma es un lugar para conocer, compartir e intercambiar recomendaciones sobre los mejores destinos turísticos del mundo.</p>
      <img src={chicamundo} alt="chica con la bola del mundo"/>
      </section>
      <h2>Encuentra experiencias únicas<br/></h2>
    <section className="Buscador">
      <Buscador /> 
      </section>
      <section  className="recomendaciones">
      <h2> Últimas recomendaciones </h2>
      <Ultimas />
      </section>
      <section className="accede">
      { !usuario ? (
              <>
              <h2>Accede a la comunidad</h2>
              <div className="contenedorAccede">
              <img src={chicaconposte} alt="dibujo chica con un poste de señales" className="imagenAccede" ></img>
              <div className="contenedorTexto">
              <p>¡Únete a nosotros y empieza a explorar el mundo! Comparte tus recomendaciones, vota y comenta sobre las recomendaciones de otros usuarios y descubre nuevos destinos. ¡Sea cual sea tu destino, aquí encontrarás la mejor manera de disfrutarlo!
              </p>
              <Link to="/usuario/login" className="accedeLink">Accede</Link>
              </div>
              </div>
            </>
              ):(
                null )}
      </section>
      <h2>Vota y comenta las recomendaciones<br/></h2>
    <section className="Voto">
      <img src={chicosplaya} alt="pareja en la playa" />
      <p> Tendrás la oportunidad de votar las recomendaciones de otros usuarios, comentar sobre ellas y descubrir el perfil de otros viajeros. Otros usuarios también pueden votar y comentar tus recomendaciones. Esto te ayudará a descubrir los mejores planes y a encontrar los mejores consejos sobre un destino que te interese.</p>
      </section>
                
    </main>)
  }
  
  export default Home;
  