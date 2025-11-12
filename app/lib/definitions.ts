// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: "pending" | "paid";
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, "amount"> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: "pending" | "paid";
};

export type CustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: "pending" | "paid";
};

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address_one: string;
  address_two: string;
  address_three: string;
  phone: string;
  website: string;
  thumbnail: string;
  linked_in: string;
  twitter: string;
  facebook: string;
  instagram: string;
  github: string;
  country: string;
  created_at: string;
  updated_at: string;
  new_user: string;
  access_level: string;
  tour_dashboard: string;
  tour_education: string;
  tour_skills: string;
  tour_applications: string;
  tour_companies: string;
  tour_work_experience: string;
  tour_certifications: string;
  tour_organizations: string;
  tour_resume_templates: string;
  tour_user_profile: string;
}

export interface Application {
  id: string;
  posting_text: string;
  is_complete: string;
  created_at: string;
  date_submitted: string;
  job_position: string;
  posting_url: string;
  analyzed_posting_text: string;
  company_id: string;
  key_skills: string;
  updated_at: string;
  user_id: string;
}

export type Applications = Application[];

export interface Company {
  id: string;
  created_at: string;
  name: string;
  address_one: string;
  address_two: string;
  recipient_title: string;
  email: string;
  phone: string;
  website_url: string;
  updated_at: string;
  user_id: string;
}

export type Companies = Company[];

export interface BodyFont {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type BodyFonts = BodyFont[];

export interface HeaderFont {
  id: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export type HeaderFonts = HeaderFont[];

export interface ResumeColor {
  id: string;
  name: string;
  color: string;
  updated_at: string;
  created_at: string;
  highlight_color: string;
}

export type ResumeColors = ResumeColor[];

export interface CoverLetter {
  id: string;
  // allow created/updated to be string or Date or null
  created_at?: string | Date | null;
  updated_at?: string | Date | null;

  // primary associations
  company_id?: string | null;
  application_id?: string | null;
  user_id: string;

  // content fields (added title and body)
  title?: string | null;
  body?: string | null;

  // existing parts of the letter (keep as-is)
  first_name?: string;
  last_name?: string;
  recipient_title?: string;
  intro_text_start?: string;
  intro_skills?: string;
  intro_experience?: string;
  intro_text_end?: string;
  salutation_text?: string;
  conclusion_text?: string;
  thanks_text?: string;
  template?: string;

  // styling
  heading_font?: string;
  body_font?: string;
  color?: string;
  highlight_color?: string;
}
export type CoverLetters = CoverLetter[];

export interface ResumeLine {
  id: string;
  user_id: string;
  updated_at: string;
  created_at: string;
  position: string;
  resume_id: string;
  line_type: string;
  user_education_id: string;
  work_experience_id: string;
  user_skills_id: string;
  user_custom_section_one_id: string;
  user_custom_section_two_id: string;
}

export type ResumeLines = ResumeLine[];

export type Resume = {
  id: string;
  created_at: string;
  application_id: string;
  updated_at: string;
  user_id: string;
  company_id: string;
  title: string;
  template: string;
  color: string;
  heading_font: string;
  body_font: string;
  show_social_icons: string;
  show_skill_progress: string;
  show_skills_section: string;
  show_education_section: string;
  show_custom_section_one: string;
  custom_section_one_name: string;
  show_custom_section_two: string;
  custom_section_two_name: string;
  description: string;
  highlight_color: string;
};

export type Resumes = Resume[];

export interface ResumeTemplate {
  id: string;
  name: string;
  thumbnail_url: string;
  cloudinary_public_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  active: string;
}

export type ResumeTemplates = ResumeTemplate[];

export interface CoverTemplate {
  id: string;
  name: string;
  thumbnail_url: string;
  cloudinary_public_url: string;
  description: string;
  created_at: string;
  updated_at: string;
  active: string;
}

export type CoverTemplates = CoverTemplate[];

export interface UserOrganization {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

export type userOrganizations = UserOrganization[];

export interface UserCertification {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
}

export type UserCertifications = UserCertification[];

export interface UserEducationExperience {
  id: string;
  institution_name: string;
  program: string;
  url: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  location: string;
  start_date: string;
  end_date: string;
  description_one: string;
  description_two: string;
  description_three: string;
  grade: string;
}

export type UserEducationExperiences = UserEducationExperience[];

export interface UserSkill {
  id: string;
  skill: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  skill_level: string;
}

export type UserSkills = UserSkill[];

export interface UserWorkExperience {
  id: string;
  job_title: string;
  company_name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  location: string;
  description_one: string;
  description_two: string;
  description_three: string;
  description_four: string;
  start_date: string;
  end_date: string;
}

export type UserWorkExperiences = UserWorkExperience[];

export interface UserCoverExperience {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
}

export type UserCoverExperiences = UserCoverExperience[];

export interface UserCoverExperienceLine {
  id: string;
  cover_letter_id: string;
  cover_experience_id: string;
  updated_at: string;
  created_at: string;
}

export type UserCoverExperienceLines = UserCoverExperienceLine[];

export type NullOrUndefined = null | undefined;

export type StringOrUndefined = string | undefined;

export interface ResumeTemplate {
  styles: {
    id: string;
    name: string;
    thumbnail_url: string;
    cloudinary_public_url: string;
    description: string;
  }[];
}

export interface ProviderAccount {
  id?: string;
  userId: string;
  provider: string;
  providerAccountId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresAt?: number | null; // epoch seconds
  scope?: string | null;
  tokenType?: string | null;
  idToken?: string | null;
  profileJson?: any;
  profileName?: string | null;
  profileEmail?: string | null;
  profilePicture?: string | null;
  lastSignInAt?: string | null; // ISO timestamp
}