import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { createCategory, getAllCategories, updateCategory, deleteCategory } from "../../api/requests";
import { useSelector } from "react-redux";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [title, setTitle] = useState("");

  const { token } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    const res = await getAllCategories();
    setCategories(res.categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCategory) {
      await updateCategory(editingCategory._id, { title }, token);
    } else {
      await createCategory({ title }, token);
    }
    setShowModal(false);
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id, token);
    fetchCategories();
  };

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
                <Button variant="danger" onClick={() => handleDeleteCategory(category._id)}>
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Название</Form.Label>
              <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
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

export default AdminCategories;
