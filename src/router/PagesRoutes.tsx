import { Route, Routes } from "react-router-dom"
import { Navbar } from "../ui"
import App from "../App"

import About from "../pages/About/About"


export const PagesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path='/About' element={<About/>} />
          </Routes>
        </div> 
    </>
  )
}
