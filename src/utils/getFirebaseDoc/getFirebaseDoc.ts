import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

export const getFirebaseDoc = async (path: string) => {
    //Se realiza la referencia al atributo que se quiere leer
    try{
        const docRef = doc(db,path)
        const docSnap = await getDoc(docRef)
        return docSnap.data()
        //console.log(docSnap.data)
    }catch(error){console.log(error)} 
}