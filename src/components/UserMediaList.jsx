import { useState } from "react";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const UserMediaList = ({ media, onDelete }) => {
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (trackId) => {
    try {
      setLoadingId(trackId);
      setError(null);

      await axios.delete(`http://localhost:8000/api/media/${trackId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      onDelete(trackId); // Обновляем состояние в родительском компоненте
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка удаления");
    } finally {
      setLoadingId(null);
    }
  };

  console.log(media);

  return (
    <div className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {media.map((track) => (
          <div key={track._id} className="col">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{track.title}</Card.Title>
              </Card.Body>
              <Card.Footer>
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
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaList;
