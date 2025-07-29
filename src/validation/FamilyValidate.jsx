const famvalidate = (formData) => {
  const newErrors = {};

  if (formData.familyMembers.length > 0) {
    const familyErrors = [];

    formData.familyMembers.forEach((member) => {
      const err = {};
      if (!member.fullName.trim()) err.fullName = "Full name is required";
      if (!member.relationship.trim()) err.relationship = "Relationship is required";
      if (!member.country.trim()) err.country = "Country is required";
      familyErrors.push(err);
    });

    if (familyErrors.some((e) => Object.keys(e).length > 0)) {
      newErrors.familyMembers = familyErrors;
    }
  }

  return newErrors;
};

export default famvalidate;
