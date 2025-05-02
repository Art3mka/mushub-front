import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const MediaPlayer = () => {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/media/${id}`);
        setMedia(res.data);
        console.log(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Ошибка загрузки");
      }
    };
    fetchMedia();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!media) return <div>Загрузка...</div>;

  return (
    <div>
      <h2>{media.title}</h2>
      <p>Автор: {media.authorId?.name}</p>
      <p>Прослушиваний: {media.listens}</p>

      <div className="player-wrapper">
        {media.mimetype.startsWith("video/") ? (
          <ReactPlayer url={`http://localhost:8000/media/${media.filename}`} controls width="100%" height="auto" />
        ) : (
          <audio controls crossOrigin="anonymous">
            <source src={`http://localhost:8000/media/${media.filename}`} type={media.mimetype} />
          </audio>
        )}
      </div>
    </div>
  );
};

export default MediaPlayer;
