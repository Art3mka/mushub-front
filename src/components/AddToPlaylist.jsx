import { useState, useEffect } from "react";
import { Dropdown, Modal, ListGroup } from "react-bootstrap";
import axios from "axios";
import CreatePlaylistModal from "./CreatePlaylistModal";

const AddToPlaylist = ({ mediaId }) => {
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

  const handleAddToPlaylist = async (playlistId) => {
    try {
      await axios.post(
        `http://localhost:8000/api/playlists/${playlistId}/add/${mediaId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Добавлено в плейлист!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="outline-secondary" size="sm">
          Добавить в плейлист
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {playlists.map((playlist) => (
            <Dropdown.Item key={playlist._id} onClick={() => handleAddToPlaylist(playlist._id)}>
              {playlist.name}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setShowCreateModal(true)}>+ Создать новый</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <CreatePlaylistModal show={showCreateModal} onHide={() => setShowCreateModal(false)} />
    </div>
  );
};

export default AddToPlaylist;
