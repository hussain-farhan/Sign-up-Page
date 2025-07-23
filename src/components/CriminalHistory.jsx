import React from "react";
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

function CriminalHistory({ formData, updateFormData, errors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleArrestDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.arrestDetails];
    updatedDetails[index][field] = value;
    updateFormData("arrestDetails", updatedDetails);
  };

  const addArrestDetail = () => {
    updateFormData("arrestDetails", [
      ...formData.arrestDetails,
      { description: "", date: "" },
    ]);
  };

  const removeArrestDetail = (index) => {
    const updatedDetails = [...formData.arrestDetails];
    updatedDetails.splice(index, 1);
    updateFormData("arrestDetails", updatedDetails);
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Criminal History
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Have you ever been arrested?</InputLabel>
        <Select
          name="arrested"
          value={formData.arrested}
          onChange={handleChange}
          label="Have you ever been arrested?"
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
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
                error={!!errors.arrestDetails?.[index]?.description}
                helperText={errors.arrestDetails?.[index]?.description}
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
                error={!!errors.arrestDetails?.[index]?.date}
                helperText={errors.arrestDetails?.[index]?.date}
              />
              {errors.arrestDetails?.[index]?.overlap && (
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

      <FormControl fullWidth margin="normal">
        <InputLabel>Are any cases still pending?</InputLabel>
        <Select
          name="pendingCase"
          value={formData.pendingCase}
          onChange={handleChange}
          label="Are any cases still pending?"
        >
          <MenuItem value="no">No</MenuItem>
          <MenuItem value="yes">Yes</MenuItem>
        </Select>
        {errors.pendingCase && (
          <FormHelperText error>{errors.pendingCase}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}

export default CriminalHistory;