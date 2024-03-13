import { collection, getDocs } from "firebase/firestore";
import { data_base } from "../../firebase";

export const getFirebaseDocs = async (path: string) => {

    const data = await getDocs(collection(data_base, path));
    const data_list = data.docs.map( (doc) => ({...doc.data(), id: doc.id}))
    //console.log(data_list)
    return  data_list
}

