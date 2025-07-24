import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from "@mui/material";

import PersonalInfo from "./PersonalInfo";
import EmploymentHistory from "./EmploymentHistory";
import EducationHistory from "./EducationHistory";
import FamilyMembers from "./FamilyMembers";
import CriminalHistory from "./CriminalHistory";

import validateForm from "../validation/validateForm";

function Form() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    "Personal Information",
    "Employment History",
    "Education History",
    "Family Members",
    "Criminal History",
  ];

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    citizenship: "",
    hasDualCitizenship: "no",
    secondCitizenship: "",
    employmentHistory: [],
    educationHistory: [],
    familyMembers: [],
    hasForeignAffiliations: false,
    arrested: "no",
    arrestDetails: [],
    pendingCase: "no",
  });

  const [errors, setErrors] = useState({});
  const [gapExplanations, setGapExplanations] = useState({});

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
  
    const validationErrors = validateForm(formData, gapExplanations);
    setErrors(validationErrors);

    let currentStepHasErrors = false;
    switch (activeStep) {
      case 0: 
        if (validationErrors.firstname || validationErrors.lastname || validationErrors.dateOfBirth || validationErrors.citizenship || validationErrors.secondCitizenship) {
          currentStepHasErrors = true;
        }
        break;
      case 1: 
        if (validationErrors.employmentHistory || validationErrors.gapExplanations) {
          currentStepHasErrors = true;
        }
        break;
      case 2: 
        if (validationErrors.educationHistory) {
          currentStepHasErrors = true;
        }
        break;
      case 3: 
        if (validationErrors.familyMembers) {
          currentStepHasErrors = true;
        }
        break;
      case 4: 
        if (validationErrors.arrested || validationErrors.arrestDetails || validationErrors.pendingCase) {
          currentStepHasErrors = true;
        }
        break;
      default:
        break;
    }


    if (!currentStepHasErrors) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log("Validation errors in current step:", validationErrors);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, gapExplanations);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully:", formData);
      navigate("/user-details", { state: { formData } });
    } else {
      console.log("Form validation errors:", validationErrors);
      if (validationErrors.pendingCase) {
        alert("Form submission blocked: " + validationErrors.pendingCase);
      }
      
      const firstErrorStep = Object.keys(validationErrors).some(key => ["firstname", "lastname", "dateOfBirth", "citizenship", "secondCitizenship"].includes(key)) ? 0 :
                             Object.keys(validationErrors).some(key => ["employmentHistory", "gapExplanations"].includes(key)) ? 1 :
                             Object.keys(validationErrors).some(key => ["educationHistory"].includes(key)) ? 2 :
                             Object.keys(validationErrors).some(key => ["familyMembers"].includes(key)) ? 3 :
                             Object.keys(validationErrors).some(key => ["arrested", "arrestDetails", "pendingCase"].includes(key)) ? 4 :
                             null;
      if (firstErrorStep !== null && activeStep !== firstErrorStep) {
          setActiveStep(firstErrorStep);
          alert("Please review the errors in the form.");
      }
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <PersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 1:
        return (
          <EmploymentHistory
            formData={formData}
            updateFormData={updateFormData}
            gapExplanations={gapExplanations}
            setGapExplanations={setGapExplanations}
            errors={errors}
          />
        );
      case 2:
        return (
          <EducationHistory
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <FamilyMembers
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <CriminalHistory
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Application Form
      </Typography>

      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        {getStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
            Submit Application
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default Form;