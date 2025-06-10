import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Spinner } from "react-bootstrap";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../../api/requests";
import { useSelector } from "react-redux";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res.categories);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleClose = () => {
    setIsShow(false);
  };

  const handleShow = (categoryId) => {
    setCategoryId(categoryId);
    setIsShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      if (editingCategory) {
        await updateCategory(editingCategory._id, { title }, token);
      } else {
        await createCategory({ title }, token);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsPending(false);
      setShowModal(false);
      fetchCategories();
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      setIsPending(true);
      await deleteCategory(id, token);
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsPending(false);
      setIsShow(false);
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <Button
        onClick={() => {
          setEditingCategory(null);
          setTitle("");
          setShowModal(true);
        }}
      >
        Добавить категорию
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Название</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              <td>{category.title}</td>
              <td className="d-flex justify-content-evenly">
                <Button
                  variant="warning"
                  onClick={() => {
                    setEditingCategory(category);
                    setTitle(category.title);
                    setShowModal(true);
                  }}
                >
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleShow(category._id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCategory ? "Редактировать" : "Добавить"} категорию</Modal.Title>
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
          <Button disabled={isPending} variant="success" onClick={() => handleDeleteCategory(categoryId)}>
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

export default AdminCategories;
