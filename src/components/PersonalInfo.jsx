import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

function PersonalInfo({ formData, updateFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>

      <TextField
        label="First Name"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.firstname}
        helperText={errors.firstname}
      />

      <TextField
        label="Last Name"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.lastname}
        helperText={errors.lastname}
      />

      <TextField
        label="Date of Birth"
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        error={!!errors.dateOfBirth}
        helperText={errors.dateOfBirth}
      />

      <TextField
        label="Country of Citizenship"
        name="citizenship"
        value={formData.citizenship}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.citizenship}
        helperText={errors.citizenship}
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Dual Citizenship</InputLabel>
        <Select
          name="hasDualCitizenship"
          value={formData.hasDualCitizenship}
          onChange={handleChange}
          label="Dual Citizenship"
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
      </FormControl>

      {formData.hasDualCitizenship === "yes" && (
        <TextField
          label="Second Country"
          name="secondCitizenship"
          value={formData.secondCitizenship}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.secondCitizenship}
          helperText={errors.secondCitizenship}
        />
      )}
    </Box>
  );
}

export default PersonalInfo;