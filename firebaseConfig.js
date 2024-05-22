import { initializeApp, getApps } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import "react-native-get-random-values";

import { 
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID
} from '@env'; 

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export async function uploadVideoAsync(uri) {
  console.log("Starting uploadVideoAsync with URI:", uri);

  try {
    // Fetch the video data as a Blob
    const response = await fetch(uri);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const blob = await response.blob();

    // Create a reference to the file in Firebase Storage
    const fileRef = ref(getStorage(), `videos/${uuidv4()}.mp4`);

    // Upload the Blob to Firebase Storage in chunks
    const uploadTask = uploadBytesResumable(fileRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', 
        (snapshot) => {
          // Progress callback (optional)
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
          // Error callback
          console.error('Error uploading video:', error);
          reject(error);
        }, 
        async () => {
          // Success callback
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error('Error getting download URL:', error);
            reject(error);
          }
        }
      );
    });

  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}
