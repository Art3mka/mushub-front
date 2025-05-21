import { useState, useEffect } from "react";
import { Dropdown, Modal, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import CreatePlaylistModal from "./CreatePlaylistModal";
import { getUserPlaylists, addToPlaylist } from "../api/requests";

const AddToPlaylist = ({ className, mediaId }) => {
  const [playlists, setPlaylists] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const fetchPlaylists = async () => {
    try {
      const res = await getUserPlaylists(token);
      setPlaylists(res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlaylists();
    }
  }, []);

  const handleAddToPlaylist = async (playlistId) => {
    if (isAuthenticated) {
      try {
        await addToPlaylist(playlistId, mediaId, token);
        alert("Добавлено в плейлист!");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <Dropdown className={className}>
        <Dropdown.Toggle disabled={!isAuthenticated} variant="outline-secondary" size="sm">
          {isAuthenticated ? "Добавить в плейлист" : "Войдите для добавления в плейлист"}
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
      <CreatePlaylistModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSubmit={() => fetchPlaylists()}
      />
    </div>
  );
};

export default AddToPlaylist;
