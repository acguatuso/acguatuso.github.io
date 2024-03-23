import { UpdateMainSectionModal } from "./components/UpdateMainSectionModal";
import { AdsSection } from './components/AdsSection';
import { AddSection } from './components/AddSection';
import { aboutSelector, fetchMainSection, fetchSections } from '../../redux/reducers/aboutSlice';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { EditInformationSection } from "./components/EditInformationSection";
import { useEffect, useState } from "react";
import { adsSection } from "./components/about.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const About = () => {
  //IMPLEMENTACION DE REDUX
  const dispatch = useAppDispatch()

  //se realiza el fetch del mainSection y se utiliza el useSelector para extraer sus datos
  // const fetch = async()=> {

  // }

  useEffect(() => {
    (async () => {
      await dispatch(fetchMainSection())
      await dispatch(fetchSections())
    })()
  }, [])
  
  // LOGICA PARA REDIRECCIONAR SI NO SE ESTA LOGUEADO, PARA QUE NO SE PUEDA ACCEDER MENDIATE URL DIRECTA
  // React-router-dom
  const navigate = useNavigate();
  // Redux Hooks & Access
  const user = useSelector((state: RootState) => state.auth.user);
  const loggedIn = useSelector((state: RootState) => state.auth.loggedIn);
  console.log('Conectado: ', loggedIn);
  // Redireccionar si está no logueado, y no hay usuario
  useEffect(() => {
    if (!loggedIn && !user) {
      navigate("/");
    }
  }, [loggedIn, user, navigate]);

  return (
    <>
      <div className="p-3 mb-2 bg-white text-dark border" id="about-container">
        <UpdateMainSectionModal/>
        <AddSection />

        <div className="container-fluid">
          <AdsSection />
        </div>

        <EditInformationSection />
      </div>
    </>
  )
}
export default About;

// todo
// agregar toast listo en updatemain, addsection
// cuando se edita en la seccion la imagen vacia, hace que si hay imagen la quite
// el borrar no esta eliminando las imagenes