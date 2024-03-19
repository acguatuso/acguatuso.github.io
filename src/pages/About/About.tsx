import { UpdateMainSectionModal } from "./components/UpdateMainSectionModal";
import { AdsSection } from './components/AdsSection';
import { AddSection } from './components/AddSection';
import { aboutSelector, fetchMainSection,fetchSections } from '../../redux/reducers/aboutSlice';
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { EditInformationSection } from "./components/EditInformationSection";
import { useEffect, useState } from "react";
import { adsSection } from "./components/about.interface";
                
export const About = () => {
//IMPLEMENTACION DE REDUX
const dispatch = useAppDispatch()

//se realiza el fetch del mainSection y se utiliza el useSelector para extraer sus datos
// const fetch = async()=> {

// }
const [sections, setSections] = useState<adsSection[]>([])
useEffect(() => {
  (async() => {
    await dispatch(fetchMainSection())
    const res2 = await dispatch(fetchSections())
    //console.log(res2.payload,'res2')
    setSections(res2.payload as adsSection[])
  })()
}, [])


  return (
    <>      
      <div className="p-3 mb-2 bg-white text-dark border" id="about-container">  
        <UpdateMainSectionModal             
          />                                                        
        
        <AddSection/>            
        
        <div className="container-fluid">        
          <AdsSection/>
        </div>  

        <EditInformationSection/>    
      </div>   
    </>
  )
}
export default About;