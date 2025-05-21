import { useState, useEffect } from "react";
import { Form, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllComments, postComment } from "../api/requests";

const CommentsSection = ({ mediaId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { isAuthenticated, username, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getAllComments(mediaId);
        setComments(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [mediaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postComment(mediaId, { text }, token);
      setComments([res, ...comments]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Комментарии ({comments.length})</h4>
      <Form onSubmit={handleSubmit}>
        {isAuthenticated ? (
          <div>
            <Form.Control
              as="textarea"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ваш комментарий"
              required
            />
            <Button type="submit" className="mt-2">
              Отправить
            </Button>
          </div>
        ) : (
          <h2>Войдите в свой аккаунт!</h2>
        )}
      </Form>
      <ListGroup className="mt-3">
        {comments.map((comment) => (
          <ListGroup.Item key={comment._id}>
            <strong>{comment.userId.name ? comment.userId.name : username}</strong>: {comment.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default CommentsSection;
