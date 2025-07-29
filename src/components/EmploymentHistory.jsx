import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";

import empvalidate from "../validation/EmploymentValidate"; 

const EmploymentHistory = ({ formData, updateFormData, gapExplanations, setGapExplanations, setParentErrors, submitted }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitted) {
      const validationErrors = empvalidate(
        formData,
        formData.employmentHistory,
        gapExplanations
      );
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, employmentHistory: validationErrors }));
    } else {
      setErrors({});
      setParentErrors((prev) => ({ ...prev, employmentHistory: {} }));
    }
    // eslint-disable-next-line
  }, [formData, gapExplanations, submitted]);

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...formData.employmentHistory];
    updatedJobs[index][field] = value;
    if (field === "currentlyWorking" && value) {
      updatedJobs[index].endDate = ""; 
    }
    updateFormData("employmentHistory", updatedJobs);

    if (submitted) {
      const validationErrors = empvalidate(
        { ...formData, employmentHistory: updatedJobs },
        updatedJobs,
        gapExplanations
      );
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, employmentHistory: validationErrors }));
    }
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
    setErrors((prev) => ({ ...prev, employmentHistory: undefined }));
  };

  const removeJob = (index) => {
    const updatedJobs = [...formData.employmentHistory];
    updatedJobs.splice(index, 1);
    updateFormData("employmentHistory", updatedJobs);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.employmentHistory) {
        newErrors.employmentHistory.splice(index, 1);
      }
      return newErrors;
    });

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
      {submitted && errors.employmentHistory && errors.employmentHistory.general && (
        <FormHelperText error>{errors.employmentHistory.general}</FormHelperText>
      )}

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
            error={submitted && !!errors.employmentHistory?.[index]?.jobTitle}
            helperText={submitted ? errors.employmentHistory?.[index]?.jobTitle : ''}
          />
          <TextField
            label="Employer"
            value={job.employer}
            onChange={(e) =>
              handleJobChange(index, "employer", e.target.value)
            }
            fullWidth
            margin="dense"
            error={submitted && !!errors.employmentHistory?.[index]?.employer}
            helperText={submitted ? errors.employmentHistory?.[index]?.employer : ''}
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
            error={submitted && !!errors.employmentHistory?.[index]?.startDate}
            helperText={submitted ? errors.employmentHistory?.[index]?.startDate : ''}
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
              error={submitted && !!errors.employmentHistory?.[index]?.endDate}
              helperText={submitted ? errors.employmentHistory?.[index]?.endDate : ''}
            />
          )}
          {submitted && errors.employmentHistory?.[index]?.overlap && (
            <FormHelperText error>
              {errors.employmentHistory[index].overlap}
            </FormHelperText>
          )}
          {submitted && errors.gapExplanations?.[index] && (
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
};

export default EmploymentHistory;