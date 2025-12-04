import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <FaUserShield style={styles.logoIcon} />
          <span style={styles.logoText}>FaceAuth</span>
        </div>
        <div style={styles.links}>
          <Link style={styles.link} to="/">Home</Link>
          <Link style={styles.link} to="/register">Register</Link>
          <Link style={styles.link} to="/login">Login</Link>
        </div>
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
    padding: "15px 30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#4a5568",
  },
  logoIcon: {
    fontSize: "28px",
  },
  logoText: {
    color: "#4a5568",
  },
  links: {
    display: "flex",
    gap: "30px",
    alignItems: "center",
  },
  link: {
    fontSize: "15px",
    color: "#4a5568",
    textDecoration: "none",
    fontWeight: "600",
    transition: "color 0.3s ease",
    position: "relative",
  },
};

export default Navbar;
