import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import { deleteMedia } from "../api/requests";
import { useSelector } from "react-redux";

const UserMediaList = ({ media, onDelete }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const handleDelete = async (trackId) => {
    try {
      setLoadingId(trackId);
      setError(null);
      await deleteMedia(trackId, token);

      onDelete(trackId); // Обновляем состояние в родительском компоненте
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка удаления");
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = async (trackId) => {
    try {
      console.log("edit");
      navigate(`/edit/${trackId}`);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка редактирования");
    }
  };

  return (
    <div className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {media.map((track) => (
          <div key={track._id} className="col">
            <Card className="h-100">
              <Card.Body>
                {/* <Link to={`/media/${track._id}`}> */}
                <Card.Title className="fs-3 text-decoration-none" as={Link} to={`/media/${track._id}`}>
                  {" "}
                  {track.title}
                </Card.Title>
                {/* </Link> */}
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(track._id)}
                  disabled={loadingId === track._id}
                >
                  {loadingId === track._id ? (
                    <>
                      <Spinner animation="border" size="sm" /> Удаление...
                    </>
                  ) : (
                    "Удалить"
                  )}
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  onClick={() => handleEdit(track._id)}
                  disabled={loadingId === track._id}
                >
                  {loadingId === track._id ? (
                    <>
                      <Spinner animation="border" size="sm" /> Редактирование
                    </>
                  ) : (
                    "Редактировать"
                  )}
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaList;
