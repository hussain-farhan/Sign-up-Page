const crimiValidate = (formData) => { 
  const newErrors = {};
  const arrestDetailErrors = [];

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
export default crimiValidate;