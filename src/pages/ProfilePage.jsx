import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, Spinner, Button, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import MediaList from "../components/MediaList";
import UserMediaList from "../components/UserMediaList";
import { getUser } from "../api/requests";

const ProfilePage = () => {
  const { userId, token } = useSelector((state) => state.auth);

  const location = useLocation();

  // let { message } = location.state || {};

  const [profile, setProfile] = useState(null);
  const [likedMedia, setLikedMedia] = useState([]);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [activeTab, setActiveTab] = useState("likes");
  const [isShow, setIsShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUser(userId, token);
        setProfile(res.profile);
        setLikedMedia(res.likedMedia);
        setUploadedMedia(res.uploadedMedia);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
    if (location.state?.modalData) {
      setModalData(location.state.modalData);
      setIsShow(true);
      window.history.replaceState({}, document.title);
    }
  }, [userId, location.state]);

  const handleDeleteTrack = (deletedId) => {
    setUploadedMedia((prev) => prev.filter((media) => media._id !== deletedId));
    setModalData({ message: "Успешно удалено", variant: "success" });
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  if (!profile) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  return (
    <>
      <div className="profile-header text-center py-2 bg-light">
        <h2>{profile.name}</h2>
        <p className="text-muted">Зарегистрирован {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>

      <Tabs activeKey={activeTab} onSelect={(tab) => setActiveTab(tab)} className="my-3 justify-content-center">
        <Tab eventKey="uploads" title={`Загружено (${uploadedMedia.length})`}>
          <Link to={`/upload`}>
            <Button className="mt-2 w-100" variant="primary">
              <i className="bi bi-plus me-1"></i>Добавить трек
            </Button>
          </Link>
          <UserMediaList media={uploadedMedia} onDelete={handleDeleteTrack} />
        </Tab>
        <Tab eventKey="likes" title={`Понравилось (${likedMedia.length})`}>
          <MediaList media={likedMedia} />
        </Tab>
      </Tabs>

      <Modal show={isShow} onHide={handleClose} style={{ marginTop: "40px" }}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>{modalData?.message}</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant={modalData?.variant} onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfilePage;
