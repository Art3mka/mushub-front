import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const MediaList = ({ media }) => {
  if (media.length === 0) {
    return <div className="text-center my-5">Пользователь ничего не загружал</div>;
  }

  return (
    <Row className="g-4">
      {media.map((item) => (
        <Col key={item._id} md={4} lg={3}>
          <Card className="h-100">
            <Card.Body className="d-flex">
              <Link to={`/media/${item._id}`} className="btn btn-warning btn-sm me-3">
                <i className="bi bi-play"></i>
              </Link>
              <Card.Title className="text-center d-flex justify-content-center align-items-center">
                {item.title}
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MediaList;
