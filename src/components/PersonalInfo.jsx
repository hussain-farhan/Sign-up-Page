import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText, 
} from "@mui/material";

import personalValidate from "../validation/PersonalValidate";

const PersonalInfo = ({ formData, updateFormData, setParentErrors, submitted }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitted) {
      const validationErrors = personalValidate(formData);
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, personalInfo: validationErrors }));
    } else {
      setErrors({});
      setParentErrors((prev) => ({ ...prev, personalInfo: {} }));
    }
  }, [formData, submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);

    if (submitted) {
      const validationErrors = personalValidate({ ...formData, [name]: value });
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, personalInfo: validationErrors }));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>

      <TextField
        label="First Name*"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={submitted && !!errors.firstname}
        helperText={submitted ? errors.firstname : ''}
      />

      <TextField
        label="Last Name*"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={submitted && !!errors.lastname}
        helperText={submitted ? errors.lastname : ''}
      />

      <TextField
        label="Email*"
        type="email"
        name="email"
        value={formData.email} 
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={submitted && !!errors.email}
        helperText={submitted ? errors.email : ''}
      />

      <TextField
        label="Phone Number*"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={submitted && !!errors.phoneNumber}
        helperText={submitted ? errors.phoneNumber : ''}
        />

      <TextField
        label="Date of Birth*"
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={submitted && !!errors.dateOfBirth}
        helperText={submitted ? errors.dateOfBirth : ''}
      />

      <TextField
        label="Country of Citizenship*"
        name="citizenship"
        value={formData.citizenship}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={submitted && !!errors.citizenship}
        helperText={submitted ? errors.citizenship : ''}
      />

      <FormControl fullWidth margin="normal" error={submitted && !!errors.hasDualCitizenship}>
        <InputLabel id="hasDualCitizenship-label">Dual Citizenship</InputLabel>
        <Select
          labelId="hasDualCitizenship-label"
          name="hasDualCitizenship"
          value={formData.hasDualCitizenship}
          onChange={handleChange}
          label="Dual Citizenship"
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
        {submitted && errors.hasDualCitizenship && (
          <FormHelperText>{errors.hasDualCitizenship}</FormHelperText>
        )}
      </FormControl>

      {formData.hasDualCitizenship === "yes" && (
        <TextField
          label="Second Country"
          name="secondCitizenship"
          value={formData.secondCitizenship}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={submitted && !!errors.secondCitizenship}
          helperText={submitted ? errors.secondCitizenship : ''}
        />
      )}
    </Box>
  );
};

export default PersonalInfo;