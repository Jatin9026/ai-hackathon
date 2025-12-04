import React, { useState } from "react";
import axios from "axios";
import { FaFileAlt, FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaCode, FaProjectDiagram, FaCertificate, FaDownload, FaPlus, FaTimes, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Resume = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: {
      tenth: "",
      twelfth: "",
      graduation: ""
    },
    skills: [""],
    projects: [{ title: "", description: "" }],
    certifications: [""]
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      education: { ...prev.education, [name]: value }
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const addSkill = () => {
    setFormData(prev => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, skills: newSkills }));
  };

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { title: "", description: "" }]
    }));
  };

  const removeProject = (index) => {
    const newProjects = formData.projects.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, projects: newProjects }));
  };

  const handleCertificationChange = (index, value) => {
    const newCerts = [...formData.certifications];
    newCerts[index] = value;
    setFormData(prev => ({ ...prev, certifications: newCerts }));
  };

  const addCertification = () => {
    setFormData(prev => ({ ...prev, certifications: [...prev.certifications, ""] }));
  };

  const removeCertification = (index) => {
    const newCerts = formData.certifications.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, certifications: newCerts }));
  };

  const generateResume = async () => {
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      return setStatus("⚠️ Please fill in all required fields (Name, Email, Phone)");
    }

    // Filter out empty skills and certifications
    const cleanedData = {
      ...formData,
      skills: formData.skills.filter(s => s.trim() !== ""),
      certifications: formData.certifications.filter(c => c.trim() !== ""),
      projects: formData.projects.filter(p => p.title.trim() !== "" || p.description.trim() !== "")
    };

    if (cleanedData.skills.length === 0) {
      return setStatus("⚠️ Please add at least one skill");
    }

    setLoading(true);
    setStatus("");
    setPdfUrl("");

    try {
      const response = await axios.post(
        "https://if4alts0q0.execute-api.us-east-1.amazonaws.com/prod/resume",
        cleanedData
      );
      
      if (response.data.pdfUrl) {
        setPdfUrl(response.data.pdfUrl);
        setStatus("✅ Resume generated successfully!");
      }
    } catch (err) {
      setStatus("❌ Error: " + (err.response?.data?.message || err.message));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container} className="resume-container">
      <div style={styles.card} className="resume-card">
        <div style={styles.headerIcon} className="resume-header-icon">
          <FaFileAlt />
        </div>
        <h2 style={styles.heading} className="resume-heading">Resume Generator</h2>
        <p style={styles.subtitle} className="resume-subtitle">Create your professional resume instantly</p>

        {/* Personal Information */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FaUser style={styles.sectionIcon} />
            Personal Information
          </h3>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Name *</label>
            <input
              style={styles.input}
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <FaEnvelope style={styles.labelIcon} />
                Email *
              </label>
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <FaPhone style={styles.labelIcon} />
                Phone *
              </label>
              <input
                style={styles.input}
                type="tel"
                name="phone"
                placeholder="9999999999"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Education */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FaGraduationCap style={styles.sectionIcon} />
            Education
          </h3>

          <div style={styles.inputRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>10th Grade</label>
              <input
                style={styles.input}
                type="text"
                name="tenth"
                placeholder="e.g., 92%"
                value={formData.education.tenth}
                onChange={handleEducationChange}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>12th Grade</label>
              <input
                style={styles.input}
                type="text"
                name="twelfth"
                placeholder="e.g., 90%"
                value={formData.education.twelfth}
                onChange={handleEducationChange}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Graduation</label>
              <input
                style={styles.input}
                type="text"
                name="graduation"
                placeholder="e.g., 8.5 CGPA"
                value={formData.education.graduation}
                onChange={handleEducationChange}
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FaCode style={styles.sectionIcon} />
            Skills *
          </h3>

          {formData.skills.map((skill, index) => (
            <div key={index} style={styles.arrayItemRow}>
              <input
                style={styles.arrayInput}
                type="text"
                placeholder="e.g., React, Node.js, Python"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
              {formData.skills.length > 1 && (
                <button
                  style={styles.removeBtn}
                  onClick={() => removeSkill(index)}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}

          <button style={styles.addBtn} onClick={addSkill}>
            <FaPlus style={{ marginRight: "5px" }} />
            Add Skill
          </button>
        </div>

        {/* Projects */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FaProjectDiagram style={styles.sectionIcon} />
            Projects
          </h3>

          {formData.projects.map((project, index) => (
            <div key={index} style={styles.projectCard}>
              <div style={styles.projectHeader}>
                <span style={styles.projectNumber}>Project {index + 1}</span>
                {formData.projects.length > 1 && (
                  <button
                    style={styles.removeBtn}
                    onClick={() => removeProject(index)}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Title</label>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Project title"
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  style={styles.textarea}
                  placeholder="Brief description of the project"
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          ))}

          <button style={styles.addBtn} onClick={addProject}>
            <FaPlus style={{ marginRight: "5px" }} />
            Add Project
          </button>
        </div>

        {/* Certifications */}
        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>
            <FaCertificate style={styles.sectionIcon} />
            Certifications
          </h3>

          {formData.certifications.map((cert, index) => (
            <div key={index} style={styles.arrayItemRow}>
              <input
                style={styles.arrayInput}
                type="text"
                placeholder="e.g., AWS Cloud Practitioner"
                value={cert}
                onChange={(e) => handleCertificationChange(index, e.target.value)}
              />
              {formData.certifications.length > 1 && (
                <button
                  style={styles.removeBtn}
                  onClick={() => removeCertification(index)}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}

          <button style={styles.addBtn} onClick={addCertification}>
            <FaPlus style={{ marginRight: "5px" }} />
            Add Certification
          </button>
        </div>

        <button
          style={{
            ...styles.btnGenerate,
            ...(loading ? styles.btnDisabled : {}),
          }}
          onClick={generateResume}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Resume"}
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
            {status.replace(/[✅❌⚠️]/g, "").trim()}
          </div>
        )}

        {pdfUrl && (
          <div style={styles.downloadSection}>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.downloadBtn}
            >
              <FaDownload style={{ marginRight: "8px" }} />
              Download Resume
            </a>
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
    padding: "30px 20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "40px 30px",
    maxWidth: "900px",
    margin: "0 auto",
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
  section: {
    marginBottom: "30px",
    padding: "20px",
    background: "#f7fafc",
    borderRadius: "12px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "15px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  sectionIcon: {
    fontSize: "20px",
    color: "#4a5568",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  inputRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#4a5568",
    marginBottom: "8px",
  },
  labelIcon: {
    fontSize: "14px",
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
  textarea: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    resize: "vertical",
    background: "#ffffff",
    color: "#000000",
  },
  arrayItemRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
    alignItems: "center",
  },
  arrayInput: {
    flex: 1,
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    background: "#ffffff",
    color: "#000000",
  },
  removeBtn: {
    padding: "10px",
    background: "#fed7d7",
    color: "#c53030",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  addBtn: {
    padding: "10px 20px",
    background: "#e2e8f0",
    color: "#4a5568",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s ease",
  },
  projectCard: {
    background: "#ffffff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "15px",
    border: "2px solid #e2e8f0",
  },
  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  projectNumber: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#4a5568",
  },
  btnGenerate: {
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
    marginBottom: "15px",
  },
  statusSuccess: {
    background: "#c6f6d5",
    color: "#22543d",
  },
  statusError: {
    background: "#fed7d7",
    color: "#742a2a",
  },
  downloadSection: {
    textAlign: "center",
  },
  downloadBtn: {
    display: "inline-flex",
    alignItems: "center",
    padding: "15px 30px",
    background: "#48bb78",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(72, 187, 120, 0.3)",
    transition: "all 0.3s ease",
  },
};

// Add media query styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .resume-container {
        padding: 20px 10px !important;
      }
      .resume-card {
        padding: 30px 20px !important;
      }
      .resume-heading {
        font-size: 24px !important;
      }
    }
    @media (max-width: 480px) {
      .resume-card {
        padding: 25px 15px !important;
      }
      .resume-heading {
        font-size: 22px !important;
      }
      .resume-subtitle {
        font-size: 13px !important;
      }
      .resume-header-icon {
        font-size: 35px !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Resume;
