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

// import { format } from 'date-fns';
// import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { storage } from './firebase';

// const BUCKET_URL="gs://project-cost-tracker-8f62f.firebasestorage.app"

// export async function uploadImage(image,uid){
//     const formattedDate=format(new Date(),"yyyy-MM-dd'T'HH:mm:ss'Z'")
//     const bucket=`${BUCKET_URL}/${uid}/${formattedDate}.jpg`
//     const storageRef=ref(storage,bucket);
//     await uploadBytes(storageRef,image);
//     return bucket;
// }

// storage.js
import { format } from 'date-fns';
import { deleteObject, getDownloadURL as getStorageDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

const BUCKET_URL = "gs://project-cost-tracker-8f62f.firebasestorage.app";

export async function uploadImage(image, uid) {
  const formattedDate = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
  const bucket = `${BUCKET_URL}/${uid}/${formattedDate}.jpg`;
  const storageRef = ref(storage, bucket);
  await uploadBytes(storageRef, image);
  return bucket;
}

export async function getDownloadURL(bucket){
  return await getStorageDownloadURL(ref(storage,bucket));
}

export async function replaceImage(image,bucket) {
  await uploadBytes(ref(storage,bucket),image);
}

// // Add other storage functions if needed
// export async function replaceImage() {
//   // implementation
// }