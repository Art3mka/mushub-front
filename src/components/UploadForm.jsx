import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("music", file);
    data.append("title", formData.title);

    try {
      await axios.post("http://localhost:8000/api/media/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Файл успешно загружен!");
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Файл</Form.Label>
        <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </Form.Group>
      {/* Добавьте остальные поля (description, category) */}
      <Button type="submit">Загрузить</Button>
    </Form>
  );
};

export default UploadForm;
