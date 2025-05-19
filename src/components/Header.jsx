import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button, Form, Modal, ListGroup, InputGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../store/authSlice";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const performSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/media/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Поиск с задержкой (debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClose = () => {
    setSearchQuery("");
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <Navbar bg="warning" variant="light" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          MusHub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          {/* Поиск (только для авторизованных) */}
          {isAuthenticated && (
            <Form className="d-flex mx-3" style={{ width: "300px" }}>
              <Form.Group controlId="search">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Найти трек или альбом"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowResults(true)}
                    className="me-2"
                    aria-label="Search"
                  />
                </InputGroup>
              </Form.Group>
            </Form>
          )}

          <Modal show={showResults && searchResults.length > 0} onHide={handleClose} style={{ marginTop: "40px" }}>
            <Modal.Header closeButton>
              <Modal.Title>Результаты поиска</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <ListGroup variant="flush">
                {searchResults.map((media) => (
                  <ListGroup.Item
                    key={media._id}
                    action
                    onClick={() => {
                      // Переход к треку
                      setSearchQuery("");
                      navigate(`/media/${media._id}`);
                      setShowResults(false);
                    }}
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{media.title}</strong>
                        <div className="text-muted small">{media.authorId.name}</div>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Modal.Body>
          </Modal>

          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/categories" className="d-flex align-items-center">
              {/* <i className="bi bi-person-circle me-1"></i> */}
              Топ хитов!
            </Nav.Link>
            {isAuthenticated ? (
              <>
                {/* Меню для авторизованных */}
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center">
                  <i className="bi bi-person-circle me-1"></i>
                  {username}
                </Nav.Link>

                <Nav.Link as={Link} to="/playlists">
                  <i className="bi bi-collection me-1"></i>
                  Плейлисты
                </Nav.Link>
                <Button variant="outline-danger" size="sm" className="ms-2" onClick={handleLogout}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                {/* Меню для гостей */}
                <Nav.Link as={Link} to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Вход
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <i className="bi bi-person-plus me-1"></i>
                  Регистрация
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
