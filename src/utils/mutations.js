import { addDoc, collection, setDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from './firebase';

//const functions = require('firebase-functions');

// Functions for database mutations

export const emptyEntry = {
   name: "",
   link: "",
   description: "",
   user: "",
   category: 0,
   clicks: 0
}

export async function addEntry(entry) {
   await addDoc(collection(db, "entries"), {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      user: entry.user,
      category: entry.category,
      // The ID of the current user is logged with the new entry for database user-access functionality.
      // You should not remove this userid property, otherwise your logged entries will not display.
      userid: entry.userid,
      clicks: 0
   });
}

export async function updateEntry(entry) {

   // Mutation to Edit Entry

   // console.log(entry.name);
   // console.log(entry.id);

   // setDoc() updates the firestore doc corresponding to the entry ID
   // with the following fields
   await setDoc(doc(db, "entries", entry.id), {
      name: entry.name,
      link: entry.link,
      description: entry.description,
      user: entry.user,
      category: entry.category,
      // The ID of the current user is logged with the new entry for database user-access functionality.
      // You should not remove this userid property, otherwise your logged entries will not display.
      userid: entry.userid, 
      clicks: entry.clicks
   });
}

export async function deleteEntry(entry) {
   // Mutation to Delete Entry
   await deleteDoc(doc(db, "entries", entry.id));
}

// export async function sortEntry(entry)
// {
//    const q = entry.userid ? query(collection(db, "entries"), where("userid", "==", entry.userid), orderBy("name")) : collection(db, "entries");

//    onSnapshot(q, (snapshot) => {
//          // Set Entries state variable to the current snapshot
//          // For each entry, appends the document ID as an object property along with the existing document data
//       setEntries(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
//    });
// }
