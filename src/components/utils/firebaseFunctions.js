import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { firestore } from '../../firebase.config';

//Saving new items
export const saveNewItem = async (data) => {
  await setDoc(doc(firestore, 'menuItems', `${Date.now()}`), data, {
    merge: true,
  });
};

//Get Menu items
export const getMenuItems = async () => {
  const items = await getDocs(
    query(collection(firestore, 'menuItems'), orderBy('id', 'desc'))
  );

  return items.docs.map((doc) => doc._document.data.value.mapValue.fields);
};
