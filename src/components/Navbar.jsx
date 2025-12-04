import { Link, useLocation } from "react-router-dom";
import { FaUserShield, FaSignOutAlt, FaFileAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/" || path === "/welcome") {
      return location.pathname === "/" || location.pathname === "/welcome";
    }
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <FaUserShield style={styles.logoIcon} />
          <span style={styles.logoText}>Copilot</span>
        </div>

        {/* Hamburger Icon */}
        <div style={styles.hamburger} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Menu */}
        <div style={styles.links} className="desktop-menu">
          <Link 
            style={{
              ...styles.link,
              ...(isActive("/") ? styles.linkActive : {})
            }} 
            to="/"
          >
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link 
                style={{
                  ...styles.link,
                  ...(isActive("/register") ? styles.linkActive : {})
                }} 
                to="/register"
              >
                Register
              </Link>
              <Link 
                style={{
                  ...styles.link,
                  ...(isActive("/login") ? styles.linkActive : {})
                }} 
                to="/login"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link 
                style={{
                  ...styles.link,
                  ...(isActive("/interview") ? styles.linkActive : {})
                }} 
                to="/interview"
              >
                Interview Prep
              </Link>
              <Link 
                style={{
                  ...styles.link,
                  ...(isActive("/resume") ? styles.linkActive : {})
                }} 
                to="/resume"
              >
                <FaFileAlt style={{ marginRight: "5px" }} />
                Resume
              </Link>
              <button onClick={logout} style={styles.logoutBtn}>
                <FaSignOutAlt style={{ marginRight: "5px" }} />
                Logout ({currentUser})
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenu} className="mobile-menu">
            <Link 
              style={{
                ...styles.mobileLink,
                ...(isActive("/") ? styles.mobileLinkActive : {})
              }} 
              to="/"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            {!isAuthenticated ? (
              <>
                <Link 
                  style={{
                    ...styles.mobileLink,
                    ...(isActive("/register") ? styles.mobileLinkActive : {})
                  }} 
                  to="/register"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
                <Link 
                  style={{
                    ...styles.mobileLink,
                    ...(isActive("/login") ? styles.mobileLinkActive : {})
                  }} 
                  to="/login"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link 
                  style={{
                    ...styles.mobileLink,
                    ...(isActive("/interview") ? styles.mobileLinkActive : {})
                  }} 
                  to="/interview"
                  onClick={closeMobileMenu}
                >
                  Interview Prep
                </Link>
                <Link 
                  style={{
                    ...styles.mobileLink,
                    ...(isActive("/resume") ? styles.mobileLinkActive : {})
                  }} 
                  to="/resume"
                  onClick={closeMobileMenu}
                >
                  <FaFileAlt style={{ marginRight: "5px" }} />
                  Resume
                </Link>
                <button 
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }} 
                  style={styles.mobileLogoutBtn}
                >
                  <FaSignOutAlt style={{ marginRight: "5px" }} />
                  Logout ({currentUser})
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    background: "#ffffff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px",
    maxWidth: "1200px",
    margin: "0 auto",
    position: "relative",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "22px",
    fontWeight: "700",
    color: "#4a5568",
    zIndex: 1001,
  },
  logoIcon: {
    fontSize: "28px",
  },
  logoText: {
    color: "#4a5568",
  },
  hamburger: {
    display: "none",
    fontSize: "24px",
    color: "#4a5568",
    cursor: "pointer",
    zIndex: 1001,
  },
  links: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  link: {
    fontSize: "15px",
    color: "#4a5568",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
    position: "relative",
    padding: "8px 12px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
  },
  linkActive: {
    color: "#ffffff",
    background: "#4a5568",
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "#4a5568",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  mobileMenu: {
    position: "fixed",
    top: "70px",
    left: 0,
    right: 0,
    background: "#ffffff",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    zIndex: 999,
    animation: "slideDown 0.3s ease",
  },
  mobileLink: {
    fontSize: "16px",
    color: "#4a5568",
    textDecoration: "none",
    fontWeight: "600",
    padding: "12px 16px",
    borderRadius: "8px",
    marginBottom: "8px",
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
  },
  mobileLinkActive: {
    color: "#ffffff",
    background: "#4a5568",
  },
  mobileLogoutBtn: {
    padding: "12px 16px",
    background: "#4a5568",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "8px",
    transition: "all 0.3s ease",
  },
};

// Add media query styles inline
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    nav a:hover:not([style*="background: rgb(74, 85, 104)"]) {
      background: #f7fafc;
    }
    nav button:hover {
      background: #2d3748;
    }
    .mobile-menu a:hover:not([style*="background: rgb(74, 85, 104)"]) {
      background: #f7fafc;
    }
    .mobile-menu button:hover {
      background: #2d3748;
    }

    @media (min-width: 769px) {
      .mobile-menu {
        display: none !important;
      }
    }

    @media (max-width: 768px) {
      nav > div {
        padding: 15px 20px !important;
      }
      nav > div > div:first-child {
        font-size: 20px !important;
      }
      nav > div > div:first-child svg {
        font-size: 26px !important;
      }
      nav > div > div:nth-child(3) {
        display: none !important;
      }
      nav > div > div:nth-child(2) {
        display: flex !important;
      }
    }

    @media (max-width: 480px) {
      nav > div {
        padding: 12px 15px !important;
      }
      nav > div > div:first-child {
        font-size: 18px !important;
      }
      nav > div > div:first-child svg {
        font-size: 24px !important;
      }
      .mobile-menu {
        top: 60px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Navbar;
