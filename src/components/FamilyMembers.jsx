import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  FormHelperText,
} from "@mui/material";

import famvalidate from "../validation/FamilyValidate";

const FamilyMembers = ({ formData, updateFormData, setParentErrors, submitted }) => {
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submitted) {
      const validationErrors = famvalidate(formData);
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, familyMembers: validationErrors }));
    } else {
      setErrors({});
      setParentErrors((prev) => ({ ...prev, familyMembers: {} }));
    }
  }, [formData, submitted]);

  const handleFamilyChange = (index, field, value) => {
    const updated = [...formData.familyMembers];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    const hasForeignAffiliations = updated.some(
      (member) =>
        member.country &&
        formData.citizenship &&
        member.country.trim().toLowerCase() !==
          formData.citizenship.trim().toLowerCase()
    );

    updateFormData("familyMembers", updated);
    updateFormData("hasForeignAffiliations", hasForeignAffiliations);

    if (submitted) {
      const validationErrors = famvalidate({ ...formData, familyMembers: updated });
      setErrors(validationErrors);
      setParentErrors((prev) => ({ ...prev, familyMembers: validationErrors }));
    }
  };

  const addFamilyMember = () => {
    updateFormData("familyMembers", [
      ...formData.familyMembers,
      { fullName: "", relationship: "", country: "" },
    ]);
    setErrors((prev) => ({ ...prev, familyMembers: undefined }));
  };

  const removeFamilyMember = (index) => {
    const updated = [...formData.familyMembers];
    updated.splice(index, 1);

    const hasForeignAffiliations = updated.some(
      (member) =>
        member.country &&
        formData.citizenship &&
        member.country.trim().toLowerCase() !==
          formData.citizenship.trim().toLowerCase()
    );

    updateFormData("familyMembers", updated);
    updateFormData("hasForeignAffiliations", hasForeignAffiliations);

    setErrors((prev) => {
      const newErrors = { ...prev };
      if (newErrors.familyMembers) {
        newErrors.familyMembers.splice(index, 1);
      }
      return newErrors;
    });
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Family Members
      </Typography>

      <Button variant="contained" color="secondary" onClick={addFamilyMember}>
        Add Family Member
      </Button>
      {submitted && errors.familyMembers && errors.familyMembers.general && (
        <FormHelperText error>{errors.familyMembers.general}</FormHelperText>
      )}

      {formData.familyMembers.map((member, index) => (
        <Paper key={index} sx={{ p: 2, mt: 2 }} elevation={2}>
          <TextField
            label="Full Name"
            value={member.fullName}
            onChange={(e) =>
              handleFamilyChange(index, "fullName", e.target.value)
            }
            fullWidth
            margin="dense"
            error={submitted && !!errors.familyMembers?.[index]?.fullName}
            helperText={submitted ? errors.familyMembers?.[index]?.fullName : ''}
          />

          <FormControl
            fullWidth
            margin="dense"
            error={submitted && !!errors.familyMembers?.[index]?.relationship}
          >
            <InputLabel>Relationship</InputLabel>
            <Select
              value={member.relationship}
              label="Relationship"
              onChange={(e) =>
                handleFamilyChange(index, "relationship", e.target.value)
              }
            >
              <MenuItem value="Parent">Parent</MenuItem>
              <MenuItem value="Sibling">Sibling</MenuItem>
              <MenuItem value="Spouse">Spouse</MenuItem>
              {/* Add other relationships as needed */}
            </Select>
            {submitted && errors.familyMembers?.[index]?.relationship && (
              <FormHelperText>
                {errors.familyMembers[index].relationship}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Country of Residence"
            value={member.country}
            onChange={(e) =>
              handleFamilyChange(index, "country", e.target.value)
            }
            fullWidth
            margin="dense"
            error={submitted && !!errors.familyMembers?.[index]?.country}
            helperText={submitted ? errors.familyMembers?.[index]?.country : ''}
          />

          <Button
            variant="text"
            color="error"
            size="small"
            onClick={() => removeFamilyMember(index)}
            sx={{ mt: 1 }}
          >
            Remove Member
          </Button>
        </Paper>
      ))}

      <Box mt={2}>
        <Typography variant="body1" fontWeight="bold">
          Foreign Affiliations:{" "}
          {formData.hasForeignAffiliations ? "Yes" : "No"}
        </Typography>
      </Box>
    </Box>
  );
};

export default FamilyMembers;