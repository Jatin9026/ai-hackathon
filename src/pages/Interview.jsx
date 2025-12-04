import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaBriefcase, FaSpinner, FaQuestionCircle, FaLightbulb, FaArrowRight, FaChevronDown, FaChevronUp, FaBuilding, FaUserTie, FaTimes, FaEdit, FaFilter } from "react-icons/fa";

const COMPANIES = [
  { name: "Amazon", roles: ["SDE-1", "SDE-2", "SDE-3", "Senior SDE", "Principal Engineer"] },
  { name: "Google", roles: ["Software Engineer I", "Software Engineer II", "Software Engineer III", "Senior Software Engineer", "Staff Engineer"] },
  { name: "Microsoft", roles: ["Software Engineer", "Software Engineer II", "Senior Software Engineer", "Principal Engineer", "Partner Engineer"] },
  { name: "Meta (Facebook)", roles: ["E3 - Software Engineer", "E4 - Software Engineer", "E5 - Senior Software Engineer", "E6 - Staff Engineer", "E7 - Senior Staff Engineer"] },
  { name: "Apple", roles: ["ICT2", "ICT3", "ICT4", "ICT5", "ICT6"] },
  { name: "Netflix", roles: ["Software Engineer", "Senior Software Engineer", "Staff Software Engineer", "Senior Staff Engineer"] },
  { name: "Tesla", roles: ["Software Engineer", "Senior Software Engineer", "Staff Software Engineer", "Principal Engineer"] },
  { name: "Uber", roles: ["Software Engineer I", "Software Engineer II", "Senior Software Engineer", "Staff Engineer", "Principal Engineer"] },
  { name: "Airbnb", roles: ["Software Engineer", "Senior Software Engineer", "Staff Engineer", "Principal Engineer"] },
  { name: "LinkedIn", roles: ["Software Engineer", "Senior Software Engineer", "Staff Software Engineer", "Principal Staff Engineer"] },
  { name: "Salesforce", roles: ["MTS", "SMTS", "LMTS", "Principal Engineer"] },
  { name: "Oracle", roles: ["IC2", "IC3", "IC4", "IC5", "IC6"] },
  { name: "Adobe", roles: ["Computer Scientist 1", "Computer Scientist 2", "Senior Computer Scientist", "Principal Scientist"] },
  { name: "IBM", roles: ["Software Engineer", "Senior Software Engineer", "Staff Software Engineer", "Senior Technical Staff Member"] },
  { name: "Twitter", roles: ["Software Engineer", "Senior Software Engineer", "Staff Engineer", "Principal Engineer"] },
  { name: "Spotify", roles: ["Engineer I", "Engineer II", "Senior Engineer", "Staff Engineer", "Principal Engineer"] },
  { name: "Stripe", roles: ["Software Engineer", "Senior Software Engineer", "Staff Engineer", "Principal Engineer"] },
  { name: "Shopify", roles: ["Developer", "Senior Developer", "Staff Developer", "Principal Developer"] },
  { name: "PayPal", roles: ["Software Engineer 1", "Software Engineer 2", "Senior Software Engineer", "MTS", "SMTS"] },
  { name: "Other (Custom)", roles: ["Custom Role"] },
];

const Interview = () => {
  const { isAuthenticated, currentUser } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [availableRoles, setAvailableRoles] = useState([]);
  const [isCustomCompany, setIsCustomCompany] = useState(false);
  const [isCustomRole, setIsCustomRole] = useState(false);
  const [customCompanyInput, setCustomCompanyInput] = useState("");
  const [customRoleInput, setCustomRoleInput] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleCompanySelect = (companyName) => {
    if (companyName === "Other (Custom)") {
      setIsCustomCompany(true);
      setCustomCompanyInput("");
      setShowCompanyModal(false);
    } else {
      setIsCustomCompany(false);
      setCompany(companyName);
      const selectedCompany = COMPANIES.find(c => c.name === companyName);
      setAvailableRoles(selectedCompany ? selectedCompany.roles : []);
      setRole("");
      setShowCompanyModal(false);
    }
  };

  const handleCustomCompanySubmit = () => {
    if (customCompanyInput.trim()) {
      setCompany(customCompanyInput.trim());
      setAvailableRoles([]);
      setRole("");
      setIsCustomCompany(false);
    }
  };

  const handleRoleSelect = (roleName) => {
    if (roleName === "Custom Role") {
      setIsCustomRole(true);
      setCustomRoleInput("");
      setShowRoleModal(false);
    } else {
      setIsCustomRole(false);
      setRole(roleName);
      setShowRoleModal(false);
    }
  };

  const handleCustomRoleSubmit = () => {
    if (customRoleInput.trim()) {
      setRole(customRoleInput.trim());
      setIsCustomRole(false);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://lhp9qyawlh.execute-api.us-east-1.amazonaws.com/prod/interview",
        { company, role }
      );
      setQuestions(response.data);
    } catch (err) {
      setError("Failed to fetch interview questions. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#48bb78";
      case "medium":
        return "#ed8936";
      case "hard":
        return "#f56565";
      default:
        return "#4a5568";
    }
  };

  const toggleDifficultyFilter = (difficulty) => {
    if (difficultyFilter === difficulty) {
      setDifficultyFilter("");
    } else {
      setDifficultyFilter(difficulty);
    }
  };

  const filteredQuestions = difficultyFilter === "" 
    ? questions 
    : questions.filter(q => q.difficulty.toLowerCase() === difficultyFilter);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <FaBriefcase style={styles.headerIcon} />
          <h1 style={styles.heading}>Interview Preparation</h1>
          <p style={styles.subtitle}>
            Welcome, <strong>{currentUser}</strong>! Prepare for your upcoming interviews
          </p>
        </div>

        <div style={styles.formSection}>
          <div style={styles.inputRow}>
            {/* Company Selector */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <FaBuilding style={{ marginRight: "5px" }} />
                Company
              </label>
              <div
                style={styles.selectTrigger}
                onClick={() => setShowCompanyModal(true)}
              >
                <span style={company ? styles.selectedText : styles.placeholderText}>
                  {company || "Select a company"}
                </span>
                <FaChevronDown style={styles.selectIcon} />
              </div>
            </div>

            {/* Role Selector */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <FaUserTie style={{ marginRight: "5px" }} />
                Role
              </label>
              <div
                style={{
                  ...styles.selectTrigger,
                  ...((!availableRoles.length && !company) ? styles.selectDisabled : {})
                }}
                onClick={() => {
                  if (availableRoles.length > 0 || company) {
                    setShowRoleModal(true);
                  }
                }}
              >
                <span style={role ? styles.selectedText : styles.placeholderText}>
                  {role || (!company ? "Select company first" : "Select a role")}
                </span>
                <FaChevronDown style={styles.selectIcon} />
              </div>
            </div>
          </div>

          <button
            style={{
              ...styles.btnFetch,
              ...(loading || !company || !role ? styles.btnDisabled : {}),
            }}
            onClick={fetchQuestions}
            disabled={loading || !company || !role}
          >
            {loading ? (
              <>
                <FaSpinner style={styles.spinner} />
                Loading Questions...
              </>
            ) : (
              <>
                <FaQuestionCircle style={styles.btnIcon} />
                Get Interview Questions
              </>
            )}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {questions.length > 0 && (
          <div style={styles.questionsContainer}>
            <div style={styles.questionsHeaderRow}>
              <h2 style={styles.questionsHeading}>
                Interview Questions ({filteredQuestions.length})
              </h2>
              <div style={styles.filterContainer}>
                <FaFilter style={styles.filterIcon} />
                <button
                  style={{
                    ...styles.filterBtn,
                    ...(difficultyFilter === 'easy' ? styles.filterBtnActiveEasy : {})
                  }}
                  onClick={() => toggleDifficultyFilter('easy')}
                >
                  Easy
                </button>
                <button
                  style={{
                    ...styles.filterBtn,
                    ...(difficultyFilter === 'medium' ? styles.filterBtnActiveMedium : {})
                  }}
                  onClick={() => toggleDifficultyFilter('medium')}
                >
                  Medium
                </button>
                <button
                  style={{
                    ...styles.filterBtn,
                    ...(difficultyFilter === 'hard' ? styles.filterBtnActiveHard : {})
                  }}
                  onClick={() => toggleDifficultyFilter('hard')}
                >
                  Hard
                </button>
              </div>
            </div>
            {filteredQuestions.map((q, index) => (
              <div key={index} style={styles.questionCard}>
                <div
                  style={styles.questionHeader}
                  onClick={() => toggleExpanded(index)}
                >
                  <div style={styles.questionTitle}>
                    <span style={styles.questionNumber}>Q{index + 1}</span>
                    <span style={styles.questionText}>{q.question}</span>
                  </div>
                  <div style={styles.questionMeta}>
                    <span
                      style={{
                        ...styles.difficulty,
                        backgroundColor: getDifficultyColor(q.difficulty) + "20",
                        color: getDifficultyColor(q.difficulty),
                      }}
                    >
                      {q.difficulty}
                    </span>
                    {expandedIndex === index ? (
                      <FaChevronUp style={styles.chevron} />
                    ) : (
                      <FaChevronDown style={styles.chevron} />
                    )}
                  </div>
                </div>

                {expandedIndex === index && (
                  <div style={styles.questionDetails}>
                    <div style={styles.detailSection}>
                      <div style={styles.detailLabel}>
                        <FaLightbulb style={styles.detailIcon} />
                        Ideal Answer
                      </div>
                      <p style={styles.detailText}>{q.ideal_answer}</p>
                    </div>

                    <div style={styles.detailSection}>
                      <div style={styles.detailLabel}>
                        <FaQuestionCircle style={styles.detailIcon} />
                        Explanation
                      </div>
                      <p style={styles.detailText}>{q.explanation}</p>
                    </div>

                    {q.follow_up && (
                      <div style={styles.detailSection}>
                        <div style={styles.detailLabel}>
                          <FaArrowRight style={styles.detailIcon} />
                          Follow-up Question
                        </div>
                        <p style={styles.detailText}>{q.follow_up}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {filteredQuestions.length === 0 && (
              <div style={styles.noResults}>
                <FaQuestionCircle style={styles.noResultsIcon} />
                <p style={styles.noResultsText}>No questions match the selected difficulty filter.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Company Modal */}
      {showCompanyModal && (
        <div style={styles.modalOverlay} onClick={() => setShowCompanyModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FaBuilding style={{ marginRight: "10px" }} />
                Select Company
              </h3>
              <FaTimes
                style={styles.modalClose}
                onClick={() => setShowCompanyModal(false)}
              />
            </div>
            <div style={styles.modalContent}>
              {COMPANIES.map((comp, idx) => (
                <div
                  key={idx}
                  style={styles.modalItem}
                  onClick={() => handleCompanySelect(comp.name)}
                >
                  {comp.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role Modal */}
      {showRoleModal && (
        <div style={styles.modalOverlay} onClick={() => setShowRoleModal(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FaUserTie style={{ marginRight: "10px" }} />
                Select Role
              </h3>
              <FaTimes
                style={styles.modalClose}
                onClick={() => setShowRoleModal(false)}
              />
            </div>
            <div style={styles.modalContent}>
              {availableRoles.length > 0 ? (
                <>
                  {availableRoles.map((r, idx) => (
                    <div
                      key={idx}
                      style={styles.modalItem}
                      onClick={() => handleRoleSelect(r)}
                    >
                      {r}
                    </div>
                  ))}
                  <div
                    style={styles.modalItemCustom}
                    onClick={() => handleRoleSelect("Custom Role")}
                  >
                    <FaEdit style={{ marginRight: "8px" }} />
                    Enter Custom Role
                  </div>
                </>
              ) : (
                <div
                  style={styles.modalItemCustom}
                  onClick={() => handleRoleSelect("Custom Role")}
                >
                  <FaEdit style={{ marginRight: "8px" }} />
                  Enter Custom Role
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Custom Company Input Modal */}
      {isCustomCompany && (
        <div style={styles.modalOverlay} onClick={() => setIsCustomCompany(false)}>
          <div style={styles.modalSmall} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FaBuilding style={{ marginRight: "10px" }} />
                Enter Custom Company
              </h3>
              <FaTimes
                style={styles.modalClose}
                onClick={() => setIsCustomCompany(false)}
              />
            </div>
            <div style={styles.modalContent}>
              <input
                style={styles.modalInput}
                type="text"
                placeholder="Enter company name"
                value={customCompanyInput}
                onChange={(e) => setCustomCompanyInput(e.target.value)}
                autoFocus
              />
              <button
                style={styles.modalSubmitBtn}
                onClick={handleCustomCompanySubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Role Input Modal */}
      {isCustomRole && (
        <div style={styles.modalOverlay} onClick={() => setIsCustomRole(false)}>
          <div style={styles.modalSmall} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FaUserTie style={{ marginRight: "10px" }} />
                Enter Custom Role
              </h3>
              <FaTimes
                style={styles.modalClose}
                onClick={() => setIsCustomRole(false)}
              />
            </div>
            <div style={styles.modalContent}>
              <input
                style={styles.modalInput}
                type="text"
                placeholder="Enter role name"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                autoFocus
              />
              <button
                style={styles.modalSubmitBtn}
                onClick={handleCustomRoleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
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
    maxWidth: "1000px",
    margin: "0 auto",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    border: "1px solid #e2e8f0",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  headerIcon: {
    fontSize: "40px",
    color: "#4a5568",
    marginBottom: "10px",
  },
  heading: {
    fontSize: "32px",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "16px",
    color: "#718096",
  },
  formSection: {
    marginBottom: "30px",
    padding: "20px",
    background: "#f7fafc",
    borderRadius: "12px",
  },
  inputRow: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  inputGroup: {
    flex: 1,
    minWidth: "250px",
  },
  selectTrigger: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    background: "#ffffff",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxSizing: "border-box",
  },
  selectDisabled: {
    background: "#f7fafc",
    cursor: "not-allowed",
    opacity: 0.6,
  },
  selectedText: {
    color: "#2d3748",
    fontWeight: "500",
  },
  placeholderText: {
    color: "#a0aec0",
  },
  selectIcon: {
    fontSize: "14px",
    color: "#4a5568",
  },
  btnFetch: {
    width: "100%",
    padding: "15px",
    background: "#4a5568",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    boxShadow: "0 4px 12px rgba(74, 85, 104, 0.3)",
    transition: "all 0.3s ease",
  },
  btnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  btnIcon: {
    fontSize: "18px",
  },
  spinner: {
    fontSize: "18px",
    animation: "spin 1s linear infinite",
  },
  error: {
    padding: "15px",
    background: "#fed7d7",
    color: "#742a2a",
    borderRadius: "8px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "600",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
    animation: "fadeIn 0.2s ease",
  },
  modal: {
    background: "#ffffff",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "70vh",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    animation: "slideUp 0.3s ease",
  },
  modalSmall: {
    background: "#ffffff",
    borderRadius: "16px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    animation: "slideUp 0.3s ease",
  },
  modalHeader: {
    padding: "20px 25px",
    borderBottom: "2px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#2d3748",
    display: "flex",
    alignItems: "center",
    margin: 0,
  },
  modalClose: {
    fontSize: "20px",
    color: "#718096",
    cursor: "pointer",
    transition: "color 0.3s ease",
  },
  modalContent: {
    padding: "20px 25px",
    maxHeight: "calc(70vh - 80px)",
    overflowY: "auto",
  },
  modalItem: {
    padding: "14px 18px",
    fontSize: "15px",
    color: "#2d3748",
    cursor: "pointer",
    borderRadius: "8px",
    marginBottom: "8px",
    background: "#f7fafc",
  },
  modalItemCustom: {
    padding: "14px 18px",
    fontSize: "15px",
    color: "#4a5568",
    cursor: "pointer",
    borderRadius: "8px",
    marginTop: "12px",
    background: "#e2e8f0",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
  },
  modalInput: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "15px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    outline: "none",
    marginBottom: "15px",
    boxSizing: "border-box",
    background: "#ffffff",
    color: "#000000",
  },
  modalSubmitBtn: {
    width: "100%",
    padding: "12px",
    background: "#4a5568",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  questionsContainer: {
    marginTop: "30px",
  },
  questionsHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
    gap: "15px",
  },
  questionsHeading: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#2d3748",
    margin: 0,
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  filterIcon: {
    fontSize: "18px",
    color: "#4a5568",
  },
  filterBtn: {
    padding: "8px 16px",
    background: "#f7fafc",
    color: "#4a5568",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  filterBtnActiveEasy: {
    background: "#48bb78",
    color: "#fff",
    borderColor: "#48bb78",
  },
  filterBtnActiveMedium: {
    background: "#ed8936",
    color: "#fff",
    borderColor: "#ed8936",
  },
  filterBtnActiveHard: {
    background: "#f56565",
    color: "#fff",
    borderColor: "#f56565",
  },
  noResults: {
    textAlign: "center",
    padding: "40px 20px",
    background: "#f7fafc",
    borderRadius: "12px",
    border: "2px dashed #e2e8f0",
  },
  noResultsIcon: {
    fontSize: "48px",
    color: "#cbd5e0",
    marginBottom: "15px",
  },
  noResultsText: {
    fontSize: "16px",
    color: "#718096",
    fontWeight: "500",
  },
  questionCard: {
    background: "#f7fafc",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    marginBottom: "15px",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  questionHeader: {
    padding: "20px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background 0.3s ease",
  },
  questionTitle: {
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    flex: 1,
  },
  questionNumber: {
    background: "#4a5568",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "14px",
    flexShrink: 0,
  },
  questionText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2d3748",
    flex: 1,
    wordBreak: "break-word",
  },
  questionMeta: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    flexShrink: 0,
  },
  difficulty: {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  chevron: {
    fontSize: "18px",
    color: "#4a5568",
  },
  questionDetails: {
    padding: "0 20px 20px 20px",
    borderTop: "1px solid #e2e8f0",
  },
  detailSection: {
    marginTop: "20px",
  },
  detailLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: "700",
    color: "#4a5568",
    marginBottom: "8px",
  },
  detailIcon: {
    fontSize: "16px",
  },
  detailText: {
    fontSize: "15px",
    color: "#2d3748",
    lineHeight: "1.6",
  },
};

// Add media query styles
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .interview-card {
        padding: 30px 20px !important;
      }
      .interview-heading {
        font-size: 28px !important;
      }
      .interview-header-icon {
        font-size: 35px !important;
      }
      .interview-input-row {
        flex-direction: column !important;
        gap: 15px !important;
      }
      .interview-input-group {
        min-width: 100% !important;
      }
      .interview-questions-header {
        flex-direction: column !important;
        align-items: flex-start !important;
      }
      .interview-filter-container {
        width: 100%;
        justify-content: flex-start !important;
      }
      .interview-question-header {
        flex-direction: column !important;
        gap: 10px !important;
        align-items: flex-start !important;
      }
      .interview-question-meta {
        align-self: flex-end;
      }
    }
    @media (max-width: 480px) {
      .interview-container {
        padding: 20px 10px !important;
      }
      .interview-card {
        padding: 25px 15px !important;
        border-radius: 12px !important;
      }
      .interview-heading {
        font-size: 24px !important;
      }
      .interview-subtitle {
        font-size: 14px !important;
      }
      .interview-header-icon {
        font-size: 30px !important;
      }
      .interview-form-section {
        padding: 15px !important;
      }
      .interview-questions-heading {
        font-size: 20px !important;
      }
      .interview-filter-btn {
        padding: 6px 12px !important;
        font-size: 12px !important;
      }
      .interview-filter-icon {
        font-size: 14px !important;
      }
      .interview-question-text {
        font-size: 14px !important;
      }
      .interview-question-number {
        font-size: 12px !important;
        padding: 4px 8px !important;
      }
      .interview-difficulty {
        font-size: 11px !important;
        padding: 4px 8px !important;
      }
      .interview-modal {
        width: 95% !important;
        max-width: 95% !important;
      }
      .interview-modal-small {
        width: 95% !important;
        max-width: 95% !important;
      }
    }
  `;
  document.head.appendChild(style);
}

export default Interview;
