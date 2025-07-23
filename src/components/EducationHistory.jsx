import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";

function EducationHistory({ formData, updateFormData, errors }) {
  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.educationHistory];
    updated[index][field] = value;
    updateFormData("educationHistory", updated);
  };

  const addEducation = () => {
    updateFormData("educationHistory", [
      ...formData.educationHistory,
      { degree: "", institution: "", startDate: "", endDate: "" },
    ]);
  };

  const removeEducation = (index) => {
    const updated = [...formData.educationHistory];
    updated.splice(index, 1);
    updateFormData("educationHistory", updated);
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Education
      </Typography>

      <Button variant="contained" color="secondary" onClick={addEducation}>
        Add Education
      </Button>

      {formData.educationHistory.map((edu, index) => (
        <Paper key={index} sx={{ p: 2, mt: 2 }} elevation={3}>
          <TextField
            label="Degree"
            value={edu.degree}
            onChange={(e) =>
              handleEducationChange(index, "degree", e.target.value)
            }
            fullWidth
            margin="dense"
            error={!!errors.educationHistory?.[index]?.degree}
            helperText={errors.educationHistory?.[index]?.degree}
          />

          <TextField
            label="Institution"
            value={edu.institution}
            onChange={(e) =>
              handleEducationChange(index, "institution", e.target.value)
            }
            fullWidth
            margin="dense"
            error={!!errors.educationHistory?.[index]?.institution}
            helperText={errors.educationHistory?.[index]?.institution}
          />

          <TextField
            label="Start Date"
            type="date"
            value={edu.startDate}
            onChange={(e) =>
              handleEducationChange(index, "startDate", e.target.value)
            }
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            error={!!errors.educationHistory?.[index]?.startDate}
            helperText={errors.educationHistory?.[index]?.startDate}
          />

          <TextField
            label="End Date"
            type="date"
            value={edu.endDate}
            onChange={(e) =>
              handleEducationChange(index, "endDate", e.target.value)
            }
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            error={!!errors.educationHistory?.[index]?.endDate}
            helperText={errors.educationHistory?.[index]?.endDate}
          />

          {errors.educationHistory?.[index]?.overlap && (
            <FormHelperText error>
              {errors.educationHistory[index].overlap}
            </FormHelperText>
          )}

          <Button
            color="error"
            variant="text"
            size="small"
            onClick={() => removeEducation(index)}
            sx={{ mt: 1 }}
          >
            Remove Education
          </Button>
        </Paper>
      ))}

      {/* This error message displays if no education entries are added at all */}
      {errors.educationHistory && !Array.isArray(errors.educationHistory) && (
        <FormHelperText error>
          {errors.educationHistory.degree}
        </FormHelperText>
      )}
    </Box>
  );
}

export default EducationHistory;