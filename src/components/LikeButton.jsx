import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const LikeButton = ({ className, mediaId, initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const { token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/media/${mediaId}/check-like`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLiked(res.data.liked);
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
      const res = await axios.post(
        `http://localhost:8000/api/media/like/${mediaId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLiked(res.data.liked);
      setLikes((prev) => (res.data.liked ? prev + 1 : prev - 1));
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
