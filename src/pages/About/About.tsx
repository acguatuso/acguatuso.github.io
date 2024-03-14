import { useState,useEffect } from "react";
//import './About.css'
import { getFirebaseDoc } from "../../api/getFirebaseDoc/getFirebaseDoc";
import { UpdateMainSectionModal } from "./components/UpdateMainSectionModal";
import { AdSection } from './components/AdSection';
import { AddSection } from './components/AddSection';
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { headData,sectionsData, } from './components/about.interface';



import { getDownloadURL, ref, listAll } from "firebase/storage";
import { firebase_storage } from '../../firebase'

                 


export const About = () => {
const [globalStateMainSection, setGlobalStateMainSection] = useState(0)
const [globalStateSections, setGlobalStateSections] = useState(0)
const [sections, setSections] = useState<sectionsData[]>([])
const [head, setHead] = useState<headData>({ image_principal_url: '',subtitulo_principal: '',titulo_principal: ''})
//const [imageList, setImageList] = useState<string[]>([])
const [mainImage, setMainImage] = useState('')


//FUNCIONES GLOBALES QUE SIRVEN PARA SER LLAMADAS DESDE OTROS COMPONENTES 
//SE UTILIZA UNA POR COMPONENTE PARA QUE SE EJECUTEN DE MANERA CORRECTA
const handleGlobalState1 = () => {
  console.log('handleGlobalState1')
  setGlobalStateMainSection(globalStateMainSection + 1)
}

const handleGlobalState2 = () =>{
  console.log('handleGlobalState2')
  setGlobalStateSections(globalStateSections + 1)
}

const handleGlobalState3 = () =>{
  console.log('handleGlobalState3')
  setGlobalStateSections(globalStateSections + 1)
}


useEffect(() => {
  (async()=>{
    //CARGA LOS ELEMENTOS DE EMPRESA
    const doc2 = await getFirebaseDocs('/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones')
    //obtener los urls
    setSections(doc2 as sectionsData[])
    
  })()

}, [globalStateSections])

useEffect(() => {
  (async()=>{
    //CARGA ELEMENTOS DE LA SECCION PRINCIPAL
    const doc = await getFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv')
    setHead({
      image_principal_url: doc?.image_principal_url, 
      subtitulo_principal: doc?.subtitulo_principal, 
      titulo_principal: doc?.titulo_principal
    })   
    //CARGA LA IMAGEN PRINCIPAL
    const docRef2 = ref(firebase_storage,'/Empresa/Principal/imagen_principal')
    await getDownloadURL(docRef2).then((url)=> setMainImage(url))
  })()
}, [globalStateMainSection])

  return (
    <>      
      <div className="container-sm" id="about-container">  
        <UpdateMainSectionModal             
            image_principal_url= {head.image_principal_url}
            subtitulo_principal= {head.subtitulo_principal}
            titulo_principal= {head.titulo_principal}          
            globalStateFunction1={()=> handleGlobalState1()}
            download_url={mainImage}
          />    
        
    
        <div className="row">                
          <div className="col mb-4">           
          <AddSection 
          globalStateFunction2={()=>handleGlobalState2()}
          />  
          </div>
        </div>
        <div>

        {
          sections.map( (element) => (             
            <AdSection
            key={`element.id'-${element.id}`}
            id = {element.id}
            posicion_id={element.posicion_id}           
            descripcion= {element.descripcion} 
            estado= {element.estado} 
            image_url= {element.image_url}
            subtitulo= {element.subtitulo}
            titulo= {element.titulo}
            download_url={element.download_url}
            globalStateFunction2={()=> handleGlobalState3()}
            />
            ))
        }  
        </div>      
      </div>   
    </>
  )
}
export default About;