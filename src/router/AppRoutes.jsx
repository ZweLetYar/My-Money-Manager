import Layout from "../layout/Layout";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import SignupForm from "../pages/SignupForm";
import DailyDetails from "../pages/DailyDetails";
import Statistics from "../pages/Statistics";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRoutes() {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={!!user ? <Home /> : <LoginForm />} />
        <Route path="/login" element={!user ? <LoginForm /> : <Home />} />
        <Route path="/signup" element={!user ? <SignupForm /> : <Home />} />
        <Route
          path="/dailydetails"
          element={!!user ? <DailyDetails /> : <LoginForm />}
        />
        <Route
          path="/statistics"
          element={!!user ? <Statistics /> : <LoginForm />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}
