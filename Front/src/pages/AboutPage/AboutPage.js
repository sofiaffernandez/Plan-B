import { useThemeContext } from "../../context/ThemeContext";
import "./AboutPage.css"
function About() {
  const { theme } = useThemeContext();
    return (
      <main className={theme}>
        <div className="about">
          <h2>Sobre nosotros</h2>  
          <p> Somos Juan Salgado y Sofía Fernández, estudiantes del Full-Stack Bootcamp de <a href="https://www.hackaboss.com">Hack a Boss</a>🎓 </p>
          <p>Nos podéis encontrar en LinkedIn. </p>
          <ul>
          <li>📫<a href="https://www.linkedin.com/in/sofia-fern%C3%A1ndez-a11a17158/"> Perfil LinkedIn de Sofía</a></li>
          <li>📫<a href="https://www.linkedin.com/in/juan-salgado-garc%C3%ADa-009190258/"> Perfil LinkedIn de Juan</a></li>
          </ul>
         
          <p>También podéis ver todos nuestros proyectos en GitHub. </p>
          <ul>
          <li>💻<a href="https://github.com/sofiaffernandez"> Perfil GitHub de Sofía</a></li>
          <li>💻<a href="https://github.com/jsalga1"> Perfil GitHub de Juan</a></li>
          </ul>
          
        </div>
    </main>


    )
  }
  
  export default About;
  