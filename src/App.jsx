import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Interview from "./pages/Interview";
import Resume from "./pages/Resume";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ margin: 0, padding: 0 }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
