const eduvalidate = (formData) => {
  const newErrors = {};

  if (formData.educationHistory.length === 0) {
    newErrors.educationHistory = "At least one degree is required";
  } else {
     const eduErrors = [];

    formData.educationHistory.forEach((edu) => {
      const eduErr = {};

      const birthYear = new Date(formData.dateOfBirth).getFullYear();
      const currentYear = new Date().getFullYear();

      if (!edu.degree.trim()) eduErr.degree = "Degree is required";
      if (!edu.institution.trim()) eduErr.institution = "Institution is required";

      if (!edu.startDate) {
        eduErr.startDate = "Start date is required";
      } else {
        const startYear = new Date(edu.startDate).getFullYear();

        if (startYear.toString().length !== 4) {
          eduErr.startDate = "Start date must be a valid 4-digit year";
        } else if (startYear < birthYear || startYear > currentYear) {
          eduErr.startDate = "Start date must be after your date of birth and before the current year";
        }
      }

      if (!edu.endDate) {
        eduErr.endDate = "End date is required";
      } else if (edu.startDate && new Date(edu.endDate) <= new Date(edu.startDate)) {
        eduErr.endDate = "End date must be after start date";
      }

      for (const job of formData.employmentHistory) {
        const jobStart = new Date(job.startDate);
        const jobEnd = job.currentlyWorking ? new Date() : new Date(job.endDate);
        const eduStart = new Date(edu.startDate);
        const eduEnd = new Date(edu.endDate);

        if (eduStart < jobEnd && eduEnd > jobStart) {
          eduErr.overlap = "Education dates overlap with job period";
          break;
        }
      }

       eduErrors.push(eduErr);
  });

  if (eduErrors.some((e) => Object.keys(e).length > 0)) {
    newErrors.educationHistory = eduErrors;
  }
}

  return newErrors;
};

export default eduvalidate;
