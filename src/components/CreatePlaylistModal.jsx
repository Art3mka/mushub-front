import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { postPlaylist } from "../api/requests";
import { useSelector } from "react-redux";

const CreatePlaylistModal = ({ show, onHide, onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postPlaylist(
        {
          name,
          description,
          isPublic,
        },
        token
      );
      onHide();
      onSubmit();
      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Создать плейлист</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Описание</Form.Label>
            <Form.Control as="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Form.Check
            type="switch"
            label="Публичный плейлист"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Создать
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreatePlaylistModal;
