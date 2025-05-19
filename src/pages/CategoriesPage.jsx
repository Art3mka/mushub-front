import { useState, useEffect } from "react";
import { Dropdown, Button, Card, Spinner, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoriesPage = () => {
  const [media, setMedia] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    sort: "likes", // 'likes' | 'listens'
    categoryId: null, // ID категории или null (все)
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, mediaRes] = await Promise.all([
          axios.get("http://localhost:8000/api/category"),
          axios.get(
            `http://localhost:8000/api/media/categories?sort=${filters.sort}&category=${filters.categoryId || ""}`
          ),
        ]);
        setCategories(categoriesRes.data.categories);
        setMedia(mediaRes.data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [filters]);

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Топ Хитов!</h1>

      <div className="d-flex">
        {/* Dropdown для фильтрации */}
        <Dropdown className="mb-4">
          <Dropdown.Toggle variant="primary">
            {filters.categoryId
              ? `Категория: ${categories.find((c) => c._id === filters.categoryId)?.title}`
              : "Все категории"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilters({ ...filters, categoryId: null })}>Все категории</Dropdown.Item>
            {categories.map((category) => (
              <Dropdown.Item
                key={category._id}
                onClick={() => {
                  console.log(category);
                  setFilters({ ...filters, categoryId: category._id });
                  console.log(filters);
                }}
              >
                {category.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        {/* Dropdown для сортировки */}
        <Dropdown className="mb-4 ms-2">
          <Dropdown.Toggle variant="secondary">
            Сортировка: {filters.sort === "likes" ? "По лайкам" : "По прослушиваниям"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setFilters({ ...filters, sort: "likes" })}>По лайкам</Dropdown.Item>
            <Dropdown.Item onClick={() => setFilters({ ...filters, sort: "listens" })}>По прослушиваниям</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Список медиа */}
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {media.map((item) => (
            <Col key={item._id}>
              <Card>
                <Card.Body>
                  <Card.Title>
                    {item.title} - {item.authorId.name}
                  </Card.Title>
                  <Card.Text>
                    <small className="text-muted">
                      Категория: <strong>{item.categoryId?.title || "Без категории"}</strong>
                    </small>
                    <br />
                    <span>❤️ {item.likes}</span> | <span>🎧 {item.listens}</span>
                    <Link to={`/media/${item._id}`}>
                      <Button className="mt-2 w-100" variant="primary">
                        <i className="bi bi-play me-1"></i>Слушать
                      </Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CategoriesPage;
