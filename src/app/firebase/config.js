// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8FwvD49JfPsC4NdENoyEarp70Sg9odcc",
  authDomain: "postsavatars.firebaseapp.com",
  projectId: "postsavatars",
  storageBucket: "postsavatars.appspot.com",
  messagingSenderId: "538282896226",
  appId: "1:538282896226:web:40a19e11394f35bf7fda3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export async function uploadFile(file) {
  const storageRef = ref(storage, "avatars/" + v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}
