const validateForm = (formData, gapExplanations) => {
  const newErrors = {};

  const jobErrors = [];
  const newGapExplanationsErrors = {};
  const arrestDetailErrors = [];

  // Personal Information Validation
  if (!formData.firstname.trim()) {
    newErrors.firstname = "First name is required";
  }else if(!formData.firstname.match(/^[a-zA-Z]+$/)) {
    newErrors.firstname = "First name can only contain letters";  
  } else if (formData.firstname.length < 3) {
    newErrors.firstname = "First name must be at least 3 characters long";
  }

  if (!formData.lastname.trim()) {
    newErrors.lastname = "Last name is required";
   } else if(!formData.lastname.match(/^[a-zA-Z]+$/)) {
    newErrors.firstname = "First name can only contain letters";  
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
}

  if (!formData.citizenship.trim()) {
    newErrors.citizenship = "Citizenship is required";
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

  // Employment History Validation
  const jobs = [...formData.employmentHistory].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];//abc
    const jobErr = {};
    
    if (!job.jobTitle.trim()) jobErr.jobTitle = "Job title is required";
    if (!job.employer.trim()) jobErr.employer = "Employer is required";
    if (!job.startDate) 
      jobErr.startDate = "Start date is required";
    else {
      const birthYear = new Date(formData.dateOfBirth).getFullYear();
      const year = new Date(job.startDate).getFullYear();
      const yearend = new Date(job.endDate).getFullYear();
      

      if(year.toString().length !== 4) {
        jobErr.startDate = "year must be a 4-digit number";
      } else if (year < birthYear || year > new Date().getFullYear()) {
        jobErr.startDate = "Start date must be after your date of birth and before the current year";
      }
      
      if(year < birthYear || year > new Date().getFullYear() ) {
      jobErr.startDate = "Start date must be after your date of birth and before the current year";
    } else if(yearend < year){
      jobErr.endDate = "End date must be after start date";
    }

  }

    if (!job.currentlyWorking && !job.endDate) {
      jobErr.endDate = "End date is required unless currently working";
    }

    for (let j = 0; j < i; j++) {
      const prev = jobs[j];
      const prevEnd = prev.currentlyWorking ? new Date() : new Date(prev.endDate);
      const currentStart = new Date(job.startDate);
      if (currentStart <= prevEnd) {
        jobErr.overlap = "Job dates overlap with another entry";
      }
    }

    if (i > 0) {
      const prev = jobs[i - 1];
      const prevEnd = prev.currentlyWorking ? new Date() : new Date(prev.endDate);
      const currentStart = new Date(job.startDate);
      const diffMonths =
        (currentStart.getFullYear() - prevEnd.getFullYear()) * 12 +
        (currentStart.getMonth() - prevEnd.getMonth());

      if (diffMonths > 6) {
        if (!gapExplanations[i] || gapExplanations[i].trim() === "") {
          newGapExplanationsErrors[i] = "Explanation is required for gaps over 6 months";
        }
      }
    }

    jobErrors.push(jobErr);
  }

  if (jobErrors.some((e) => Object.keys(e).length > 0)) {
    newErrors.employmentHistory = jobErrors;
  }

  if (Object.keys(newGapExplanationsErrors).length > 0) {
    newErrors.gapExplanations = newGapExplanationsErrors;
  }

  // Education History Validationn
if (formData.educationHistory.length === 0) {
  newErrors.educationHistory = "At least one degree is required";
} else {
  const eduErrors = [];

  formData.educationHistory.forEach((edu, i) => {
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
    } else if (edu.startDate) {
      if (new Date(edu.endDate) <= new Date(edu.startDate)) {
        eduErr.endDate = "End date must be after start date";
      }
    }

    // Overlap with jobs
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

  // Family Members Validation
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

  // Criminal History Validation
  if (formData.arrested === "yes") {
    formData.arrestDetails.forEach((incident) => {
      const incidentErr = {};
      if (!incident.description.trim()) {
        incidentErr.description = "Incident description is required";
      }
      if (!incident.date) {
        incidentErr.date = "Date is required";
      } else {
        const arrestDate = new Date(incident.date);
        const today = new Date();
        if (arrestDate >= today) {
          incidentErr.date = "Date must be before today";
        }

        for (const job of formData.employmentHistory) {
          const jobStart = new Date(job.startDate);
          const jobEnd = job.currentlyWorking ? new Date() : new Date(job.endDate);

          if (arrestDate >= jobStart && arrestDate <= jobEnd) {
            incidentErr.overlap = "Cannot have occurred while employed at any listed job";
            break;
          }
        }
      }
      arrestDetailErrors.push(incidentErr);
    });

    if (arrestDetailErrors.some((e) => Object.keys(e).length > 0)) {
      newErrors.arrestDetails = arrestDetailErrors;
    }
  }

  if (formData.pendingCase === "yes") {
    newErrors.pendingCase = "Pending criminal cases disqualify applicants";
  }

  return newErrors;
};

export default validateForm;
