import { useState,useEffect } from "react";
import { uploadFirebaseImage } from "../../utils/uploadFirebaseImages/uploadFirebaseImages";
import { getFirebaseDoc } from "../../utils/getFirebaseDoc/getFirebaseDoc";
import { updateFirebaseDoc } from "../../utils/updateFirebaseDoc/updateFirebaseDoc";
//import { doc, getDoc } from 'firebase/firestore'
//import { db } from '../../firebase'

export const About = () => {
  
  // const textValue = data
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [state, setState] = useState(false)
  useEffect(() => {
    (async () => {
      const docSnap = await getFirebaseDoc('/Home/8Yl9xbZuRNFTUItTEKGU');
      console.log(docSnap);
      setTitle(docSnap?.titulo)
      setDescription(docSnap?.descripcion)
    })()
  }, [])

  useEffect(() => {    
    (async ()=> {
      const data = {
        descripcion: description,
        image_url: 'AboutImage/',
        titulo: title
      }
      await updateFirebaseDoc('/Home/8Yl9xbZuRNFTUItTEKGU',data)
    })()
  }, [state])
  
  
  return (
    <>
    <input name="title" type="text" value={title} onChange={(event) => {setTitle(event.target.value)} }/>
    <input name='description' type="text"  value={description} onChange={(event)=> {setDescription(event.target.value)}}/>
    <input name='uploadImage' type="file" onChange={ (event) => uploadFirebaseImage(event.target.files![0], "AboutImage/image1")}/>
    <button onClick={ () => setState(true) }>Guardar cambios</button>
    </>
  )
}
export default About;