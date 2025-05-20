import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import CreatePlaylistModal from "../components/CreatePlaylistModal";

const PlaylistsPage = () => {
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/playlists/my", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        console.log(res.data);
        setPlaylists(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <>
      <h1 className="my-4">Мои плейлисты</h1>
      {playlists.length > 0 && (
        <Button className="mb-3" onClick={() => setShowCreateModal(true)}>
          Создать плейлист
        </Button>
      )}
      <Row>
        {playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Col key={playlist._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{playlist.name}</Card.Title>
                  <Card.Text>
                    Треков: {playlist.mediaItems.length}
                    <br />
                    {playlist.description}
                  </Card.Text>
                  <Link to={`/playlists/${playlist._id}`}>
                    <Button variant="primary">Открыть</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Button onClick={() => setShowCreateModal(true)}>Создайте свой первый плейлист!</Button>
        )}
      </Row>
      <CreatePlaylistModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
    </>
  );
};

export default PlaylistsPage;
