import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";


const HomePage = () => {
  const [videos, setVideos] = useState<IVideo[]>([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try{
        const data = await apiClient.getVideos();
        setVideos(data);
      }
      catch(error){
        console.error("Error fetching videos",error);
      }
    }
    fetchVideos();
  },[])
  return (
    <div>
      <h1>ReelsPro</h1>
    </div>
  )
}

export default HomePage