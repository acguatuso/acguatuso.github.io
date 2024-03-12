import { useState,useEffect } from "react";
//import './About.css'
//import { uploadFirebaseImage } from "../../utils/uploadFirebaseImages/uploadFirebaseImages";
import { getFirebaseDoc } from "../../utils/getFirebaseDoc/getFirebaseDoc";
//import { updateFirebaseDoc } from "../../utils/updateFirebaseDoc/updateFirebaseDoc";
import { UpdateMainSectionModal } from "../../components/AboutModal/UpdateMainSectionModal";
import { SectionModal } from '../../components/AboutModal/SectionModal';
import { AddSection } from '../../components/AboutModal/AddSection';
//import { doc, getDoc } from 'firebase/firestore'
//import { db } from '../../firebase'

export interface sectionsData {
  position_id: number
  descripcion: string,
  estado: number,
  image_url: string,
  subtitulo: string,
  titulo: string
}

export interface headData{
  image_principal_url: string,
  subtitulo_principal: string,
  titulo_principal: string
}

export interface information{
  telefonos: number,
  correo: string,
  horarios: Array<string>
  direccion: string
}


export const About = () => {

const [sections, setSections] = useState<sectionsData[]>([])
const [head, setHead] = useState<headData>({ image_principal_url: '',subtitulo_principal: '',titulo_principal: ''})
const imagesList = sections.map( (evt) => { return  evt.image_url });


useEffect(() => {
  (async()=>{
    const doc = await getFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv')
    //console.log(doc)
    setSections(doc?.secciones)
    setHead({image_principal_url: doc?.image_principal_url, subtitulo_principal: doc?.subtitulo_principal, titulo_principal: doc?.titulo_principal})     
  })()
  
}, [])

  return (
    <>      
      <div className="container-fluid" id="about-container">  
        <UpdateMainSectionModal 
            image_principal_url= {head.image_principal_url}
            subtitulo_principal= {head.subtitulo_principal}
            titulo_principal= {head.titulo_principal}
          />    

        <div className="row">    
            
          <div className="col mb-4">           
          <AddSection {...imagesList}/>  
          </div>
        </div>
        {
          sections.map( (evt) => (
            <SectionModal
            position_id={evt.position_id}           
            descripcion= {evt.descripcion} 
            estado= {evt.estado} 
            image_url= {evt.image_url}
            subtitulo= {evt.subtitulo}
            titulo= {evt.titulo}
            />
          ))
        }        
      </div>
    </>
  )
}
export default About;