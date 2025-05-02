import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import MediaPlayer from "./components/MediaPlayer";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MediaListPage from "./pages/MediaListPage";

function App() {
  return (
    <Router>
      <Header />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<UploadForm />} />
          <Route path="/media" element={<MediaListPage />} />
          <Route path="/media/:id" element={<MediaPlayer />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
