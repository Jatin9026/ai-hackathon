import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { API_BASE_URL } from "../api";
import { FaUserPlus, FaCamera, FaUpload, FaRedo, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";

const Register = () => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);

  const [userId, setUserId] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWebcam, setShowWebcam] = useState(true);

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
      return setStatus("⚠️ Please enter a User ID");
    }
    if (!capturedImage) {
      return setStatus("⚠️ Please capture or upload an image first");
    }

    const base64Data = capturedImage.split(",")[1];
    setIsLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/register`, {
        userId,
        imageBase64: base64Data,
      });
      setStatus("✅ User Registered Successfully!");
      setTimeout(() => {
        setUserId("");
        setCapturedImage(null);
        setShowWebcam(true);
        setStatus("");
      }, 2000);
    } catch (err) {
      setStatus("❌ Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container} className="register-container">
      <div style={styles.card} className="register-card">
        <div style={styles.headerIcon} className="register-header-icon">
          <FaUserPlus />
        </div>
        <h2 style={styles.heading} className="register-heading">Register New User</h2>
        <p style={styles.subtitle} className="register-subtitle">Create your account with facial recognition</p>

        <div style={styles.inputGroup}>
          <label style={styles.label}>User ID</label>
          <input
            style={styles.input}
            type="text"
            placeholder="Enter unique user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>

        <div style={styles.imageSection}>
          <div style={styles.webcamContainer} className="register-webcam-container">
            {showWebcam && !capturedImage && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={styles.webcam}
              />
            )}
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                style={styles.preview}
              />
            )}
          </div>

          <div style={styles.buttonGroup} className="register-button-group">
            <button
              style={styles.btnCapture}
              onClick={capturePhoto}
              disabled={!showWebcam || isLoading}
            >
              <FaCamera style={styles.btnIcon} />
              Capture Photo
            </button>

            <button
              style={styles.btnUpload}
              onClick={() => fileInputRef.current.click()}
              disabled={isLoading}
            >
              <FaUpload style={styles.btnIcon} />
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </div>

          {capturedImage && (
            <button
              style={styles.btnRetake}
              onClick={() => {
                setCapturedImage(null);
                setShowWebcam(true);
              }}
            >
              <FaRedo style={{ marginRight: "8px" }} />
              Retake
            </button>
          )}
        </div>

        <button
          style={{
            ...styles.btnRegister,
            ...(isLoading ? styles.btnDisabled : {}),
          }}
          onClick={registerUser}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Register Now"}
        </button>

        {status && (
          <div
            style={{
              ...styles.status,
              ...(status.includes("✅") ? styles.statusSuccess : {}),
              ...(status.includes("❌") || status.includes("⚠️")
                ? styles.statusError
                : {}),
            }}
          >
            {status.includes("✅") && <FaCheckCircle style={{ marginRight: "8px" }} />}
            {status.includes("⚠️") && <FaExclamationTriangle style={{ marginRight: "8px" }} />}
            {status.includes("❌") && <FaTimesCircle style={{ marginRight: "8px" }} />}
            {status.replace(/[✅❌⚠️]/g, "").trim()}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 60px)",
    background: "#f0f4f8",
    padding: "0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px 30px",
    maxWidth: "600px",
    width: "90%",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
  },
  headerIcon: {
    fontSize: "40px",
    color: "#4a5568",
    textAlign: "center",
    marginBottom: "15px",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#718096",
    marginBottom: "30px",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "25px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#000000",
  },
  imageSection: {
    marginBottom: "25px",
  },
  webcamContainer: {
    width: "100%",
    height: "300px",
    background: "#f7fafc",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px dashed #cbd5e0",
  },
  webcam: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "10px",
  },
  preview: {
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10px",
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
    marginBottom: "15px",
  },
  btnCapture: {
    flex: 1,
    padding: "12px 20px",
    background: "#48bb78",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  btnUpload: {
    flex: 1,
    padding: "12px 20px",
    background: "#4299e1",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  btnRetake: {
    width: "100%",
    padding: "10px",
    background: "#f7fafc",
    color: "#4a5568",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnIcon: {
    fontSize: "16px",
  },
  btnRegister: {
    width: "100%",
    padding: "15px",
    background: "#4a5568",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginBottom: "15px",
    boxShadow: "0 4px 12px rgba(74, 85, 104, 0.3)",
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  status: {
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center",
    background: "#f7fafc",
    color: "#4a5568",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusSuccess: {
    background: "#c6f6d5",
    color: "#22543d",
  },
  statusError: {
    background: "#fed7d7",
    color: "#742a2a",
  },
};

// Add media query styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .register-container {
        padding: 20px 10px !important;
      }
      .register-card {
        padding: 30px 20px !important;
      }
      .register-heading {
        font-size: 24px !important;
      }
      .register-webcam-container {
        height: 250px !important;
      }
    }
    @media (max-width: 480px) {
      .register-card {
        padding: 25px 15px !important;
        width: 95% !important;
      }
      .register-heading {
        font-size: 22px !important;
      }
      .register-subtitle {
        font-size: 13px !important;
      }
      .register-header-icon {
        font-size: 35px !important;
      }
      .register-webcam-container {
        height: 200px !important;
      }
      .register-button-group {
        flex-direction: column !important;
      }
      .register-button-group button {
        width: 100% !important;
        min-width: 100% !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Register;
