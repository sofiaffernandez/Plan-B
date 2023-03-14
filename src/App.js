import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { ThemeProvider } from "./contexts/ThemeContext";

// 


function App() {

  return (
    <div className="App">
    <ThemeProvider >
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/*" element={<About/>} />
        <Route path="/usuario/login" element={<Login />} />
        <Route path="/usuario/crear" element={<Registro />} />
      </Routes>
    </ThemeProvider>
     
    </div>
  );
}

export default App;
