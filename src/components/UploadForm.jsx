import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const UploadForm = () => {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (mediaId) {
      const fetchTrack = async () => {
        try {
          const res = await axios.get(`http://localhost:8000/api/media/${mediaId}`);
          setFormData({
            title: res.data.title,
          });
          setIsEditing(true);
        } catch (err) {
          navigate("/upload");
        }
      };
      fetchTrack();
    }
  }, [mediaId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);

      if (isEditing) {
        await axios.put(`http://localhost:8000/api/media/${mediaId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        navigate("/profile");
      } else {
        data.append("music", file);

        await axios.post("http://localhost:8000/api/media/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        alert("Файл успешно загружен!");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        {!isEditing ? (
          <div>
            <Form.Label>Файл</Form.Label>
            <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} required />
          </div>
        ) : (
          <></>
        )}
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
      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" variant="warning" /> : !isEditing ? "Загрузить" : "Обновить"}
      </Button>
    </Form>
  );
};

export default UploadForm;
