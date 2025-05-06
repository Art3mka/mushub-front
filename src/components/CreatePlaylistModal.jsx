import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const CreatePlaylistModal = ({ show, onHide }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/playlists/",
        {
          name,
          description,
          isPublic,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(res);
      onHide();
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
