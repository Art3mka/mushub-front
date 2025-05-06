import { useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const LikeButton = ({ mediaId, initialLikes, initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/media/like/${mediaId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLiked(res.data.liked);
      setLikes((prev) => (res.data.liked ? prev + 1 : prev - 1));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Button variant={liked ? "primary" : "outline-primary"} onClick={handleLike}>
      ❤️ {likes}
    </Button>
  );
};

export default LikeButton;
