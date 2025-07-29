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

// Import validation functions
import validateinfo from "../validation/PersonalValidate";
import empvalidate from "../validation/EmploymentValidate";
import eduvalidate from "../validation/EducationValidate";
import famvalidate from "../validation/FamilyValidate";
import crimiValidate from "../validation/CriminalValidate";


function Form() {
  const navigate = useNavigate(); 
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
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

  const [gapExplanations, setGapExplanations] = useState({});
  const [parentErrors, setParentErrors] = useState({});

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isStepValid = (stepIndex) => {
    let errors = {};
    switch (stepIndex) {
      case "Personal Information":
        errors = validateinfo(formData);
        setParentErrors((prev) => ({ ...prev, personalInfo: errors }));
        return Object.keys(errors).length === 0;
      case "Employment History":
        errors = empvalidate(formData, formData.employmentHistory, gapExplanations);
        setParentErrors((prev) => ({ ...prev, employmentHistory: errors }));
        return Object.keys(errors).length === 0;
      case "Education History":
        errors = eduvalidate(formData);
        setParentErrors((prev) => ({ ...prev, educationHistory: errors }));
        return Object.keys(errors).length === 0;
      case "Family Members":
        errors = famvalidate(formData);
        setParentErrors((prev) => ({ ...prev, familyMembers: errors }));
        return Object.keys(errors).length === 0;
      case "Criminal History":
        errors = crimiValidate(formData);
        setParentErrors((prev) => ({ ...prev, criminalHistory: errors }));
        return Object.keys(errors).length === 0;
      default:
        console.error("Unknown step index:");
        return true;
    }
  };

  const handleNext = () => {
    setSubmitted(true);
    if (isStepValid(steps[activeStep])) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSubmitted(false); 
      console.log(`Validation failed for step ${activeStep}. Please correct the errors.`);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (isStepValid(steps[activeStep])) {
      const allStepsValid = steps.every((label) => isStepValid(label));
      if (allStepsValid) {
        console.log("Form submitted successfully:", formData);
        navigate("/user-details", { state: { formData } });
      } else {
        console.log("Overall form validation failed. Please review all steps.");
        const firstInvalidStep = steps.findIndex((label) => !isStepValid(label));
        if (firstInvalidStep !== -1) {
          setActiveStep(firstInvalidStep);
        }
      }
    } else {
      console.log("Validation failed for the current (last) step. Please correct errors.");
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case "Personal Information":
        return (
          <PersonalInfo
            formData={formData}
            updateFormData={updateFormData}
            setParentErrors={setParentErrors}
            parentErrors={parentErrors.personalInfo}
            submitted={submitted}
          />
        );
      case "Employment History":
        return (
          <EmploymentHistory
            formData={formData}
            updateFormData={updateFormData}
            gapExplanations={gapExplanations}
            setGapExplanations={setGapExplanations}
            setParentErrors={setParentErrors}
            parentErrors={parentErrors.employmentHistory}
            submitted={submitted}
          />
        );
      case "Education History":
        return (
          <EducationHistory
            formData={formData}
            updateFormData={updateFormData}
            setParentErrors={setParentErrors}
            parentErrors={parentErrors.educationHistory}
             submitted={submitted}
          />
        );
      case "Family Members":
        return (
          <FamilyMembers
            formData={formData}
            updateFormData={updateFormData}
            setParentErrors={setParentErrors}
            parentErrors={parentErrors.familyMembers}
             submitted={submitted}
          />
        );
      case "Criminal History":
        return (
          <CriminalHistory
            formData={formData}
            updateFormData={updateFormData}
            setParentErrors={setParentErrors}
            parentErrors={parentErrors.criminalHistory}
             submitted={submitted}
          />
        );
      default:
        return "Unknown step";
    }
  };

  const stepperStyles = {
    mb: 4,
    "& .MuiStepLabel-active": {
      "& .MuiStepLabel-label": {
        color: "#1976d2",
      },
      "& .MuiStepIcon-root": {
        color: "#1976d2",
      },
    },
    "& .MuiStepLabel-completed": {
      "& .MuiStepLabel-label": {
        color: "#555555",
      },
      "& .MuiStepIcon-root": {
        color: "#1976d2",
      },
    },
    "& .MuiStepLabel-label": {
      color: "#333333",
    },
    "& .MuiStepIcon-root": {
      color: "#b0b0b0",
    },
  };

  const paperStyles = {
    p: 3,
    mb: 4,
    borderRadius: 2,
    bgcolor: "#ffffff",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  };

  const buttonStyles = {
    bgcolor: "#1976d2",
    "&:hover": {
      bgcolor: "#1565c0",
    },
    textTransform: "none",
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto", bgcolor: "#f0f2f5" }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ mb: 4, color: "#1976d2" }}>
        Application Form
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel sx={stepperStyles}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Paper elevation={3} sx={paperStyles}>
        {getStepContent(steps[activeStep])}
      </Paper>

      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">
          Back
        </Button>

        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
          sx={buttonStyles}
        >
          {activeStep === steps.length - 1 ? "Submit Application" : "Next"}
        </Button>
      </Box>
    </Box>
  );
}

export default Form;