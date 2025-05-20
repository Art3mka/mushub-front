import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestrictedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center p-5">
        <h1 className="display-1 fw-bold text-dark">403</h1>
        <p className="fs-3">
          <span className="text-danger">Упс!</span> Доступ запрещен.
        </p>
        <p className="lead">У вас нет прав для просмотра данной страницы.</p>
        <Button variant="warning" onClick={() => navigate("/")}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default RestrictedPage;
