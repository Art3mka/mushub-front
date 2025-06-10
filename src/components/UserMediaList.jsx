import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Alert, Spinner, Modal } from "react-bootstrap";
import { deleteMedia } from "../api/requests";
import { useSelector } from "react-redux";

const UserMediaList = ({ media, onDelete }) => {
  const [mediaId, setMediaId] = useState(null);
  const [error, setError] = useState(null);
  const [isShow, setIsShow] = useState(false);

  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const handleClose = () => {
    setIsShow(false);
  };

  const handleShow = (mediaId) => {
    setMediaId(mediaId);
    setIsShow(true);
  };

  const handleDelete = async (trackId) => {
    try {
      setError(null);
      await deleteMedia(trackId, token);

      onDelete(trackId); // Обновляем состояние в родительском компоненте
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка удаления");
    } finally {
      setIsShow(false);
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
                <Card.Title className="fs-3 text-decoration-none" as={Link} to={`/media/${track._id}`}>
                  {" "}
                  {track.title}
                </Card.Title>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="outline-danger" size="sm" onClick={() => handleShow(track._id)}>
                  Удалить
                </Button>
                <Button variant="outline-warning" size="sm" onClick={() => handleEdit(track._id)}>
                  Редактировать
                </Button>
              </Card.Footer>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={isShow} onHide={handleClose} style={{ marginTop: "40px" }}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить?</Modal.Body>
        <Modal.Footer className="justify-content-space-between">
          <Button variant="success" onClick={() => handleDelete(mediaId)}>
            Да
          </Button>
          <Button variant="danger" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserMediaList;
