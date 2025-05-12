import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query as fsQuery,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../Firebase";

export default function useFireStore() {
  const getCollection = (collectionName, condition) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!collectionName || !condition) return;

      const colRef = collection(db, collectionName);

      // Allow passing a single condition or an array of conditions
      const conditions = Array.isArray(condition[0])
        ? condition.map((c) => where(...c))
        : [where(...condition)];

      const q = fsQuery(colRef, ...conditions);

      const unsub = onSnapshot(
        q,
        (snapshot) => {
          const results = [];
          snapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setData(results);
          setLoading(false);
        },
        (err) => {
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsub();
    }, [collectionName, JSON.stringify(condition)]);

    return { data, loading, error };
  };

  //.............................
  let getDocument = (collectionName, id) => {
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState(null);

    useEffect(
      function () {
        setLoading(true);
        let ref = doc(db, collectionName, id);

        onSnapshot(ref, (doc) => {
          if (!doc.exists()) {
            setError("No Result Found!");
            setLoading(false);
          } else {
            let document = { id: doc.id, ...doc.data() };

            setData(document);
            setLoading(false);
            setError("");
          }
        });
      },
      [id]
    );

    return { error, loading, data };
  };
  //.............................
  let addCollection = async (collectionName, data) => {
    data.date = serverTimestamp();
    let ref = collection(db, collectionName);
    await addDoc(ref, data);
  };

  //.............................
  let deleteDocument = async (collectionName, id) => {
    let ref = doc(db, collectionName, id);
    return deleteDoc(ref);
  };

  //.............................
  let updateDocument = async (collectionName, id, data) => {
    // data.date = serverTimestamp();
    let ref = doc(db, collectionName, id);
    return updateDoc(ref, data);
  };

  //.............................

  return {
    getCollection,
    getDocument,
    addCollection,
    deleteDocument,
    updateDocument,
  };
}
