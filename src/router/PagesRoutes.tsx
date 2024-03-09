import { Route, Routes } from "react-router-dom"
import { Navbar } from "../ui"
import App from "../App"

import About from "../pages/About/About"
import CursosMain from "../components/gestion_cursos/CursosMain"
import GestionCursos from "../components/gestion_cursos/GestionCursos"


export const PagesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path='/Cursos' element={<CursosMain/>} />
            <Route path='/gestionar-cursos' element={<GestionCursos/>} />
            <Route path='/About' element={<About/>} />
          </Routes>
        </div> 
    </>
  )
}
