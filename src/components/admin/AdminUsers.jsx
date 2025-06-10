import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Dropdown, Spinner } from "react-bootstrap";
import { getAllUsers, updateUser, deleteUser } from "../../api/requests";
import { useSelector } from "react-redux";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(token);
      setUsers(res.users);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClose = () => {
    setIsShow(false);
  };

  const handleShow = (userId) => {
    setUserId(userId);
    setIsShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);
      if (editingUser) {
        await updateUser(editingUser._id, { name, role }, token);
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsPending(false);
      setShowModal(false);
      fetchUsers();
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setIsPending(true);
      await deleteUser(id, token);
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsPending(false);
      setIsShow(false);
      fetchUsers();
    }
  };

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Пользователь</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td className="d-flex justify-content-evenly">
                <Button
                  variant="warning"
                  onClick={() => {
                    setEditingUser(user);
                    setName(user.name);
                    setRole(user.role);
                    setShowModal(true);
                  }}
                >
                  Редактировать
                </Button>
                <Button variant="danger" onClick={() => handleShow(user._id)}>
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser ? "Редактировать" : "Добавить"} пользователя</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isPending ? (
            <div className="d-flex justify-content-center">
              <Spinner variant="warning" animation="border" />
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Имя</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Роль</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="success">{role}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setRole("USER")}>USER</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRole("ADMIN")}>ADMIN</Dropdown.Item>
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
          <Button disabled={isPending} variant="success" onClick={() => handleDeleteUser(userId)}>
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

export default AdminUsers;
