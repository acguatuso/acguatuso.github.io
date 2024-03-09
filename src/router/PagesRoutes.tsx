import { Route, Routes } from "react-router-dom"
import { Navbar } from "../ui"
import App from "../App"

import About from "../pages/About/About"
import Students from "../pages/Students/Students"


export const PagesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path='/About' element={<About/>} />
            <Route path='/Students' element={<Students/>} />
          </Routes>
        </div> 
    </>
  )
}
