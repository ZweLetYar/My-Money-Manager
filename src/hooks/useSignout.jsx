import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase";

export default function useSignout() {
  let [error, setError] = useState(null);
  let [loading, setLoading] = useState(false);

  let logOut = async () => {
    try {
      setLoading(true);
      let res = await signOut(auth);
      setError("");
      setLoading(false);
      return { success: true, user: res.user };
    } catch (e) {
      setLoading(false);
      setError(e.message);
      return { success: false, error: e.message };
    }
  };

  return { error, loading, logOut };
}
