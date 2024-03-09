import { useState,useEffect } from "react";
import './About.css'
import { uploadFirebaseImage } from "../../utils/uploadFirebaseImages/uploadFirebaseImages";
import { getFirebaseDoc } from "../../utils/getFirebaseDoc/getFirebaseDoc";
import { updateFirebaseDoc } from "../../utils/updateFirebaseDoc/updateFirebaseDoc";
//import { doc, getDoc } from 'firebase/firestore'
//import { db } from '../../firebase'

export const About = () => {
  
  // const textValue = data
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [fileImage, setFileImage] = useState<File>()

  const [state1, setState1] = useState(false)
  const [state2, setState2] = useState(false)
  useEffect(() => {
    (async () => {
      const docSnap = await getFirebaseDoc('/Home/8Yl9xbZuRNFTUItTEKGU');
      console.log(docSnap);
      setTitle(docSnap?.titulo)
      setDescription(docSnap?.descripcion)
    })()
  }, [])

  useEffect(() => {    
    if(state1){
      (async ()=> {
        if(fileImage != null){
          await uploadFirebaseImage(fileImage, "AboutImage/image1")
        }
        const data = {
          descripcion: description,
          image_url: 'AboutImage/',
          titulo: title
        }
        await updateFirebaseDoc('/Home/8Yl9xbZuRNFTUItTEKGU',data);

        setState1(false);
        setState2(false)
      })()
    }

  }, [state1])
  
  
  return (
    <>
    <div className="container-about">

      <section>
        {/* <input  id="title" name="title" type={inputType} value={title} onChange={(event) => {setTitle(event.target.value)} }/>
        <input id='description' name='description' type="messageBox"  value={description} onChange={(event)=> {setDescription(event.target.value)}}/> */}
        <label htmlFor="title">Título</label>
        <textarea id="title" name="title"  disabled={!state2} value={title} onChange={(event) => {setTitle(event.target.value)}}/>
        <label htmlFor="description">Descripción</label>
        <textarea id='description' name='description' disabled={!state2}  value={description} onChange={(event)=> {setDescription(event.target.value)}}/>        
        <br/>
        <label htmlFor="uploadImage">Subir imagen</label>
        <input id="uploadImage"  name='uploadImage'  className="form-control" disabled={!state2} type="file" onChange={ (event) => setFileImage(event.target.files![0])}  />
        <br/>
        { state2 == false ?          
        <button  id="editButton" disabled={state2} onClick={ () => setState2(true) }>Editar</button>
        :
        <button  id="saveButton" disabled={!state2} onClick={ () => setState1(true) }>Guardar cambios</button>
        }
      </section> 
    </div>    




    </>
  )
}
export default About;