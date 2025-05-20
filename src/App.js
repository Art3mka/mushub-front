import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

import AuthInitializer from "./components/AuthInitializer";

import ProtectedRoute from "./HOC/ProtectedRoute";
import AdminRoute from "./HOC/AdminRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MediaPlayerPage from "./pages/MediaPlayerPage";

import UploadPage from "./pages/UploadPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PlaylistsPage from "./pages/PlaylistsPage";
import MyPlaylistPage from "./pages/MyPlaylistPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import RestrictedPage from "./pages/RestrictedPage";

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
          <div className="d-flex flex-column min-vh-100">
            <Header />
            <Container className="my-4 flex-grow-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                  path="/upload"
                  element={
                    <ProtectedRoute>
                      <UploadPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/edit/:mediaId"
                  element={
                    <ProtectedRoute>
                      <UploadPage />
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
                <Route path="/media/:mediaId" element={<MediaPlayerPage />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminPage />
                    </AdminRoute>
                  }
                />
                <Route path="/403" element={<RestrictedPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Container>
            <Footer />
          </div>
        </Router>
      )}
    </AuthInitializer>
  );
}

export default App;
