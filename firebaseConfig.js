// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuidv4 } from 'uuid';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHXrs3K54AYpg5CD_Ctw2f0wecRTDJWJg",
  authDomain: "luminary-3eee5.firebaseapp.com",
  projectId: "luminary-3eee5",
  storageBucket: "luminary-3eee5.appspot.com",
  messagingSenderId: "859224782856",
  appId: "1:859224782856:web:3b71f01555c60b9756f9bd",
  measurementId: "G-D21KXVW3RJ"
};

// Initialize Firebase
if(getApps().length === 0){
const app = initializeApp(firebaseConfig)
}



export async function uploadVideoAsync(uri) {
  console.log("Starting uploadVideoAsync with URI:", uri);
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      resolve(xhr.response);
    };
    xhr.onerror = function(e) {
      console.log(e);
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), `videos/${uuidv4()}.mp4`);
  await uploadBytes(fileRef, blob);
  blob.close();
  return getDownloadURL(fileRef);
}