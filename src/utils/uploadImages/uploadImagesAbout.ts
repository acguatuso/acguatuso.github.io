import { firebase_storage } from "../../firebase";
import { ref, uploadBytes } from 'firebase/storage'

export const uploadImage = (file: File ) => {
    const storageRef = ref(firebase_storage, 'AboutImage/image1.jpg')
    //const file = doc[0]
    uploadBytes(storageRef, file)

}