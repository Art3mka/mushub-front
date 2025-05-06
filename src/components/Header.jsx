import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

const Header = () => {
  const { isAuthenticated, username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
              <Form.Control type="search" placeholder="Найти трек или альбом" className="me-2" aria-label="Search" />
              <Button variant="outline-light">
                <i className="bi bi-search"></i>
              </Button>
            </Form>
          )}

          <Nav className="ms-auto">
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
