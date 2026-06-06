export interface Service {
  id: string;
  title: string;
  description: string;
  detailedPoints: string[];
  features: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  timeline: string;
  features: string[];
  highlight: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface InquiryFormInput {
  name: string;
  email: string;
  companyName: string;
  projectType: string;
  budget: string;
  message: string;
  servicesNeeded: string[];
}
