import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaUserPlus, FaSignInAlt, FaBolt, FaLock, FaStar } from "react-icons/fa";

const Welcome = () => {
  return (
    <div style={styles.container} className="welcome-container">
      <div style={styles.card} className="welcome-card">
        <div style={styles.iconContainer}>
          <FaUserCircle style={styles.icon} className="welcome-icon" />
        </div>
        <h1 style={styles.heading} className="welcome-heading">Face Authentication System</h1>
        <p style={styles.subtitle} className="welcome-subtitle">Secure access with facial recognition technology</p>

        <div style={styles.buttons} className="welcome-buttons">
          <Link to="/register" style={styles.linkWrapper}>
            <button style={styles.btnPrimary} className="welcome-btn-primary">
              <FaUserPlus style={styles.btnIcon} />
              Register New User
            </button>
          </Link>

          <Link to="/login" style={styles.linkWrapper}>
            <button style={styles.btnSecondary} className="welcome-btn-secondary">
              <FaSignInAlt style={styles.btnIcon} />
              Login
            </button>
          </Link>
        </div>

        <div style={styles.features} className="welcome-features">
          <div style={styles.feature}>
            <FaBolt style={styles.featureIcon} />
            <span style={styles.featureText}>Fast Recognition</span>
          </div>
          <div style={styles.feature}>
            <FaLock style={styles.featureIcon} />
            <span style={styles.featureText}>Secure Authentication</span>
          </div>
          <div style={styles.feature}>
            <FaStar style={styles.featureIcon} />
            <span style={styles.featureText}>Easy to Use</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 100px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f0f4f8",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "50px 40px",
    maxWidth: "600px",
    width: "100%",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    border: "1px solid #e2e8f0",
  },
  iconContainer: {
    marginBottom: "20px",
  },
  icon: {
    fontSize: "80px",
    color: "#4a5568",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#718096",
    marginBottom: "40px",
  },
  buttons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    marginBottom: "40px",
    flexWrap: "wrap",
  },
  linkWrapper: {
    textDecoration: "none",
  },
  btnPrimary: {
    padding: "15px 35px",
    background: "#4a5568",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 4px 12px rgba(74, 85, 104, 0.3)",
  },
  btnSecondary: {
    padding: "15px 35px",
    background: "#ffffff",
    color: "#4a5568",
    border: "2px solid #4a5568",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  btnIcon: {
    fontSize: "18px",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    gap: "20px",
    flexWrap: "wrap",
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  featureIcon: {
    fontSize: "28px",
    color: "#4a5568",
  },
  featureText: {
    fontSize: "14px",
    color: "#4a5568",
    fontWeight: "500",
  },
};

// Add media query styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .welcome-card {
        padding: 40px 30px !important;
      }
      .welcome-heading {
        font-size: 28px !important;
      }
      .welcome-icon {
        font-size: 70px !important;
      }
    }
    @media (max-width: 480px) {
      .welcome-container {
        padding: 15px !important;
      }
      .welcome-card {
        padding: 30px 20px !important;
      }
      .welcome-heading {
        font-size: 24px !important;
      }
      .welcome-subtitle {
        font-size: 14px !important;
      }
      .welcome-icon {
        font-size: 60px !important;
      }
      .welcome-buttons {
        flex-direction: column !important;
        gap: 15px !important;
      }
      .welcome-btn-primary,
      .welcome-btn-secondary {
        width: 100% !important;
        justify-content: center !important;
      }
      .welcome-features {
        flex-direction: column !important;
        gap: 15px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Welcome;
