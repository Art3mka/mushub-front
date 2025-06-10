import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ error, onReset }) => {
  //   const navigate = useNavigate();

  const clickHandler = () => {
    onReset();
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="text-center p-5">
        <h1 className="display-1 fw-bold text-dark">500</h1>
        <p className="fs-3">
          <span className="text-danger">Упс!</span> Что-то пошло не так...
        </p>
        <p className="lead">{error.message}</p>
        <Button variant="warning" onClick={clickHandler}>
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
