import React, { useState } from "react";

import useGoogleAuth from "../hooks/useGoogleAuth"; // <- import hook
import useSignin from "../hooks/useSignin";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const { login, user, error } = useGoogleAuth(); // <- use hook
  const { error: signinError, loading, SignIn } = useSignin();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      let result = await SignIn(email, password);
      if (!result.success) {
        return;
      }
    } catch (err) {
      alert(err.message);
    }

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-teal-100 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div>
            <input
              placeholder="Email"
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              placeholder="Password"
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <h1 className="text-red-500 text-center">{signinError}</h1>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-semibold transition"
          >
            Log In
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-t" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-t" />
        </div>

        <button
          onClick={login}
          className="w-full py-2 flex items-center justify-center border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error.message}</p>}

        <div className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link to={"/signup"} className="text-teal-600 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
