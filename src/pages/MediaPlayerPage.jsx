import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { getMediaById } from "../api/requests";

import usePlayLimit from "../hooks/usePlayLimit";

import LikeButton from "../components/LikeButton";
import CommentsSection from "../components/CommentsSection";
import AddToPlaylist from "../components/AddToPlaylist";

const MediaPlayerPage = () => {
  const { checkPlayLimit } = usePlayLimit();
  const { mediaId } = useParams();
  const [media, setMedia] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await getMediaById(mediaId);
        setMedia(res);
      } catch (err) {
        setError(err.response?.data?.error || "Ошибка загрузки");
      }
    };
    fetchMedia();
    checkPlayLimit();
  }, [mediaId]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!media)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
      </div>
    );

  return (
    <div>
      <h2>
        {media.title} - {media.authorId.name}
      </h2>
      <p>
        Категория: <strong>{media.categoryId.title}</strong>
      </p>
      <p>Прослушиваний: {media.listens}</p>

      <div className="player-wrapper">
        <audio controls crossOrigin="anonymous" className="w-100">
          <source src={`http://localhost:8000/media/${media.filename}`} type={media.mimetype} />
        </audio>
      </div>
      <div className="mt-4">
        <LikeButton className="mb-3" mediaId={media._id} initialLikes={media.likes} />
        <AddToPlaylist className="mb-2" mediaId={media._id} />
        <CommentsSection mediaId={media._id} />
      </div>
    </div>
  );
};

export default MediaPlayerPage;
