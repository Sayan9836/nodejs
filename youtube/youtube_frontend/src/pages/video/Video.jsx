import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Video = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useEffect(false);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    const fetchVideo = async () => {
      try {
        let res = await fetch(`http://localhost:5000/video/${id}`, { signal });
        if (!res.ok) {
          throw new Error(`Fetching video failed: ${res.message}`);
        }
        res = await res.json();
      } catch (error) {
        toast.error(`${error?.message || "Something went wrong!"}`);
      }
      setIsLoading(false);
    };
    fetchVideo();
    return () => {
      controller.abort();
    };
  }, []);

  return <div>{video.name}</div>;
};

export default Video;

const client = axios.create({
  baseURL: "http://localhost:5000/user",
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
  },
  (error) => {
    Promise.reject(error);
  },
);
