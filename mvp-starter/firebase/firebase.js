/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCI-LRvis3xp4w2kF0iDQigK37p2bufmC8",
  authDomain: "project-cost-tracker-8f62f.firebaseapp.com",
  projectId: "project-cost-tracker-8f62f",
  storageBucket: "project-cost-tracker-8f62f.firebasestorage.app",
  messagingSenderId: "258781630130",
  appId: "1:258781630130:web:6309413061538b964bc3ab",
  measurementId: "G-5PK7E6NW9S"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore();
export const storage=getStorage();



// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyCI-LRvis3xp4w2kF0iDQigK37p2bufmC8",
//   authDomain: "project-cost-tracker-8f62f.firebaseapp.com",
//   projectId: "project-cost-tracker-8f62f",
//   storageBucket: "project-cost-tracker-8f62f.appspot.com",
//   messagingSenderId: "258781630130",
//   appId: "1:258781630130:web:6309413061538b964bc3ab",
//   measurementId: "G-5PK7E6NW9S"
// };

// // ✅ Prevent duplicate initialization
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const auth = firebase.auth();

// export { auth, firebase };
