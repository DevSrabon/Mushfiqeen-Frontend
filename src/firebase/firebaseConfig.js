import { getApps, initializeApp } from "firebase/app";
import "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5Kf25M9k5HoPDQkIHDgPIj_VCh4X5mbA",
  authDomain: "mushfiqeen-60da9.firebaseapp.com",
  projectId: "mushfiqeen-60da9",
  storageBucket: "mushfiqeen-60da9.appspot.com",
  messagingSenderId: "1022605312689",
  appId: "1:1022605312689:web:057a90bdb1acbcbff75890",
  measurementId: "G-RTPTMK7X4M",
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// image upload
const listFiles = async () => {
  const storage = getStorage();

  // Create a reference under the list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};

/**
 *
 * @param {*} uri
 * @param {*} name
 */
const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export { db, listFiles, uploadToFirebase };
