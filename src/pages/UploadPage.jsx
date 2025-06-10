import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner, Dropdown } from "react-bootstrap";
import { getAllCategories, getMediaById, updateMedia, postMedia } from "../api/requests";
import { useSelector } from "react-redux";

const UploadPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    categoryId: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { mediaId } = useParams();

  const navigate = useNavigate();

  const { token, username } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.categories);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (mediaId) {
      const fetchTrack = async () => {
        try {
          const res = await getMediaById(mediaId);

          setFormData({
            title: res.title,
            categoryId: res.categoryId._id,
          });
          setIsEditing(true);
          setIsLoading(false);
        } catch (err) {
          navigate("/upload");
        }
      };
      fetchTrack();
    }
    fetchData();
  }, [mediaId, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("categoryId", formData.categoryId);
      data.append("authorName", username);

      if (isEditing) {
        await updateMedia(mediaId, data, token);
        navigate("/profile", { state: { modalData: { message: "Успешно обновлено.", variant: "success" } } });
      } else {
        data.append("music", file);
        await postMedia(data, token);
        navigate("/profile", { state: { modalData: { message: "Успешно добавлено.", variant: "success" } } });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Ошибка загрузки");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    if (!file) return;

    const fileType = file.type;
    console.log(fileType);
    if (fileType !== "audio/mpeg") {
      setError("Неподдерживаемый файл.");
      return;
    } else {
      setError("");
      setFile(file);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Название</Form.Label>
        <Form.Control
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </Form.Group>
      <Dropdown className="mb-4">
        <Dropdown.Toggle variant="primary">
          {formData.categoryId
            ? `Категория: ${categories.find((c) => c._id === formData.categoryId)?.title}`
            : "Все категории"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setFormData({ ...formData, categoryId: null })}>Все категории</Dropdown.Item>
          {categories.map((category) => (
            <Dropdown.Item
              key={category._id}
              onClick={() => {
                setFormData({ ...formData, categoryId: category._id });
                console.log(formData);
              }}
            >
              {category.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <Form.Group>
        {!isEditing ? (
          <div>
            <Form.Label>Файл</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileUpload(e.target.files[0])} required />
          </div>
        ) : (
          <></>
        )}
      </Form.Group>
      <Button className="mt-3" type="submit" disabled={isLoading || error}>
        {isLoading ? <Spinner size="sm" variant="warning" /> : !isEditing ? "Загрузить" : "Обновить"}
      </Button>
    </Form>
  );
};

export default UploadPage;
