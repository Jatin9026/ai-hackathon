import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { API_BASE_URL } from "../api";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Fade,
  IconButton,
} from "@mui/material";
import {
  PersonAdd,
  CameraAlt,
  Upload,
  Refresh,
  CheckCircle,
  Warning,
  Error as ErrorIcon,
} from "@mui/icons-material";

const Register = () => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(true);
  const [statusType, setStatusType] = useState("info");

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setStatus("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result);
        setShowWebcam(false);
        setStatus("");
      };
      reader.readAsDataURL(file);
    }
  };

  const registerUser = async () => {
    if (!userId.trim()) {
      setStatus("Please enter a User ID");
      setStatusType("warning");
      return;
    }
    if (!capturedImage) {
      setStatus("Please capture or upload an image first");
      setStatusType("warning");
      return;
    }

    const base64Data = capturedImage.split(",")[1];
    setIsLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/register`, {
        userId,
        imageBase64: base64Data,
      });
      setStatus("User Registered Successfully!");
      setStatusType("success");
      setTimeout(() => {
        setUserId("");
        setCapturedImage(null);
        setShowWebcam(true);
        setStatus("");
      }, 2000);
    } catch (err) {
      setStatus("Error: " + err.message);
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#000000', py: 6 }}>
      <Container maxWidth="sm">
        <Fade in timeout={500}>
          <Card elevation={0}>
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box sx={{ width: 80, height: 80, borderRadius: 5, background: '#1a1a1a', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <PersonAdd sx={{ fontSize: 40, color: '#ffffff' }} />
                </Box>
                <Typography variant="h2" gutterBottom>
                  Register New User
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your account with facial recognition
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="User ID"
                placeholder="Enter unique user ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                sx={{ mb: 3 }}
              />

              <Box
                sx={{
                  width: '100%',
                  height: 320,
                  borderRadius: 4,
                  overflow: 'hidden',
                  mb: 2,
                  border: '2px solid #1a1a1a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#000000',
                }}
              >
                {showWebcam && !capturedImage ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                  />
                ) : null}
              </Box>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<CameraAlt />}
                  onClick={capturePhoto}
                  disabled={!showWebcam || isLoading}
                >
                  Capture Photo
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  color="info"
                  startIcon={<Upload />}
                  onClick={() => fileInputRef.current.click()}
                  disabled={isLoading}
                >
                  Upload Image
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
              </Stack>

              {capturedImage && (
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={() => {
                    setCapturedImage(null);
                    setShowWebcam(true);
                  }}
                  sx={{ mb: 3 }}
                >
                  Retake
                </Button>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={registerUser}
                disabled={isLoading}
                sx={{ mb: 2, py: 1.5 }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    Processing...
                  </>
                ) : (
                  "Register Now"
                )}
              </Button>

              {status && (
                <Alert
                  severity={statusType}
                  icon={
                    statusType === "success" ? (
                      <CheckCircle />
                    ) : statusType === "warning" ? (
                      <Warning />
                    ) : (
                      <ErrorIcon />
                    )
                  }
                >
                  {status}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </Box>
  );
};

export default Register;
