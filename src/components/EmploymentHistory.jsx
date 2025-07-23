import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

function EmploymentHistory({
  formData,
  updateFormData,
  gapExplanations,
  setGapExplanations,
  errors,
}) {
  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...formData.employmentHistory];
    updatedJobs[index][field] = value;
    if (field === "currentlyWorking" && value) {
      updatedJobs[index].endDate = ""; // Clear end date if currently working
    }
    updateFormData("employmentHistory", updatedJobs);
  };

  const addJob = () => {
    updateFormData("employmentHistory", [
      ...formData.employmentHistory,
      {
        jobTitle: "",
        employer: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
      },
    ]);
  };

  const removeJob = (index) => {
    const updatedJobs = [...formData.employmentHistory];
    updatedJobs.splice(index, 1);
    updateFormData("employmentHistory", updatedJobs);

    // Also remove the corresponding gap explanation if it exists
    const newGapExplanations = { ...gapExplanations };
    delete newGapExplanations[index];
    setGapExplanations(newGapExplanations);
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Employment History
      </Typography>

      <Button variant="contained" color="success" onClick={addJob}>
        Add Job
      </Button>

      {formData.employmentHistory.map((job, index) => (
        <Paper key={index} sx={{ p: 2, mt: 2 }} elevation={3}>
          <TextField
            label="Job Title"
            value={job.jobTitle}
            onChange={(e) =>
              handleJobChange(index, "jobTitle", e.target.value)
            }
            fullWidth
            margin="dense"
            error={!!errors.employmentHistory?.[index]?.jobTitle}
            helperText={errors.employmentHistory?.[index]?.jobTitle}
          />

          <TextField
            label="Employer"
            value={job.employer}
            onChange={(e) => handleJobChange(index, "employer", e.target.value)}
            fullWidth
            margin="dense"
            error={!!errors.employmentHistory?.[index]?.employer}
            helperText={errors.employmentHistory?.[index]?.employer}
          />

          <TextField
            label="Start Date"
            type="date"
            value={job.startDate}
            onChange={(e) =>
              handleJobChange(index, "startDate", e.target.value)
            }
            fullWidth
            margin="dense"
            InputLabelProps={{ shrink: true }}
            error={!!errors.employmentHistory?.[index]?.startDate}
            helperText={errors.employmentHistory?.[index]?.startDate}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={job.currentlyWorking}
                onChange={(e) =>
                  handleJobChange(index, "currentlyWorking", e.target.checked)
                }
              />
            }
            label="Currently Working"
          />

          {!job.currentlyWorking && (
            <TextField
              label="End Date"
              type="date"
              value={job.endDate}
              onChange={(e) =>
                handleJobChange(index, "endDate", e.target.value)
              }
              fullWidth
              margin="dense"
              InputLabelProps={{ shrink: true }}
              error={!!errors.employmentHistory?.[index]?.endDate}
              helperText={errors.employmentHistory?.[index]?.endDate}
            />
          )}

          {errors.employmentHistory?.[index]?.overlap && (
            <FormHelperText error>
              {errors.employmentHistory[index].overlap}
            </FormHelperText>
          )}

          {errors.gapExplanations?.[index] && (
            <TextField
              label="Gap Explanation"
              multiline
              rows={2}
              fullWidth
              value={gapExplanations[index] || ""}
              onChange={(e) =>
                setGapExplanations((prev) => ({
                  ...prev,
                  [index]: e.target.value,
                }))
              }
              error={!!errors.gapExplanations?.[index]}
              helperText={errors.gapExplanations?.[index]}
              margin="dense"
            />
          )}

          <Button
            color="error"
            variant="text"
            size="small"
            onClick={() => removeJob(index)}
            sx={{ mt: 1 }}
          >
            Remove Job
          </Button>
        </Paper>
      ))}
    </Box>
  );
}

export default EmploymentHistory;