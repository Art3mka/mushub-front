import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import LikeButton from "./LikeButton";
import CommentsSection from "./CommentsSection";
import AddToPlaylist from "./AddToPlaylist";

const MediaPlayer = () => {
  const { mediaId } = useParams();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/media/${mediaId}`);
        setMedia(res.data);
      } catch (err) {
        setError(err.response?.data?.error || "Ошибка загрузки");
      }
    };
    fetchMedia();
  }, [mediaId]);

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
      <div className="mt-4">
        <LikeButton
          mediaId={media._id}
          initialLikes={media.likes}
          // initialLiked={/* Проверяем, лайкнул ли текущий пользователь */}
          initialLiked={false}
        />
        <AddToPlaylist mediaId={media._id} />
        <CommentsSection mediaId={media._id} />
      </div>
    </div>
  );
};

export default MediaPlayer;
