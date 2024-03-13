import { useState,useEffect } from "react";
//import './About.css'
import { getFirebaseDoc } from "../../api/getFirebaseDoc/getFirebaseDoc";
import { UpdateMainSectionModal } from "./components/UpdateMainSectionModal";
import { AdSection } from './components/AdSection';
import { AddSection } from './components/AddSection';
import { getFirebaseDocs } from "../../api/getFirebaseDocs/getFirebaseDocs";
import { headData, sectionsData } from "./components/about.interface";



import { getDownloadURL, ref, listAll } from "firebase/storage";
import { firebase_storage } from '../../firebase'

                 


export const About = () => {

const [sections, setSections] = useState<sectionsData[]>([])
const [head, setHead] = useState<headData>({ image_principal_url: '',subtitulo_principal: '',titulo_principal: ''})
const [imageList, setImageList] = useState<string[]>([])
const [mainImage, setMainImage] = useState('')
const imagesList = sections.map( (evt) => { return  evt.image_url });
// const downloadList = sections.map( (element)=>)
useEffect(() => {
  (async()=>{
    const doc = await getFirebaseDoc('/Empresa/ZktZQqsBnqVVoL4dfRHv')
    const doc2 = await getFirebaseDocs('/Empresa/ZktZQqsBnqVVoL4dfRHv/secciones')
    setSections(doc2 as sectionsData[])
    setHead({image_principal_url: doc?.image_principal_url, subtitulo_principal: doc?.subtitulo_principal, titulo_principal: doc?.titulo_principal})     
    const docRef = ref(firebase_storage, '/Empresa/Secciones')
    await listAll(docRef)
    //console.log(listAllaux)
    await listAll(docRef).then((resp)=> {resp.items.forEach((items)=>{
      getDownloadURL(items).then((url)=> setImageList((prev)=>[...prev,url]))       
    })})
  })()

}, [])

useEffect(() => {
  (async()=>{
    const docRef2 = ref(firebase_storage,'/Empresa/Principal/imagen_principal')
    console.log(docRef2)
    const res = await getDownloadURL(docRef2).then((url)=> setMainImage(url))
    console.log(res,'mainimage')
  })()
}, [])

  return (
    <>      
      <div className="container-fluid" id="about-container">  
        <UpdateMainSectionModal             
            image_principal_url= {head.image_principal_url}
            subtitulo_principal= {head.subtitulo_principal}
            titulo_principal= {head.titulo_principal}
            download_url={mainImage}
          />    
        
    
        <div className="row">                
          <div className="col mb-4">           
          <AddSection {...imagesList}/>  
          </div>
        </div>
        <div>

        {
          sections.map( (element,index) => ( 
            <AdSection
            key={`element.id${index}`}
            id = {element.id}
            posicion_id={element.posicion_id}           
            descripcion= {element.descripcion} 
            estado= {element.estado} 
            image_url= {element.image_url}
            subtitulo= {element.subtitulo}
            titulo= {element.titulo}
            download_url={imageList[index]}
            {...imagesList}
            />
          ))
        }  
        </div>      
      </div>    
    </>
  )
}
export default About;