import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";

import eduvalidate from "../validation/EducationValidate";

const EducationHistory = ({ formData, updateFormData, setParentErrors, submitted }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitted) {
      const validationErrors = eduvalidate(formData);
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, educationHistory: validationErrors }));
    } else {
      setErrors({});
      setParentErrors((prev) => ({ ...prev, educationHistory: {} }));
    }
  }, [formData, submitted]);
  
  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.educationHistory];
    updated[index][field] = value;
    updateFormData("educationHistory", updated);

    if (submitted) {
      const validationErrors = eduvalidate({ ...formData, educationHistory: updated });
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, educationHistory: validationErrors }));
    }
  };

  const addEducation = () => {
    updateFormData("educationHistory", [
      ...formData.educationHistory,
      { degree: "", institution: "", startDate: "", endDate: "" },
    ]);
    setErrors((prev) => ({ ...prev, educationHistory: undefined }));
  };

  const removeEducation = (index) => {
    const updated = [...formData.educationHistory];
    updated.splice(index, 1);
    updateFormData("educationHistory", updated);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.educationHistory) {
        newErrors.educationHistory.splice(index, 1);
      }
      return newErrors;
    });
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Education
      </Typography>

      <Button variant="contained" color="secondary" onClick={addEducation}>
        Add Education
      </Button>
      {submitted && errors.educationHistory && errors.educationHistory.general && (
        <FormHelperText error>{errors.educationHistory.general}</FormHelperText>
      )}

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
            error={submitted && !!errors.educationHistory?.[index]?.degree}
            helperText={submitted ? errors.educationHistory?.[index]?.degree : ''}
          />

          <TextField
            label="Institution"
            value={edu.institution}
            onChange={(e) =>
              handleEducationChange(index, "institution", e.target.value)
            }
            fullWidth
            margin="dense"
            error={submitted && !!errors.educationHistory?.[index]?.institution}
            helperText={submitted ? errors.educationHistory?.[index]?.institution : ''}
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
            error={submitted && !!errors.educationHistory?.[index]?.startDate}
            helperText={submitted ? errors.educationHistory?.[index]?.startDate : ''}
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
            error={submitted && !!errors.educationHistory?.[index]?.endDate}
            helperText={submitted ? errors.educationHistory?.[index]?.endDate : ''}
          />
          {submitted && errors.educationHistory?.[index]?.dateOverlap && (
            <FormHelperText error>
              {errors.educationHistory[index].dateOverlap}
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
    </Box>
  );
};

export default EducationHistory;