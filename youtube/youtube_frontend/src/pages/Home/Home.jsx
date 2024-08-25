import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
const Home = () => {
  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("cookies", document.cookie);

    if (!user) {
      navigate("/login");
    }

    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/v1/videos", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const videos = response.data.docs;
      setVideos(videos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="home_wrapper">
      <Header />
      <div className="main">
        <SideBar />
        <div className="videos_wrapper">
          {videos?.map((video) => (
            <Card video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
