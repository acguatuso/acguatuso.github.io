import { Route, Routes } from "react-router-dom"
import About from "../pages/About/About"

import Students from "../pages/Students/Students"
import CursosMain from "../components/gestion_cursos/CursosMain"
import GestionCursos from "../components/gestion_cursos/GestionCursos"



export const PagesRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/Cursos' element={<CursosMain/>} />
        <Route path='/gestionar-cursos' element={<GestionCursos/>} />
        <Route path='/About' element={<About/>} />
        <Route path='/Students' element={<Students/>} />
      </Routes>
    </>
  )
}
