//Identificar las rutas internas
import { Route, Routes } from "react-router-dom";
//Para comunicarnos con el usuario, errores y procesos
import { ToastContainer } from "react-toastify";
//CSS del Toast
import "react-toastify/dist/ReactToastify.css";
//CSS Global
import './App.css';
//Import de las diferentes paginas
import Login from './pages/LoginPage/LoginPage';
import Registro from "./pages/RegisterPage/RegisterPage";
import About from "./pages/AboutPage/AboutPage"
import Home from "./pages/HomePage/HomePage"
import NotFoundPage  from "./pages/NotFoundPage/NotFoundPage";
import UserPage from "./pages/UserPage/UserPage";
import RecomendacionPage from "./pages/RecomendacionPage/RecomendacionPage";
import NuevaRecomendacionPage from "./pages/NuevaRecomendacionPage/NuevaRecomendacionPage"
//import componentes
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

//Import para día o noche
import {ThemeProvider} from "./context/ThemeContext";
import EditUser from "./pages/EditUserPage/EditUserPage";
import ListRecomendaciones from "./pages/RecomendacionPage/ListRecomendacion";
import ListUsuarios from "./pages/UserPage/ListUsuarios";
import EditarRecomendacion from "./pages/RecomendacionPage/EditarRecomendacion";


function App() {
  return (
    <div className="App">
    <ThemeProvider >
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recomendaciones" element={<ListRecomendaciones/>} />
        <Route path="/usuarios" element={<ListUsuarios />} />
        <Route path="/about" element={<About/>} />
        <Route path="/usuario/login" element={<Login />} />
        <Route path="/usuario/crear" element={<Registro />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path= "/usuario/:id/detalle" element= {<UserPage />} />
        <Route path="/recomendacion/:id/editar" element={<EditarRecomendacion />}/>
        <Route path="/recomendacion/:id/detalle" element={<RecomendacionPage />}/>
        <Route path="/recomendacion/formulario" element={<NuevaRecomendacionPage />}/>
        <Route path="/usuario/:id" element={<EditUser />}/>
      </Routes>
      <Footer />
      <ToastContainer position="bottom-center" pauseOnHover theme="dark" />
  </ThemeProvider>
    </div>
  );
}

export default App;
