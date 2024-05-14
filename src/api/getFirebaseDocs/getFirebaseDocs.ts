import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import { data_base } from "../../firebase";

export const getFirebaseDocs = async (path: string) => {
  const data = await getDocs(collection(data_base, path));
  const data_list = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data_list;
};

export const getPaginatedDocs = async (
  path: string,
  pageSize: number,
  lastVisible: any = null
) => {
  let dataQuery;
  if (lastVisible) {
    dataQuery = query(
      collection(data_base, path),
      limit(pageSize),
      startAfter(lastVisible)
    );
  } else {
    dataQuery = query(collection(data_base, path), limit(pageSize));
  }
  const data = await getDocs(dataQuery);
  const dataList = data.docs.map((doc) => ({ ...doc.data() }));
  const newLastVisible = data.docs[data.docs.length - 1]; // Snapshot of the last document

  return { dataList, newLastVisible };
};
