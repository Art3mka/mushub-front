import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Dropdown } from "react-bootstrap";
import axios from "axios";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:8000/api/users");
    setUsers(res.data.users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await axios.put(`http://localhost:8000/api/users/update/${editingUser._id}`, { name, role });
    }
    setShowModal(false);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/api/users/delete/${id}`);
    fetchUsers();
  };

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
                <Button variant="danger" onClick={() => deleteUser(user._id)}>
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminUsers;
