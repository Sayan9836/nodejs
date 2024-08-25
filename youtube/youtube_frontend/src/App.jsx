import React, { lazy, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/Login/Login"));
const Home = lazy(() => import("./pages/Home"));
const Subscription = lazy(() => import("./pages/subscription/Subscription"));
const DashBoard = lazy(() => import("./pages/channel_dashboard/DashBoard"));
const Video = lazy(() => import("./pages/video/Video"));
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signIn" element={<Register />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/:username/playlists" element={<DashBoard />} />
        <Route path="/video/:id" element={<Video />} />
        {/* <Route path="/:playListId" element={<Home />} /> */}
      </Routes>
    </>
  );
}

export default App;
