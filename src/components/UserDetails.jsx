import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip,
  Button,
  Divider,
} from "@mui/material";

function UserDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || { formData: {} };

  if (Object.keys(formData).length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          p: 3,
          textAlign: 'center',
          bgcolor: '#ffffff',
        }}
      >
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2, maxWidth: 500 }}>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No User Data Found.
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            It looks like the form data wasn't submitted or loaded correctly.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/')} size="large">
            Go Back to Form
          </Button>
        </Paper>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch {
      return dateString;
    }
  };

  return (

    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, margin: 'auto', bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <Typography variant="h3" gutterBottom align="center" sx={{ mb: 4, fontWeight: 600, color: '#1565c0' }}>
        User Details Summary
      </Typography>

      {/* Personal Info */}
      <Paper elevation={4} sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 2, bgcolor: '#ffffff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }} >
  <Typography variant="h5" sx={{ color: '#1976d2', mb: 2 }}>Personal Information</Typography>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="Name" secondary={`${formData.firstname || 'N/A'} ${formData.lastname || 'N/A'}`} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Date of Birth" secondary={formatDate(formData.dateOfBirth)} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Citizenship" secondary={formData.citizenship || 'N/A'} />
          </ListItem>
          <ListItem disableGutters>
            <ListItemText primary="Dual Citizenship" />
            <Chip
              label={formData.hasDualCitizenship === "yes" ? "Yes" : "No"}
              color={formData.hasDualCitizenship === "yes" ? "success" : "warning"}
              size="small"
            />
          </ListItem>
          {formData.hasDualCitizenship === "yes" && (
            <ListItem disableGutters>
              <ListItemText primary="Second Citizenship" secondary={formData.secondCitizenship || 'N/A'} />
            </ListItem>
          )}
          <ListItem disableGutters>
            <ListItemText primary="Foreign Affiliations" />
            <Chip
              label={formData.hasForeignAffiliations ? "Yes" : "No"}
              color={formData.hasForeignAffiliations ? "success" : "error"}
              size="small"
            />
          </ListItem>
        </List>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Employment */}
      <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 2, elevation:  4, bgcolor: '#ffffff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
        <Typography variant="h5" sx={{ color: '#1976d2', mb: 2 }}>Employment History</Typography>
        {formData.employmentHistory?.length > 0 ? (
          formData.employmentHistory.map((job, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <Typography variant="h6">{job.jobTitle || 'No Title'} at {job.employer || 'No Employer'}</Typography>
              <Typography variant="body2">
                {formatDate(job.startDate)} – {job.currentlyWorking ? 'Present' : formatDate(job.endDate)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No employment history provided.</Typography>
        )}
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Education */}
      <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 2, elevation: 4, bgcolor: '#ffffff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
        <Typography variant="h5" sx={{ color: '#1976d2', mb: 2 }}>Education History</Typography>
        {formData.educationHistory?.length > 0 ? (
          formData.educationHistory.map((edu, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <Typography variant="h6">{edu.degree || 'No Degree'} from {edu.institution || 'No Institution'}</Typography>
              <Typography variant="body2">
                {formatDate(edu.startDate)} – {edu.currentlyStudying ? 'Present' : formatDate(edu.endDate)}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography>No education history provided.</Typography>
        )}
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Family */}
      <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 2, elevation: 4 , bgcolor: '#ffffff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
        <Typography variant="h5" sx={{ color: '#1976d2', mb: 2 }}>Family Members</Typography>
        {formData.familyMembers?.length > 0 ? (
          formData.familyMembers.map((member, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
              <Typography variant="h6">{member.fullName || 'Unnamed'} ({member.relationship || 'Unknown'})</Typography>
              <Typography variant="body2">Country of Residence: {member.country || 'N/A'}</Typography>
            </Box>
          ))
        ) : (
          <Typography>No family members provided.</Typography>
        )}
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Criminal History */}
      <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, borderRadius: 2, elevation: 4 , bgcolor: '#ffffff', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)' }}>
        <Typography variant="h5" sx={{ color: '#1976d2', mb: 2 }}>Criminal History</Typography>
        <List disablePadding>
          <ListItem disableGutters>
            <ListItemText primary="Ever Arrested or Charged?" />
            <Chip
              label={formData.arrested === "yes" ? "Yes" : "No"}
              color={formData.arrested === "yes" ? "success" : "warning"}
              size="small"
            />
          </ListItem>

          {formData.arrested === "yes" && formData.arrestDetails?.length > 0 && (
            <Box sx={{ mt: 2, pl: 2, borderLeft: '3px solid #fdd835' }}>
              {formData.arrestDetails.map((incident, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight="bold">Incident #{index + 1}</Typography>
                  <Typography variant="body2">Description: {incident.description || 'N/A'}</Typography>
                  <Typography variant="body2">Date: {formatDate(incident.date)}</Typography>
                </Box>
              ))}
            </Box>
          )}

          <ListItem disableGutters sx={{ mt: 2 }}>
            <ListItemText primary="Pending Cases?" />
            <Chip
              label={formData.pendingCase === "yes" ? "Yes" : "No"}
              color={formData.pendingCase === "yes" ? "success" : "error"}
              size="small"
            />
          </ListItem>
        </List>
      </Paper>

      {/* Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
        <Button variant="contained"  sx={{
            bgcolor: '#1976d2', 
            '&:hover': {
              bgcolor: '#1565c0', 
            },
            textTransform: 'none', 
          }}
          onClick={() => navigate('/')} size="large">
          Go Back to Form
        </Button>
      </Box>
    </Box>
  );
}

export default UserDetails;
