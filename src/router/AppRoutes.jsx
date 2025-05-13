import Layout from "../layout/Layout";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/LoginForm";
import SignupForm from "../pages/SignupForm";
import DailyDetails from "../pages/DailyDetails";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dailydetails" element={<DailyDetails />} />
      </Routes>
    </Layout>
  );
}
