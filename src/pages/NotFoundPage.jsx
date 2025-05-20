import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center p-5">
        <h1 className="display-1 fw-bold text-dark">404</h1>
        <p className="fs-3">
          <span className="text-danger">Упс!</span> Страница не найдена.
        </p>
        <p className="lead">Страница, которую вы ищете, не существует или была перемещена.</p>
        <Button variant="warning" onClick={() => navigate("/")}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
