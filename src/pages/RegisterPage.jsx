import { useState } from "react";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { register } from "../api/requests";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { message } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка регистрации");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <Card style={{ width: "400px" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Регистрация</h2>
          {message && <Alert variant="danger">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>E-Mail</Form.Label>
              <Form.Control
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" className="w-100 mb-3">
              Зарегистрироваться
            </Button>

            <div className="text-center">
              <small>
                Уже есть аккаунт? <Link to="/login">Войдите</Link>
              </small>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default RegisterPage;
