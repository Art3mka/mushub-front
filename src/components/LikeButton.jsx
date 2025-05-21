import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getCheckLike, postToggleLike } from "../api/requests";

const LikeButton = ({ className, mediaId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const res = await getCheckLike(mediaId, token);
        setLiked(res.liked);
      } catch (err) {
        console.error("Ошибка проверки лайка:", err);
      }
    };

    if (isAuthenticated) {
      checkLikeStatus();
    }
  }, [mediaId, isAuthenticated]);

  const handleLike = async () => {
    try {
      const res = await postToggleLike(mediaId, token);
      setLiked(res.liked);
      setLikes((prev) => (res.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Button
      className={className}
      variant={liked ? "primary" : "outline-primary"}
      onClick={handleLike}
      disabled={!isAuthenticated}
    >
      ❤️ {likes}
    </Button>
  );
};

export default LikeButton;
