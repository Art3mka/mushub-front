import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Dropdown, Spinner } from "react-bootstrap";
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
  const [isShow, setIsShow] = useState(false);
  const [mediaId, setMediaId] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const fetchMedias = async () => {
    try {
      const res = await getAllMedia();
      console.log(res);
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

  const handleClose = () => {
    setIsShow(false);
  };

  const handleShow = (mediaId) => {
    setMediaId(mediaId);
    setIsShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      if (editingMedia) {
        const res = await updateMedia(editingMedia._id, { title, categoryId }, token);
        console.log(res);
        setMedias((prev) =>
          prev.map((media) => (media._id.toString() === res.updatedMedia._id.toString() ? res.updatedMedia : media))
        );
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsPending(false);
      setShowModal(false);
      // fetchMedias();
    }
  };

  const handleDeleteMedia = async (id) => {
    try {
      setIsPending(true);
      await deleteMedia(id, token);
      setMedias((prev) => prev.filter((media) => media._id !== id));
      // fetchMedias();
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsPending(false);
      setIsShow(false);
      // fetchMedias();
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
                    setCategoryId(media.categoryId?._id);
                    setCategoryTitle(media.categoryId?.title);
                    setShowModal(true);
                  }}
                >
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleShow(media._id)}>
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
          {isPending ? (
            <div className="d-flex justify-content-center">
              <Spinner variant="warning" animation="border" />
            </div>
          ) : (
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
          )}
        </Modal.Body>
      </Modal>

      <Modal show={isShow} onHide={handleClose} style={{ marginTop: "40px" }}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {isPending ? (
            <div className="d-flex justify-content-center">
              <Spinner variant="warning" animation="border" />
            </div>
          ) : (
            "Вы уверены, что хотите удалить?"
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-space-between">
          <Button disabled={isPending} variant="success" onClick={() => handleDeleteMedia(mediaId)}>
            Да
          </Button>
          <Button disabled={isPending} variant="danger" onClick={handleClose}>
            Отмена
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminMedia;
