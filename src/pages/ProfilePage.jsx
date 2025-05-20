import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Tab, Tabs, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import MediaList from "../components/MediaList";
import UserMediaList from "../components/UserMediaList";

const ProfilePage = () => {
  const { userId } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(null);
  const [likedMedia, setLikedMedia] = useState([]);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [activeTab, setActiveTab] = useState("likes");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/users/${userId}`);
        setProfile(res.data.profile);
        setLikedMedia(res.data.likedMedia);
        setUploadedMedia(res.data.uploadedMedia);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleDeleteTrack = (deletedId) => {
    setUploadedMedia((prev) => prev.filter((media) => media._id !== deletedId));
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
    </>
  );
};

export default ProfilePage;
