import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../views/home";
import Login from "../views/login";

function indexRoute() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Home />} />
    </Routes>
  );
}

export default indexRoute;
