import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-warning p-2">
      <Container>
        <Row className="justify-content-center mb-1">
          <Col md={4} className="text-center">
            <h5>Мои соцсети</h5>
            <div className="d-flex justify-content-center ">
              <a href="https://t.me/rtq_shein" target="blank" className="text-dark mx-2">
                <i className="bi bi-telegram"></i>
              </a>
              <a href="https://github.com/Art3mka" target="blank" className="text-dark mx-2">
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.instagram.com/artmshpn?igsh=czNzMzZla2FxbjU3"
                target="blank"
                className="text-dark mx-2"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center text-dark small">
            &copy; {new Date().getFullYear()}. Создано в ходе стажировки. Все права не защищены.
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
