import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import AuthInitializer from "./components/AuthInitializer";

import ProtectedRoute from "./HOC/ProtectedRoute";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import MediaPlayer from "./components/MediaPlayer";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MediaListPage from "./pages/MediaListPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import MyPlaylistPage from "./pages/MyPlaylistPage";
import ProfilePage from "./pages/ProfilePage";
import CategoriesPage from "./pages/CategoriesPage";

function App() {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <AuthInitializer>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="warning" />
        </div>
      ) : (
        <Router>
          <Header />
          <Container className="my-4">
            <Routes>
              <Route path="/" element={<MediaListPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/upload"
                element={
                  <ProtectedRoute>
                    <UploadForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit/:mediaId"
                element={
                  <ProtectedRoute>
                    <UploadForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/playlists"
                element={
                  <ProtectedRoute>
                    <PlaylistsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/playlists/:playlistId"
                element={
                  <ProtectedRoute>
                    <MyPlaylistPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route path="/media" element={<MediaListPage />} />
              <Route path="/media/:mediaId" element={<MediaPlayer />} />
            </Routes>
          </Container>
        </Router>
      )}
    </AuthInitializer>
  );
}

export default App;
