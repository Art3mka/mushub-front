import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

import AuthInitializer from "./components/AuthInitializer";

import ProtectedRoute from "./HOC/ProtectedRoute";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import MediaPlayer from "./components/MediaPlayer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MediaListPage from "./pages/MediaListPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import MyPlaylistPage from "./pages/MyPlaylistPage";

function App() {
  const { isLoading } = useSelector((state) => state.auth);

  return (
    <AuthInitializer>
      {isLoading ? (
        <div>Загрузка</div>
      ) : (
        <Router>
          <Header />
          <Container className="my-4">
            <Routes>
              <Route path="/" element={<MediaListPage />} />
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
