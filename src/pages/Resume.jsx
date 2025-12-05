import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  Paper,
  Fade,
  Zoom,
  Stack,
} from "@mui/material";
import {
  Description,
  Person,
  Email,
  Phone,
  School,
  Code,
  Work,
  EmojiEvents,
  Download,
  Add,
  Close,
  CheckCircle,
  Warning as WarningIcon,
} from "@mui/icons-material";

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
  const [statusType, setStatusType] = useState("info");
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
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setStatus("Please fill in all required fields (Name, Email, Phone)");
      setStatusType("warning");
      return;
    }

    const cleanedData = {
      ...formData,
      skills: formData.skills.filter(s => s.trim() !== ""),
      certifications: formData.certifications.filter(c => c.trim() !== ""),
      projects: formData.projects.filter(p => p.title.trim() !== "" || p.description.trim() !== "")
    };

    if (cleanedData.skills.length === 0) {
      setStatus("Please add at least one skill");
      setStatusType("warning");
      return;
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
        setStatus("Resume generated successfully!");
        setStatusType("success");
      }
    } catch (err) {
      setStatus("Error: " + (err.response?.data?.message || err.message));
      setStatusType("error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', bgcolor: '#000000', py: 6, position: 'relative' }}>
      {/* Background accent */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
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
                <Description sx={{ fontSize: 50, color: '#ffffff' }} />
              </Box>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
                Resume Generator
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                Create your professional resume in minutes
              </Typography>
            </Box>

            <Card 
              elevation={0}
              sx={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #151515 100%)',
                border: '1px solid #222',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {/* Personal Information */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#050505', borderRadius: 3, border: '1px solid #1a1a1a' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Person sx={{ color: '#ffffff', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Personal Information
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Required fields are marked with *
                      </Typography>
                    </Box>
                  </Box>
                  
                  <TextField
                    fullWidth
                    label="Full Name *"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    sx={{ mb: 2.5 }}
                  />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address *"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                              <Email sx={{ fontSize: 20, color: 'text.secondary' }} />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Phone Number *"
                        name="phone"
                        type="tel"
                        placeholder="9999999999"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        InputProps={{
                          startAdornment: (
                            <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                              <Phone sx={{ fontSize: 20, color: 'text.secondary' }} />
                            </Box>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* Education */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#050505', borderRadius: 3, border: '1px solid #1a1a1a' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <School sx={{ color: '#ffffff', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Education
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Add your academic qualifications
                      </Typography>
                    </Box>
                  </Box>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="10th Grade"
                        name="tenth"
                        placeholder="92%"
                        value={formData.education.tenth}
                        onChange={handleEducationChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="12th Grade"
                        name="twelfth"
                        placeholder="90%"
                        value={formData.education.twelfth}
                        onChange={handleEducationChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Graduation"
                        name="graduation"
                        placeholder="8.5 CGPA"
                        value={formData.education.graduation}
                        onChange={handleEducationChange}
                      />
                    </Grid>
                  </Grid>
                </Paper>

                {/* Skills */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#050505', borderRadius: 3, border: '1px solid #1a1a1a' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Code sx={{ color: '#ffffff', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Skills *
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        List your technical and professional skills
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={2}>
                    {formData.skills.map((skill, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1.5 }}>
                        <TextField
                          fullWidth
                          placeholder="e.g., React, Node.js, Python"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: '#000000'
                            }
                          }}
                        />
                        {formData.skills.length > 1 && (
                          <IconButton
                            onClick={() => removeSkill(index)}
                            sx={{
                              bgcolor: 'rgba(245, 101, 101, 0.1)',
                              border: '1px solid rgba(245, 101, 101, 0.3)',
                              '&:hover': {
                                bgcolor: 'rgba(245, 101, 101, 0.2)',
                              }
                            }}
                          >
                            <Close sx={{ color: '#f56565' }} />
                          </IconButton>
                        )}
                      </Box>
                    ))}

                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={addSkill}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: '#333',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: '#ffffff',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                        }
                      }}
                    >
                      Add Another Skill
                    </Button>
                  </Stack>
                </Paper>

                {/* Projects */}
                <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: '#050505', borderRadius: 3, border: '1px solid #1a1a1a' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                      <Work sx={{ color: '#ffffff', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Projects
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Showcase your work and achievements
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={2}>
                    {formData.projects.map((project, index) => (
                      <Paper 
                        key={index} 
                        elevation={0} 
                        sx={{ 
                          p: 2.5, 
                          bgcolor: '#000000', 
                          border: '1px solid #1a1a1a',
                          borderRadius: 2
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
                          <Chip 
                            label={`Project ${index + 1}`}
                            size="small" 
                            sx={{
                              bgcolor: '#1a1a1a',
                              color: '#ffffff',
                              fontWeight: 700,
                              border: '1px solid #333',
                            }}
                          />
                          {formData.projects.length > 1 && (
                            <IconButton
                              size="small"
                              onClick={() => removeProject(index)}
                              sx={{
                                bgcolor: 'rgba(245, 101, 101, 0.1)',
                                '&:hover': { bgcolor: 'rgba(245, 101, 101, 0.2)' }
                              }}
                            >
                              <Close fontSize="small" sx={{ color: '#f56565' }} />
                            </IconButton>
                          )}
                        </Box>

                        <TextField
                          fullWidth
                          label="Project Title"
                          placeholder="My Awesome Project"
                          value={project.title}
                          onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                          sx={{ mb: 2 }}
                        />

                        <TextField
                          fullWidth
                          label="Description"
                          placeholder="Describe what this project does and the technologies used..."
                          value={project.description}
                          onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                          multiline
                          rows={3}
                        />
                      </Paper>
                    ))}

                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={addProject}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: '#333',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: '#ffffff',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                        }
                      }}
                    >
                      Add Another Project
                    </Button>
                  </Stack>
                </Paper>

                {/* Certifications */}
                <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: '#050505', borderRadius: 3, border: '1px solid #1a1a1a' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}>
                    <Box sx={{ p: 1.5, bgcolor: 'rgba(237, 137, 54, 0.1)', borderRadius: 2 }}>
                      <EmojiEvents sx={{ color: '#ed8936', fontSize: 24 }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={800}>
                        Certifications
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Add professional certifications and achievements
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={2}>
                    {formData.certifications.map((cert, index) => (
                      <Box key={index} sx={{ display: 'flex', gap: 1.5 }}>
                        <TextField
                          fullWidth
                          placeholder="e.g., AWS Cloud Practitioner"
                          value={cert}
                          onChange={(e) => handleCertificationChange(index, e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              bgcolor: '#000000'
                            }
                          }}
                        />
                        {formData.certifications.length > 1 && (
                          <IconButton
                            onClick={() => removeCertification(index)}
                            sx={{
                              bgcolor: 'rgba(245, 101, 101, 0.1)',
                              border: '1px solid rgba(245, 101, 101, 0.3)',
                              '&:hover': {
                                bgcolor: 'rgba(245, 101, 101, 0.2)',
                              }
                            }}
                          >
                            <Close sx={{ color: '#f56565' }} />
                          </IconButton>
                        )}
                      </Box>
                    ))}

                    <Button
                      variant="outlined"
                      startIcon={<Add />}
                      onClick={addCertification}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderWidth: 2,
                        borderStyle: 'dashed',
                        borderColor: '#333',
                        textTransform: 'none',
                        fontWeight: 600,
                        '&:hover': {
                          borderWidth: 2,
                          borderColor: '#ffffff',
                          bgcolor: 'rgba(255, 255, 255, 0.05)',
                        }
                      }}
                    >
                      Add Another Certification
                    </Button>
                  </Stack>
                </Paper>

                {/* Generate Button */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={generateResume}
                  disabled={loading}
                  sx={{
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    textTransform: 'none',
                    boxShadow: '0 8px 24px rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      boxShadow: '0 12px 32px rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                    mb: 2,
                  }}
                >
                  {loading ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1.5, color: '#000' }} />
                      Generating Your Resume...
                    </>
                  ) : (
                    "Generate Professional Resume"
                  )}
                </Button>

                {status && (
                  <Alert
                    severity={statusType}
                    icon={
                      statusType === "success" ? (
                        <CheckCircle />
                      ) : statusType === "warning" ? (
                        <WarningIcon />
                      ) : undefined
                    }
                    sx={{
                      mb: 2,
                      bgcolor: statusType === 'success' 
                        ? 'rgba(72, 187, 120, 0.1)' 
                        : statusType === 'warning' 
                        ? 'rgba(237, 137, 54, 0.1)' 
                        : 'rgba(245, 101, 101, 0.1)',
                      border: `1px solid ${
                        statusType === 'success' 
                          ? 'rgba(72, 187, 120, 0.3)' 
                          : statusType === 'warning' 
                          ? 'rgba(237, 137, 54, 0.3)' 
                          : 'rgba(245, 101, 101, 0.3)'
                      }`,
                      '& .MuiAlert-icon': {
                        color: statusType === 'success' 
                          ? '#48bb78' 
                          : statusType === 'warning' 
                          ? '#ed8936' 
                          : '#f56565'
                      }
                    }}
                  >
                    {status}
                  </Alert>
                )}

                {pdfUrl && (
                  <Zoom in>
                    <Button
                      component="a"
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="contained"
                      size="large"
                      startIcon={<Download />}
                      fullWidth
                      sx={{
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        textTransform: 'none',
                        bgcolor: '#48bb78',
                        color: '#000',
                        boxShadow: '0 8px 24px rgba(72, 187, 120, 0.3)',
                        '&:hover': {
                          bgcolor: '#38a169',
                          boxShadow: '0 12px 32px rgba(72, 187, 120, 0.4)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Download Your Resume
                    </Button>
                  </Zoom>
                )}
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Resume;
