import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminMedia = () => {
  const [medias, setMedias] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");

  const { token } = useSelector((state) => state.auth);

  const fetchMedias = async () => {
    const res = await axios.get("http://localhost:8000/api/media");
    setMedias(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8000/api/category");
    setCategories(res.data.categories);
  };

  useEffect(() => {
    fetchMedias();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingMedia) {
      await axios.put(
        `http://localhost:8000/api/media/${editingMedia._id}`,
        { title, categoryId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
    setShowModal(false);
    fetchMedias();
  };

  const deleteMedia = async (id) => {
    await axios.delete(`http://localhost:8000/api/media/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    fetchMedias();
  };

  return (
    <div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Трек</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((media) => (
            <tr key={media._id}>
              <td>{media.title}</td>
              <td className="d-flex justify-content-evenly">
                <Button
                  variant="warning"
                  onClick={() => {
                    setEditingMedia(media);
                    setTitle(media.title);
                    setCategoryId(media.categoryId._id);
                    setCategoryTitle(media.categoryId.title);
                    setShowModal(true);
                  }}
                >
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => deleteMedia(media._id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingMedia ? "Редактировать" : "Добавить"} трек</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Название</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Категория</Form.Label>

              <Dropdown>
                <Dropdown.Toggle variant="success">
                  {categoryTitle ? categoryTitle : "Выбери категорию"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category._id}
                      onClick={() => {
                        setCategoryId(category._id);
                        setCategoryTitle(category.title);
                      }}
                    >
                      {category.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>
            <Button type="submit" className="mt-3">
              Сохранить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminMedia;
