import React from "react";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
}
