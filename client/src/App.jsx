import axios from "axios";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

const App = () => {
  axios.defaults.baseURL = "https://fin-app-sooty.vercel.app";
  axios.defaults.withCredentials = true;
  // http://localhost:3000

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </BrowserRouter>
  );
};

export default App;
