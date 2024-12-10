import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PDFUploadPage from './components/PDFUploadPage';
import ChatPage from './pages/ChatPage';  // Verifica que esta ruta sea correcta

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PDFUploadPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default App;