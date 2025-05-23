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

// import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
// import { db } from './firebase';
// import { getDownloadURL } from './storage';
// import { RECEIPTS_ENUM } from '../pages/dashboard';

// const RECEIPTS_COLLECTION='receipts'

// export function addReceipt(uid,date,locationName,address,items,amount,imageBucket){
//     addDoc(collection(db,RECEIPTS_COLLECTION),{uid,date,locationName,address,items,amount,imageBucket})
// }

// export async function getReceipts(uid){
//     const recipts=query(collection(db,RECEIPTS_COLLECTION),where("uid","==",uid),orderBy("date","desc"));
//     const querySnapShot= getDocs(recipts)

//     let allReceipts=[]
//     for(const documentSnapShot of querySnapShot.docs){
//         const receipt=documentSnapShot.data();
//         await addReceipts.push({
//             ...receipt,
//             date:receipt['date'].toDate(),
//             id:documentSnapShot.id,
//             imageUrl:await getDownloadURL(receipt['imageBucket'])
//         })
//     }
//     return allReceipts;
// }

import {
    addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, where
} from 'firebase/firestore';
import { db, storage } from './firebase';
import { getDownloadURL } from './storage';
import { RECEIPTS_ENUM } from '../pages/dashboard';

const RECEIPTS_COLLECTION = 'receipts';

export function addReceipt(uid, date, locationName, address, items, amount, imageBucket) {
    return addDoc(collection(db, RECEIPTS_COLLECTION), {
        uid,
        date,
        locationName,
        address,
        items,
        amount,
        imageBucket: imageBucket || null,  // prevent undefined from being stored
    });
}

export async function getReceipts(uid,setReceipts,setIsLoadingReceipts) {
    const receiptsQuery = query(
        collection(db, RECEIPTS_COLLECTION),
        where("uid", "==", uid),
        orderBy("date", "desc")
    );

    const unsubscribe=onSnapshot(receiptsQuery, async (snapshot) => {
        const querySnapshot = await getDocs(receiptsQuery);

        const allReceipts = [];

        for (const documentSnapShot of querySnapshot.docs) {
            const receipt = documentSnapShot.data();
            let imageUrl = null;

            // Only try to get download URL if imageBucket exists
            if (receipt.imageBucket) {
                try {
                    imageUrl = await getDownloadURL(receipt.imageBucket);
                } catch (error) {
                    console.error("Failed to fetch image URL for receipt:", documentSnapShot.id, error);
                }
            }

            allReceipts.push({
                ...receipt,
                id: documentSnapShot.id,
                date: receipt.date?.toDate?.() || null,
                imageUrl,
            });
        }
        setReceipts(allReceipts);
        setIsLoadingReceipts(false);
    })
    return unsubscribe;

}


export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket) {
    setDoc(doc(db, RECEIPTS_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket })
}

export function deleteReceipt(id){
    deleteDoc(doc(db,RECEIPTS_COLLECTION,id))
}

export function deleteImage(bucket){
    deleteObject(ref(storage,bucket))
}