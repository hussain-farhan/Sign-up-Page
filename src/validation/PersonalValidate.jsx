const validateinfo = (formData) => {
  const newErrors = {};

  if (!formData.firstname.trim()) {
    newErrors.firstname = "First name is required";
  } else if (!formData.firstname.match(/^[a-zA-Z]+$/)) {
    newErrors.firstname = "First name can only contain letters";
  } else if (formData.firstname.length < 3) {
    newErrors.firstname = "First name must be at least 3 characters long";
  }

  if (!formData.lastname.trim()) {
    newErrors.lastname = "Last name is required";
  } else if (!formData.lastname.match(/^[a-zA-Z]+$/)) {
    newErrors.lastname = "Last name can only contain letters"; 
  } else if (formData.lastname.length < 3) {
    newErrors.lastname = "Last name must be at least 3 characters long";
  }

  if (!formData.dateOfBirth) {
    newErrors.dateOfBirth = "Date of birth is required";
  } else {
   const birthDate = new Date(formData.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();
    const year = birthDate.getFullYear();
    const yearstr = year.toString();

    const is21 =
      age > 21 ||
      (age === 21 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)));
      
      if(year < 1900 || yearstr.length !== 4) {
        newErrors.dateOfBirth = "Date of birth must be after 1900";
      }
    if (!is21) {
      newErrors.dateOfBirth = "You must be at least 21 years old";
    }

  if (formData.hasDualCitizenship === "yes") {
    if (!formData.secondCitizenship.trim()) {
      newErrors.secondCitizenship = "Second country is required";
    } else if (
      formData.secondCitizenship.trim().toLowerCase() ===
      formData.citizenship.trim().toLowerCase()
    ) {
      newErrors.secondCitizenship =
        "Second citizenship cannot be the same as the primary country";
    }
  }
}
  return newErrors;
};

export default validateinfo;
