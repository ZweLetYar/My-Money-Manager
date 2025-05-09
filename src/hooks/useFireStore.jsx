import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../Firebase";

export default function useFireStore() {
  let getCollection = (collectionName, _q) => {
    let qRef = useRef(_q).current;
    let [error, setError] = useState("");
    let [loading, setLoading] = useState(false);
    let [data, setData] = useState([]);

    useEffect(
      function () {
        setLoading(true);
        let ref = collection(db, collectionName);

        let queires = [];
        if (qRef) {
          queires.push(where(...qRef));
        }
        queires.push(orderBy("date", "desc"));
        let q = query(ref, ...queires);
        onSnapshot(q, (docs) => {
          if (docs.empty) {
            setError("No Result Found!");
            setData([]);
          } else {
            let collectionDatas = [];
            docs.forEach((doc) => {
              let document = { id: doc.id, ...doc.data() };
              collectionDatas.push(document);
            });
            setData(collectionDatas);
            setLoading(false);
            setError("");
          }
        });
      },
      [qRef]
    );

    return { error, loading, data };
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
