import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import crimiValidate from "../validation/CriminalValidate";

const CriminalHistory = ({ formData, updateFormData, setParentErrors, submitted }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitted) {
      const validationErrors = crimiValidate(formData);
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, criminalHistory: validationErrors }));
    } else {
      setErrors({});
      setParentErrors((prev) => ({ ...prev, criminalHistory: {} }));
    }
  }, [formData, submitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
    if (submitted) {
      const validationErrors = crimiValidate({ ...formData, [name]: value });
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, criminalHistory: validationErrors }));
    }
  };

  const handleArrestDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.arrestDetails];
    updatedDetails[index][field] = value;
    updateFormData("arrestDetails", updatedDetails);
    if (submitted) {
      const validationErrors = crimiValidate({ ...formData, arrestDetails: updatedDetails });
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, criminalHistory: validationErrors }));
    }
  };

  const addArrestDetail = () => {
    updateFormData("arrestDetails", [
      ...formData.arrestDetails,
      { description: "", date: "" },
    ]);
    setErrors((prev) => ({ ...prev, arrestDetails: undefined }));
  };

  const removeArrestDetail = (index) => {
    const updatedDetails = [...formData.arrestDetails];
    updatedDetails.splice(index, 1);
    updateFormData("arrestDetails", updatedDetails);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.arrestDetails) {
        newErrors.arrestDetails.splice(index, 1);
      }
      return newErrors;
    });
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Criminal History
      </Typography>

      <FormControl fullWidth margin="normal" error={submitted && !!errors.arrested}>
        <InputLabel id="arrested-label">Have you ever been arrested?</InputLabel>
        <Select
          labelId="arrested-label"
          name="arrested"
          value={formData.arrested}
          onChange={handleChange}
          label="Have you ever been arrested?"
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
        {submitted && errors.arrested && (
          <FormHelperText>{errors.arrested}</FormHelperText>
        )}
      </FormControl>

      {formData.arrested === "yes" && (
        <Box>
          <Button
            variant="contained"
            color="info"
            onClick={addArrestDetail}
            sx={{ mt: 2, mb: 1 }}
          >
            Add Arrest Incident
          </Button>
          {submitted && errors.arrestDetails && errors.arrestDetails.general && (
            <FormHelperText error>{errors.arrestDetails.general}</FormHelperText>
          )}

          {formData.arrestDetails.map((incident, index) => (
            <Paper key={index} sx={{ p: 2, mt: 2 }} elevation={2}>
              <TextField
                label="Incident Description"
                value={incident.description}
                onChange={(e) =>
                  handleArrestDetailChange(index, "description", e.target.value)
                }
                fullWidth
                margin="dense"
                multiline
                rows={2}
                error={submitted && !!errors.arrestDetails?.[index]?.description}
                helperText={submitted ? errors.arrestDetails?.[index]?.description : ''}
              />
              <TextField
                label="Date of Incident"
                type="date"
                value={incident.date}
                onChange={(e) =>
                  handleArrestDetailChange(index, "date", e.target.value)
                }
                fullWidth
                margin="dense"
                InputLabelProps={{ shrink: true }}
                error={submitted && !!errors.arrestDetails?.[index]?.date}
                helperText={submitted ? errors.arrestDetails?.[index]?.date : ''}
              />
              {submitted && errors.arrestDetails?.[index]?.overlap && (
                <FormHelperText error>
                  {errors.arrestDetails[index].overlap}
                </FormHelperText>
              )}
              <Button
                color="error"
                variant="text"
                size="small"
                onClick={() => removeArrestDetail(index)}
                sx={{ mt: 1 }}
              >
                Remove Incident
              </Button>
            </Paper>
          ))}
        </Box>
      )}

      <FormControl fullWidth margin="normal" error={submitted && !!errors.pendingCase}>
        <InputLabel id="pending-case-label">Are any cases still pending?</InputLabel>
        <Select
          labelId="pending-case-label"
          name="pendingCase"
          value={formData.pendingCase}
          onChange={handleChange}
          label="Are any cases still pending?"
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
        {submitted && errors.pendingCase && (
          <FormHelperText>{errors.pendingCase}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};

export default CriminalHistory;