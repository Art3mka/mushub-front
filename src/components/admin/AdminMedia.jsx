import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Dropdown } from "react-bootstrap";
import { getAllMedia, getAllCategories, updateMedia, deleteMedia } from "../../api/requests";
import { useSelector } from "react-redux";

const AdminMedia = () => {
  const [medias, setMedias] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMedia, setEditingMedia] = useState(null);
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [error, setError] = useState("");

  const { token } = useSelector((state) => state.auth);

  const fetchMedias = async () => {
    try {
      const res = await getAllMedia();
      setMedias(res);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.categories);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  useEffect(() => {
    fetchMedias();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMedia) {
        await updateMedia(editingMedia._id, { title, categoryId }, token);
      }
      setShowModal(false);
      fetchMedias();
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  const handleDeleteMedia = async (id) => {
    try {
      await deleteMedia(id, token);
      fetchMedias();
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

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
                <Button variant="danger" onClick={() => handleDeleteMedia(media._id)}>
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
                <Dropdown.Menu style={{ maxHeight: "200px", overflowY: "auto" }}>
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
