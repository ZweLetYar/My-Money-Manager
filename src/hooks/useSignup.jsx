import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase";

export default function useSignup() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  let SignUp = async (email, password) => {
    try {
      setLoading(true);
      let res = await createUserWithEmailAndPassword(auth, email, password);
      setError("");
      setLoading(false);

      return { success: true, user: res.user };
    } catch (e) {
      setLoading(false);
      setError(e.message);
      return { success: false, error: e.message };
    }
  };

  return { error, loading, SignUp };
}
