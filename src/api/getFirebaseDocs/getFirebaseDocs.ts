import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { data_base } from "../../firebase";

export const getFirebaseDocs = async (path: string) => {
  const data = await getDocs(collection(data_base, path));
  const data_list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data_list;
};

export const getPaginatedDocs = async (path: string, pageSize: number, lastVisible?: any) => {
  try {
    let q = query(collection(data_base, path), orderBy("nombre"), limit(pageSize));

    if (lastVisible) {
      q = query(collection(data_base, path), orderBy("nombre"), startAfter(lastVisible), limit(pageSize));
    }

    const data = await getDocs(q);
    const lastDoc = data.docs[data.docs.length - 1] || null;
    const dataList = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    console.log('Fetched documents:', dataList);
    console.log('Last document:', lastDoc);

    return { dataList, lastDoc };
  } catch (error) {
    console.error('Error fetching paginated documents:', error);
    throw error; // Re-throw the error so you can handle it in the calling function
  }
};
