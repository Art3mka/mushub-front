import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Dropdown, Modal, Form, Alert, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getPlaylistById, deleteFromPlaylist, updatePlaylist, deletePlaylist } from "../api/requests";

const MyPlaylistPage = () => {
  const { userId, token } = useSelector((state) => state.auth);
  const { playlistId } = useParams();
  const navigate = useNavigate();
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const res = await getPlaylistById(playlistId, token);
        setPlaylist(res);
        setEditData({
          name: res.name,
          description: res.description,
          isPublic: res.isPublic,
        });
      } catch (err) {
        setError(err.response?.data?.error || "Ошибка загрузки");
      }
    };
    fetchPlaylist();
  }, [playlistId]);

  const handleRemoveTrack = async (mediaId) => {
    try {
      await deleteFromPlaylist(playlistId, mediaId, token);
      setPlaylist((prev) => ({
        ...prev,
        mediaItems: prev.mediaItems.filter((item) => item._id !== mediaId),
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdatePlaylist = async () => {
    try {
      const res = await updatePlaylist(playlistId, editData, token);
      console.log(res);
      setPlaylist(res);
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylist(playlistId, token);
      navigate("/playlists");
    } catch (err) {
      console.error(err);
    }
  };

  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!playlist)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
      </div>
    );

  const isOwner = playlist?.authorId._id === userId;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1>{playlist.name}</h1>
          <p className="text-muted">{playlist.description}</p>
          <small>
            {playlist.isPublic ? "Публичный" : "Приватный"} • {playlist.mediaItems.length} треков
          </small>
        </div>

        {isOwner && (
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">Управление</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setShowEditModal(true)}>Редактировать</Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={() => setShowDeleteConfirm(true)}>
                Удалить плейлист
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>

      <Row>
        {playlist.mediaItems.map((media) => (
          <Col key={media._id} md={6} lg={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{media.title}</Card.Title>
                <div className="d-flex justify-content-between">
                  <Button variant="outline-primary" size="sm" onClick={() => navigate(`/media/${media._id}`)}>
                    Воспроизвести
                  </Button>
                  {isOwner && (
                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveTrack(media._id)}>
                      Удалить
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Модальное окно редактирования */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Редактировать плейлист</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Check
              type="switch"
              label="Публичный плейлист"
              checked={editData.isPublic}
              onChange={(e) => setEditData({ ...editData, isPublic: e.target.checked })}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleUpdatePlaylist}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Подтверждение удаления */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение</Modal.Title>
        </Modal.Header>
        <Modal.Body>Вы уверены, что хотите удалить этот плейлист?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={handleDeletePlaylist}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyPlaylistPage;
