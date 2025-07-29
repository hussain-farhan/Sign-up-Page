const empvalidate = (formData, employmentHistory, gapExplanations) => {
  const newErrors = {};
  const jobErrors = [];
  const newGapExplanationsErrors = {};

  const jobs = [...employmentHistory].sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  for (let i = 0; i < jobs.length; i++) {
    const job = jobs[i];
    const jobErr = {};

    if (!job.jobTitle.trim()) jobErr.jobTitle = "Job title is required";
    if (!job.employer.trim()) jobErr.employer = "Employer is required";

    if (!job.startDate) {
      jobErr.startDate = "Start date is required";
    } else {
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
    } else if (!job.currentlyWorking && job.endDate) {
        const jobStartDate = new Date(job.startDate);
        const jobEndDate = new Date(job.endDate);

       if (jobEndDate <= jobStartDate) {
            jobErr.endDate = "End date must be after start date";
        }
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

  return newErrors;
};

export default empvalidate;