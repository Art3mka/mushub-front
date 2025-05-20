import React from "react";
import { Tab, Nav, Row, Col } from "react-bootstrap";
import AdminCategories from "../../components/admin/AdminCategories";
import AdminUsers from "../../components/admin/AdminUsers";
import AdminMedia from "../../components/admin/AdminMedia";

const AdminPage = () => {
  return (
    <div className="container mt-4">
      <h1>Админ-панель</h1>
      <Tab.Container defaultActiveKey="categories">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="categories">Категории</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="users">Пользователи</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tracks">Треки</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="categories">
                <AdminCategories />
              </Tab.Pane>
              <Tab.Pane eventKey="users">
                <AdminUsers />
              </Tab.Pane>
              <Tab.Pane eventKey="tracks">
                <AdminMedia />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default AdminPage;
