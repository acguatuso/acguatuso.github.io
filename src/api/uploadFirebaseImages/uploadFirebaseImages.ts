import { firebase_storage } from "../../firebase";
import { ref, uploadBytes } from 'firebase/storage'

export const uploadFirebaseImage = async (file: File, path: string) => {
    const storageRef = ref(firebase_storage, path)
    try{
        await uploadBytes(storageRef, file)
        console.log('Imagen subida',storageRef.fullPath)
    }catch(error){console.log(error)};
    
}