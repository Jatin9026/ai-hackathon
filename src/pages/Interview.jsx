import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  TextField,
  Alert,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Fade,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  Work,
  Business,
  Person,
  Close,
  ExpandMore,
  ExpandLess,
  Lightbulb,
  Help,
  ArrowForward,
  FilterList,
  Edit,
} from "@mui/icons-material";

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
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "error";
      default:
        return "default";
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
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#000000', py: 6, position: 'relative' }}>
      {/* Background accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={500}>
          <Box>
            {/* Header Section */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                  border: '2px solid #333',
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.05)',
                }}
              >
                <Work sx={{ fontSize: 50, color: '#ffffff' }} />
              </Box>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                Interview Preparation
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                Welcome, <Box component="span" sx={{ color: '#ffffff', fontWeight: 700 }}>{currentUser}</Box>! Master your upcoming interviews
              </Typography>
            </Box>

            {/* Selection Card */}
            <Card 
              elevation={0} 
              sx={{ 
                mb: 4,
                background: 'linear-gradient(135deg, #0a0a0a 0%, #151515 100%)',
                border: '1px solid #222',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #ffffff 0%, #666 50%, #ffffff 100%)',
                }
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ width: 4, height: 24, bgcolor: '#ffffff', borderRadius: 1 }} />
                  Interview Configuration
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Business />}
                    onClick={() => setShowCompanyModal(true)}
                    sx={{
                      py: 2,
                      justifyContent: 'flex-start',
                      borderColor: company ? '#ffffff' : '#333',
                      borderWidth: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', mb: 0.5 }}>
                        COMPANY
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {company || "Select Company"}
                      </Typography>
                    </Box>
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Person />}
                    onClick={() => {
                      if (availableRoles.length > 0 || company) {
                        setShowRoleModal(true);
                      }
                    }}
                    disabled={!company}
                    sx={{
                      py: 2,
                      justifyContent: 'flex-start',
                      borderColor: role ? '#ffffff' : '#333',
                      borderWidth: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      '&:hover': {
                        borderColor: '#ffffff',
                        borderWidth: 2,
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem', mb: 0.5 }}>
                        ROLE
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {role || (!company ? "Select company first" : "Select Role")}
                      </Typography>
                    </Box>
                  </Button>
                </Stack>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: '#000' }} /> : <Help />}
                  onClick={fetchQuestions}
                  disabled={loading || !company || !role}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      boxShadow: '0 12px 32px rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? "Generating Questions..." : "Get Interview Questions"}
                </Button>
              </CardContent>
            </Card>

            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  bgcolor: 'rgba(245, 101, 101, 0.1)',
                  border: '1px solid rgba(245, 101, 101, 0.3)',
                  '& .MuiAlert-icon': { color: '#f56565' }
                }}
              >
                {error}
              </Alert>
            )}

            {questions.length > 0 && (
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 4, 
                  flexWrap: 'wrap', 
                  gap: 2,
                  p: 3,
                  bgcolor: '#0a0a0a',
                  borderRadius: 3,
                  border: '1px solid #222'
                }}>
                  <Box>
                    <Typography variant="h5" fontWeight={800} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 4, height: 28, bgcolor: '#ffffff', borderRadius: 1 }} />
                      Interview Questions
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, ml: 2.5 }}>
                      {filteredQuestions.length} questions ready for practice
                    </Typography>
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
                    <FilterList sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <ToggleButtonGroup
                      value={difficultyFilter}
                      exclusive
                      onChange={(e, newValue) => setDifficultyFilter(newValue || "")}
                      size="small"
                      sx={{
                        gap: 1,
                        '& .MuiToggleButton-root': {
                          border: '2px solid #333',
                          borderRadius: 2,
                          px: 2,
                          py: 0.5,
                          textTransform: 'none',
                          fontWeight: 700,
                          fontSize: '0.875rem',
                          '&.Mui-selected': {
                            borderWidth: 2,
                          }
                        }
                      }}
                    >
                      <ToggleButton value="easy" color="success">
                        Easy
                      </ToggleButton>
                      <ToggleButton value="medium" color="warning">
                        Medium
                      </ToggleButton>
                      <ToggleButton value="hard" color="error">
                        Hard
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Stack>
                </Box>

                <Stack spacing={2}>
                  {filteredQuestions.map((q, index) => (
                    <Card 
                      key={index} 
                      elevation={0} 
                      sx={{ 
                        border: '2px solid #222',
                        bgcolor: '#0a0a0a',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: '#444',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(255, 255, 255, 0.05)',
                        }
                      }}
                    >
                      <CardContent
                        sx={{ cursor: 'pointer', p: 3 }}
                        onClick={() => toggleExpanded(index)}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                          <Box sx={{ display: 'flex', gap: 2, flex: 1, alignItems: 'flex-start' }}>
                            <Chip
                              label={`Q${index + 1}`}
                              sx={{
                                bgcolor: '#1a1a1a',
                                color: '#ffffff',
                                fontWeight: 800,
                                fontSize: '0.875rem',
                                border: '1px solid #333',
                                height: 32,
                                minWidth: 48,
                              }}
                            />
                            <Typography variant="body1" fontWeight={600} sx={{ flex: 1, fontSize: '1.05rem', lineHeight: 1.6 }}>
                              {q.question}
                            </Typography>
                          </Box>

                          <Stack direction="row" spacing={1} alignItems="center">
                            <Chip
                              label={q.difficulty}
                              color={getDifficultyColor(q.difficulty)}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.05em',
                              }}
                            />
                            <IconButton 
                              size="small"
                              sx={{
                                bgcolor: '#1a1a1a',
                                border: '1px solid #333',
                                '&:hover': { bgcolor: '#222' }
                              }}
                            >
                              {expandedIndex === index ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </Stack>
                        </Box>

                        <Collapse in={expandedIndex === index}>
                          <Box sx={{ mt: 3, pt: 3, borderTop: '2px solid #1a1a1a' }}>
                            <Stack spacing={3}>
                              <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#050505', border: '1px solid #1a1a1a', borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                  <Box sx={{ p: 1, bgcolor: 'rgba(237, 137, 54, 0.1)', borderRadius: 1.5 }}>
                                    <Lightbulb sx={{ color: '#ed8936', fontSize: 20 }} />
                                  </Box>
                                  <Typography variant="subtitle2" fontWeight={800} sx={{ fontSize: '0.95rem' }}>
                                    Ideal Answer
                                  </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, pl: 5.5 }}>
                                  {q.ideal_answer}
                                </Typography>
                              </Paper>

                              <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#050505', border: '1px solid #1a1a1a', borderRadius: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                  <Box sx={{ p: 1, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1.5 }}>
                                    <Help sx={{ color: '#ffffff', fontSize: 20 }} />
                                  </Box>
                                  <Typography variant="subtitle2" fontWeight={800} sx={{ fontSize: '0.95rem' }}>
                                    Explanation
                                  </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, pl: 5.5 }}>
                                  {q.explanation}
                                </Typography>
                              </Paper>

                              {q.follow_up && (
                                <Paper elevation={0} sx={{ p: 2.5, bgcolor: '#050505', border: '1px solid #1a1a1a', borderRadius: 2 }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                                    <Box sx={{ p: 1, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1.5 }}>
                                      <ArrowForward sx={{ color: '#ffffff', fontSize: 20 }} />
                                    </Box>
                                    <Typography variant="subtitle2" fontWeight={800} sx={{ fontSize: '0.95rem' }}>
                                      Follow-up Question
                                    </Typography>
                                  </Box>
                                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, pl: 5.5 }}>
                                    {q.follow_up}
                                  </Typography>
                                </Paper>
                              )}
                            </Stack>
                          </Box>
                        </Collapse>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredQuestions.length === 0 && (
                    <Paper 
                      sx={{ 
                        p: 8, 
                        textAlign: 'center', 
                        bgcolor: '#0a0a0a', 
                        border: '2px dashed #222',
                        borderRadius: 3
                      }}
                    >
                      <Help sx={{ fontSize: 64, color: '#333', mb: 2 }} />
                      <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                        No Questions Found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your difficulty filter
                      </Typography>
                    </Paper>
                  )}
                </Stack>
              </Box>
            )}
          </Box>
        </Fade>

        {/* Modals remain the same */}
        <Dialog open={showCompanyModal} onClose={() => setShowCompanyModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business />
                <Typography variant="h6">Select Company</Typography>
              </Box>
              <IconButton onClick={() => setShowCompanyModal(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <List>
              {COMPANIES.map((comp, idx) => (
                <ListItemButton
                  key={idx}
                  onClick={() => {
                    if (comp.name === "Other (Custom)") {
                      setIsCustomCompany(true);
                      setCustomCompanyInput("");
                      setShowCompanyModal(false);
                    } else {
                      setIsCustomCompany(false);
                      setCompany(comp.name);
                      const selectedCompany = COMPANIES.find(c => c.name === comp.name);
                      setAvailableRoles(selectedCompany ? selectedCompany.roles : []);
                      setRole("");
                      setShowCompanyModal(false);
                    }
                  }}
                  sx={{ borderRadius: 2, mb: 1 }}
                >
                  <ListItemText primary={comp.name} />
                </ListItemButton>
              ))}
            </List>
          </DialogContent>
        </Dialog>

        {/* Role Modal */}
        <Dialog open={showRoleModal} onClose={() => setShowRoleModal(false)} maxWidth="sm" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person />
                <Typography variant="h6">Select Role</Typography>
              </Box>
              <IconButton onClick={() => setShowRoleModal(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <List>
              {availableRoles.length > 0 ? (
                <>
                  {availableRoles.map((r, idx) => (
                    <ListItemButton
                      key={idx}
                      onClick={() => {
                        if (r === "Custom Role") {
                          setIsCustomRole(true);
                          setCustomRoleInput("");
                          setShowRoleModal(false);
                        } else {
                          setIsCustomRole(false);
                          setRole(r);
                          setShowRoleModal(false);
                        }
                      }}
                      sx={{ borderRadius: 2, mb: 1 }}
                    >
                      <ListItemText primary={r} />
                    </ListItemButton>
                  ))}
                  <ListItemButton
                    onClick={() => {
                      setIsCustomRole(true);
                      setCustomRoleInput("");
                      setShowRoleModal(false);
                    }}
                    sx={{ borderRadius: 2, bgcolor: '#f7fafc', fontWeight: 600 }}
                  >
                    <Edit sx={{ mr: 1 }} />
                    <ListItemText primary="Enter Custom Role" />
                  </ListItemButton>
                </>
              ) : (
                <ListItemButton
                  onClick={() => {
                    setIsCustomRole(true);
                    setCustomRoleInput("");
                    setShowRoleModal(false);
                  }}
                  sx={{ borderRadius: 2, bgcolor: '#f7fafc', fontWeight: 600 }}
                >
                  <Edit sx={{ mr: 1 }} />
                  <ListItemText primary="Enter Custom Role" />
                </ListItemButton>
              )}
            </List>
          </DialogContent>
        </Dialog>

        {/* Custom Company Input */}
        <Dialog open={isCustomCompany} onClose={() => setIsCustomCompany(false)} maxWidth="xs" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Enter Custom Company</Typography>
              <IconButton onClick={() => setIsCustomCompany(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Company Name"
              placeholder="Enter company name"
              value={customCompanyInput}
              onChange={(e) => setCustomCompanyInput(e.target.value)}
              autoFocus
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                if (customCompanyInput.trim()) {
                  setCompany(customCompanyInput.trim());
                  setAvailableRoles([]);
                  setRole("");
                  setIsCustomCompany(false);
                }
              }}
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>

        {/* Custom Role Input */}
        <Dialog open={isCustomRole} onClose={() => setIsCustomRole(false)} maxWidth="xs" fullWidth>
          <DialogTitle>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6">Enter Custom Role</Typography>
              <IconButton onClick={() => setIsCustomRole(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Role Name"
              placeholder="Enter role name"
              value={customRoleInput}
              onChange={(e) => setCustomRoleInput(e.target.value)}
              autoFocus
              sx={{ mb: 2 }}
            />
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                if (customRoleInput.trim()) {
                  setRole(customRoleInput.trim());
                  setIsCustomRole(false);
                }
              }}
            >
              Submit
            </Button>
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Interview;
