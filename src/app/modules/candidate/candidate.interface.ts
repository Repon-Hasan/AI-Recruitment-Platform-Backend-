interface CreateProjectPayload {
  name: string;
  description?: string;
  technologies?: string;
  projectUrl?: string;
  image?: string;
}

interface UpdateProjectPayload {
  name?: string;
  description?: string;
  technologies?: string;
  projectUrl?: string;
  image?: string;
}

interface CreateCertificationPayload {
  name: string;
  issuer?: string;
  issueDate?: string | Date;
  credentialUrl?: string;
  image?: string;
}

interface UpdateCertificationPayload {
  name?: string;
  issuer?: string;
  issueDate?: string | Date;
  credentialUrl?: string;
}