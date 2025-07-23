import React from "react";
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

function FamilyMembers({ formData, updateFormData, errors }) {
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
  };

  const addFamilyMember = () => {
    updateFormData("familyMembers", [
      ...formData.familyMembers,
      { fullName: "", relationship: "", country: "" },
    ]);
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
  };

  return (
    <Box>
      <Typography variant="h6" mt={4} mb={2}>
        Family Members
      </Typography>

      <Button variant="contained" color="secondary" onClick={addFamilyMember}>
        Add Family Member
      </Button>

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
            error={!!errors.familyMembers?.[index]?.fullName}
            helperText={errors.familyMembers?.[index]?.fullName}
          />

          <FormControl
            fullWidth
            margin="dense"
            error={!!errors.familyMembers?.[index]?.relationship}
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
            </Select>
            {errors.familyMembers?.[index]?.relationship && (
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
            error={!!errors.familyMembers?.[index]?.country}
            helperText={errors.familyMembers?.[index]?.country}
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
}

export default FamilyMembers;