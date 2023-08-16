import * as Crypto from "expo-crypto";
import { getApps, initializeApp } from "firebase/app";
// import "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";

import {
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytes,
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

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

// image upload

const uploadToFirebase = async (uri) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const uuid = Crypto.randomUUID();

  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), `images/${uuid}`);
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
};

export { db, uploadToFirebase };
