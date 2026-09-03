export const candidateApplicationEmail = ({ candidateName, jobTitle, companyName, location, employmentType, }) => {
    return `
    <div style="font-family: Arial, sans-serif">

      <h2>
        Application Submitted Successfully
      </h2>

      <p>
        Hi ${candidateName},
      </p>

      <p>
        Your application has been successfully
        submitted.
      </p>

      <hr />

      <h3>${jobTitle}</h3>

      <p>
        <strong>Company:</strong>
        ${companyName}
      </p>

      <p>
        <strong>Location:</strong>
        ${location ?? "Not specified"}
      </p>

      <p>
        <strong>Employment:</strong>
        ${employmentType ?? "Not specified"}
      </p>

      <hr />

      <p>
        You can track your application from
        your candidate dashboard.
      </p>

      <p>
        Good luck!
      </p>

    </div>
  `;
};
export const recruiterNewApplicationEmail = ({ recruiterName, candidateName, candidateEmail, jobTitle, companyName, }) => {
    return `
    <div style="font-family: Arial, sans-serif">

      <h2>
        New Job Application
      </h2>

      <p>
        Hi ${recruiterName},
      </p>

      <p>
        A new candidate has applied for
        <strong>${jobTitle}</strong>.
      </p>

      <hr />

      <h3>Candidate Information</h3>

      <p>
        <strong>Name:</strong>
        ${candidateName}
      </p>

      <p>
        <strong>Email:</strong>
        ${candidateEmail}
      </p>

      <p>
        <strong>Position:</strong>
        ${jobTitle}
      </p>

      <p>
        <strong>Company:</strong>
        ${companyName}
      </p>

      <hr />

      <p>
        Log in to your recruiter dashboard
        to review the candidate.
      </p>

    </div>
  `;
};
