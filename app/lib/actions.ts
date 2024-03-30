"use server";

import { z } from "zod";
import { conn } from "@/app/lib/database";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: "Please select a customer.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const UserSchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please select a username.",
  }),
  email: z.string({
    invalid_type_error: "Please enter a valid email address.",
  }),
  first_name: z.string({
    invalid_type_error: "Please enter a valid first_name.",
  }),
  last_name: z.string({
    invalid_type_error: "Please enter a valid last_name.",
  }),
  address_line_one: z.string({
    invalid_type_error: "Please enter a valid address_line_one.",
  }),
  address_line_two: z.string({
    invalid_type_error: "Please enter a valid address_line_two.",
  }),
  address_line_three: z.string({
    invalid_type_error: "Please enter a valid address_line_three.",
  }),
  phone: z.string({
    invalid_type_error: "Please enter a valid phone number.",
  }),
  website: z.string({
    invalid_type_error: "Please enter a valid website.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a valid website.",
  }),
});

const UserSocialsSchema = z.object({
  id: z.string(),
  linked_in: z.string({
    invalid_type_error: "Please enter a valid linkedin in address",
  }),
  twitter: z.string({
    invalid_type_error: "Please enter a valid twitter in address",
  }),
  facebook: z.string({
    invalid_type_error: "Please enter a valid facebook in address",
  }),
  instagram: z.string({
    invalid_type_error: "Please enter a valid instagram in address",
  }),
  show_socials: z.string({
    invalid_type_error: "Please enter a valid show_socials in address",
  }),
  github: z.string({
    invalid_type_error: "Please enter a valid github in address",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a valid github in address",
  }),
});

const ApplicationSchema = z.object({
  id: z.string(),
  postingText: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  jobPosition: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  postingUrl: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  analyzedPostingText: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  companyId: z.string({
    invalid_type_error: "Please enter a number.",
  }),
});

const CompanySchema = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  addressOne: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  addressTwo: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  recipientTitle: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  email: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  phone: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  website: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateCoverLetterSchema = z.object({
  application_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  company_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateResumeSchema = z.object({
  application_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  company_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const YourResumeStyleSchema = z.object({
  resume_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_template: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  color: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  header_font: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  body_font: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateSkillsSchema = z.object({
  skill_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  skill_level: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateSkillSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  skill_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  skill_level: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  skill_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateSkillsSectionSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  show_skills_section: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  show_skill_progress: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const DeleteSkillsSchema = z.object({
  id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateEducationSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  institution_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  start_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  end_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  grade: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  program: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  url: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateEducationSectionSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  show_education_section: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateEducationSchema = z.object({
  education_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  institution_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  start_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  end_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  grade: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  program: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  url: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const DeleteEducationSchema = z.object({
  id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const DeleteOrganizationSchema = z.object({
  id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateOrganizationsSectionSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  show_custom_section_one: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateOrganizationsSectionTitleSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  section_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateOrganizationSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_start: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_end: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_description: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateOrganizationSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  section_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_start: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_end: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  organization_description: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateCertificationSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  section_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  certification_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  certification_location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateCertificationsSectionSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  show_custom_section_two: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateCertificationSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  certification_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  certification_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  certification_location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateWorkExperienceSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  company_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  job_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  start_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  end_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_one: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_two: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_three: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_four: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const UpdateWorkExperienceSchema = z.object({
  experience_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  company_name: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  job_title: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  location: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  start_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  end_date: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_one: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_two: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_three: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  description_four: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const DeleteWorkExperienceSchema = z.object({
  id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateResumeLineSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  line_type: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const DeleteResumeLineSchema = z.object({
  user_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  resume_id: z.string({
    invalid_type_error: "Please enter a string.",
  }),
  line_type: z.string({
    invalid_type_error: "Please enter a string.",
  }),
});

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });
// const DeleteInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateUser = UserSchema.omit({ id: true, date: true });
const UpdateSocials = UserSocialsSchema.omit({ id: true, date: true });
const UpdateApplication = ApplicationSchema;

// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    name?: string[];
    email?: string[];
    first_name?: string[];
    last_name?: string[];
    address_line_one?: string[];
    address_line_two?: string[];
    address_line_three?: string[];
    phone?: string[];
    website?: string[];
    linked_in?: string[];
    twitter?: string[];
    facebook?: string[];
    instagram?: string[];
    show_socials?: string[];
    github?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    address_line_one: formData.get("address_one"),
    address_line_two: formData.get("address_two"),
    address_line_three: formData.get("address_three"),
    phone: formData.get("phone"),
    website: formData.get("website"),
    resume_id: formData.get("resume_id"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields?.error?.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    name,
    email,
    first_name,
    last_name,
    address_line_one,
    address_line_two,
    address_line_three,
    phone,
    website,
    resume_id,
  } = validatedFields.data;

  try {
    const query = `UPDATE users SET name = '${name}', email = '${email}', first_name = '${first_name}', last_name = '${last_name}', address_one = '${address_line_one}', address_two = '${address_line_two}', address_three = '${address_line_three}', phone = '${phone}', website = '${website}' WHERE id = '${id}'`;

    const data = await conn.query(query);


    // await sql`
    //     UPDATE invoices
    //     SET name = '${name}', email = '${email}'
    //     WHERE id = ${id}
    //   `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateSocials(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateSocials.safeParse({
    linked_in: formData.get("linked_in"),
    twitter: formData.get("twitter"),
    facebook: formData.get("facebook"),
    instagram: formData.get("instagram"),
    show_socials: formData.get("show_socials"),
    github: formData.get("github"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    linked_in,
    twitter,
    facebook,
    instagram,
    show_socials,
    github,
    resume_id,
  } = validatedFields.data;

  try {
    const query = `UPDATE users SET linked_in = '${linked_in}', twitter = '${twitter}', facebook = '${facebook}', instagram = '${instagram}', github = '${github}' WHERE id = '${id}'`;

    const data = await conn.query(query);

    const query2 = `UPDATE resumes SET show_social_icons = '${show_socials}' WHERE id = '${resume_id}'`;

    const data2 = await conn.query(query2);
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateApplication(formData: FormData) {
  const validatedFields = UpdateApplication.safeParse({
    id: formData.get("application_id"),
    postingText: formData.get("posting_text"),
    jobPosition: formData.get("job_position"),
    postingUrl: formData.get("posting_url"),
    analyzedPostingText: formData.get("analyzed_posting_text"),
    companyId: formData.get("company_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    id,
    postingText,
    jobPosition,
    postingUrl,
    analyzedPostingText,
    companyId,
  } = validatedFields.data;

  try {
    const query = `UPDATE applications SET posting_text = '${postingText}', job_position = '${jobPosition}', posting_url = '${postingUrl}', analyzed_posting_text = '${analyzedPostingText}', company_id = '${companyId}' WHERE id = '${id}'`;

    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function createApplication(formData: FormData) {
  const validatedFields = UpdateApplication.safeParse({
    id: formData.get("user_id"),
    postingText: formData.get("posting_text"),
    jobPosition: formData.get("job_position"),
    postingUrl: formData.get("posting_url"),
    analyzedPostingText: formData.get("analyzed_posting_text"),
    companyId: formData.get("company_id"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    id,
    postingText,
    jobPosition,
    postingUrl,
    analyzedPostingText,
    companyId,
  } = validatedFields.data;

  try {
    const query = `INSERT INTO applications (posting_text, job_position, posting_url, analyzed_posting_text, company_id, user_id) VALUES ('${postingText}', '${jobPosition}', '${postingUrl}', '${analyzedPostingText}', '${companyId}', '${id}')`;

    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function deleteApplication(id: string) {
  try {
    const query = `DELETE FROM applications WHERE id = ${id}`;

    const data = await conn.query(query);
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Application. ${error}`,
    };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function updateCompany(formData: FormData) {
  const validatedFields = CompanySchema.safeParse({
    id: formData.get("company_id"),
    name: formData.get("company_name"),
    addressOne: formData.get("address_one"),
    addressTwo: formData.get("address_two"),
    recipientTitle: formData.get("recipient_title"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    website: formData.get("website_url"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    id,
    name,
    addressOne,
    addressTwo,
    recipientTitle,
    email,
    phone,
    website,
  } = validatedFields.data;

  try {
    const query = `UPDATE companies SET name = '${name}', address_one = '${addressOne}', address_two = '${addressTwo}', recipient_title = '${recipientTitle}', email = '${email}', phone = '${phone}', website_url = '${website}' WHERE id = '${id}'`;

    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath("/dashboard/companies");
  redirect("/dashboard/companies");
}

export async function createCompany(formData: FormData) {
  const validatedFields = CompanySchema.safeParse({
    id: formData.get("user_id"),
    name: formData.get("company_name"),
    addressOne: formData.get("address_one"),
    addressTwo: formData.get("address_two"),
    recipientTitle: formData.get("recipient_title"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    website: formData.get("website_url"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    id,
    name,
    addressOne,
    addressTwo,
    recipientTitle,
    email,
    phone,
    website,
  } = validatedFields.data;

  try {
    const query = `INSERT INTO companies (name, address_one, address_two, recipient_title, email, phone, website_url , user_id) VALUES ('${name}', '${addressOne}', '${addressTwo}', '${recipientTitle}', '${email}', '${phone}', '${website}', '${id}')`;

    const data = await conn.query(query);
  } catch (error) {
    return {
      message: `Database Error: Failed to create new company. ${error}`,
    };
  }

  revalidatePath("/dashboard/companies");
  redirect("/dashboard/companies");
}

export async function deleteCompany(id: string) {

  try {
    const query = `DELETE FROM companies WHERE id = ${id}`;

    const data = await conn.query(query);
    revalidatePath("/dashboard/companies");
    redirect("/dashboard/companies");
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Company. ${error}`,
    };
  }
}

export async function deleteCoverLetter(id: string) {

  try {
    const query = `DELETE FROM cover_letters WHERE id = ${id}`;

    const data = await conn.query(query);
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Company. ${error}`,
    };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function createCoverLetter(formData: FormData) {
  const validatedFields = CreateCoverLetterSchema.safeParse({
    user_id: formData.get("user_id"),
    application_id: formData.get("application_id"),
    company_id: formData.get("company_id"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { user_id, application_id, company_id } = validatedFields.data;


  try {
    const query = `INSERT INTO cover_letters (user_id, company_id, application_id) VALUES ('${user_id}', '${company_id}', '${application_id}')`;
    const data = await conn.query(query);
    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
  } catch (error) {
    return {
      message: `Database Error: Failed to create new company. ${error}`,
    };
  }
}

export async function deleteResume(id: string) {

  try {
    const query = `DELETE FROM resumes WHERE id = ${id}`;
    const data = await conn.query(query);
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Resume. ${error}`,
    };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function createResume(formData: FormData) {
  const validatedFields = CreateResumeSchema.safeParse({
    user_id: formData.get("user_id"),
    application_id: formData.get("application_id"),
    company_id: formData.get("company_id"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { user_id, application_id, company_id } = validatedFields.data;

  try {
    const query = `INSERT INTO resumes (user_id, company_id, application_id) VALUES ('${user_id}', '${company_id}', '${application_id}')`;
    const data = await conn.query(query);
    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
  } catch (error) {
    return {
      message: `Database Error: Failed to create new company. ${error}`,
    };
  }
}

export async function updateYourResumeStyle(formData: FormData) {

  const validatedFields = YourResumeStyleSchema.safeParse({
    resume_title: formData.get("resume_title"),
    resume_template: formData.get("resume_template"),
    color: formData.get("color"),
    header_font: formData.get("header_font"),
    body_font: formData.get("body_font"),
    resume_id: formData.get("resume_id"),
    description: formData.get("description"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const {
    resume_title,
    resume_template,
    color,
    header_font,
    body_font,
    resume_id,
    description,
  } = validatedFields.data;

  try {
    const query = `UPDATE resumes SET title = '${resume_title}', template = '${resume_template}', color = '${color}', heading_font = '${header_font}', body_font = '${body_font}', description = '${description}' WHERE id = '${resume_id}'`;

    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateUserSkill(formData: FormData) {

  const validatedFields = UpdateSkillSchema.safeParse({
    skill_name: formData.get("skill_name"),
    user_id: formData.get("user_id"),
    skill_id: formData.get("skill_id"),
    skill_level: formData.get("skill_level"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { skill_name, skill_id, skill_level, user_id, resume_id } =
    validatedFields.data;

  try {
    const query = `UPDATE user_skills SET skill = '${skill_name}', skill_level = '${skill_level}' WHERE id = '${skill_id}'`;

    const data = await conn.query(query);

  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/skills/edit/${skill_id}`);
    redirect(`/dashboard/skills/edit/${skill_id}`);
  }
}

export async function createUserSkill(formData: FormData) {

  const validatedFields = CreateSkillsSchema.safeParse({
    skill_title: formData.get("skill_title"),
    user_id: formData.get("user_id"),
    skill_level: formData.get("skill_level"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { skill_title, skill_level, user_id, resume_id } = validatedFields.data;


  try {
    const query = `INSERT INTO user_skills (skill, skill_level, user_id) VALUES ('${skill_title}', '${skill_level}', '${user_id}')`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/skills`);
    redirect(`/dashboard/skills`);
  }
}

export async function deleteUserSkill(formData: FormData) {

  const validatedFields = DeleteSkillsSchema.safeParse({
    id: formData.get("id"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;

  try {
    const query = `DELETE FROM user_skills WHERE id = '${id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/skills`);
    redirect(`/dashboard/skills`);
  }
}

export async function createUserEducation(formData: FormData) {

  const validatedFields = CreateEducationSchema.safeParse({
    user_id: formData.get("user_id"),
    institution_name: formData.get("institution_name"),
    location: formData.get("location"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    grade: formData.get("grade"),
    program: formData.get("program"),
    url: formData.get("url"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    user_id,
    institution_name,
    location,
    start_date,
    end_date,
    grade,
    program,
    url,
    resume_id,
  } = validatedFields.data;


  try {
    const query = `INSERT INTO user_education (user_id, institution_name, location, start_date, end_date, grade, program, url) VALUES ('${user_id}', '${institution_name}', '${location}', '${start_date}' , '${end_date}' , '${grade}' , '${program}' , '${url}')`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/education/`);
    redirect(`/dashboard/education/`);
  }
}

export async function deleteEducation(formData: FormData) {

  const validatedFields = DeleteEducationSchema.safeParse({
    id: formData.get("education_id"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;


  try {
    const query = `DELETE FROM user_education WHERE id = '${id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/education`);
    redirect(`/dashboard/education`);
  }
}

export async function createOrganization(formData: FormData) {

  const validatedFields = CreateOrganizationSchema.safeParse({
    user_id: formData.get("user_id"),
    section_title: formData.get("section_title"),
    organization_name: formData.get("organization_name"),
    organization_location: formData.get("organization_location"),
    organization_start: formData.get("organization_start"),
    organization_end: formData.get("organization_end"),
    organization_description: formData.get("organization_description"),
    resume_id: formData.get("resume_id"),
  });


  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    user_id,
    section_title,
    organization_name,
    organization_location,
    organization_start,
    organization_end,
    organization_description,
    resume_id,
  } = validatedFields.data;


  try {
    const query = `INSERT INTO user_custom_section_one (user_id, name, location, start_date, end_date, description) VALUES ('${user_id}', '${organization_name}', '${organization_location}', '${organization_start}' , '${organization_end}' , '${organization_description}' )`;
    const data = await conn.query(query);

    if (section_title !== "blank") {
      const query2 = `UPDATE resumes SET custom_section_one_name = '${section_title}' WHERE id = '${resume_id}'`;
      const data2 = await conn.query(query2);
    }

  } catch (error) {
    return {
      message: `Database Error: Failed to Create new organization. ${error}`,
    };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/organizations`);
    redirect(`/dashboard/organizations`);
  }
}

export async function deleteOrganization(formData: FormData) {

  const validatedFields = DeleteOrganizationSchema.safeParse({
    id: formData.get("organization_id"),
    resume_id: formData.get("resume_id"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;

  try {
    const query = `DELETE FROM user_custom_section_one WHERE id = '${id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/organizations`);
    redirect(`/dashboard/organizations`);
  }
}

export async function deleteCertification(formData: FormData) {
  const validatedFields = DeleteOrganizationSchema.safeParse({
    id: formData.get("certification_id"),
    resume_id: formData.get("resume_id"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;
  try {
    const query = `DELETE FROM user_custom_section_two WHERE id = '${id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/certifications`);
    redirect(`/dashboard/certifications`);
  }
}

export async function createCertification(formData: FormData) {
  const validatedFields = CreateCertificationSchema.safeParse({
    user_id: formData.get("user_id"),
    section_title: formData.get("section_title"),
    certification_name: formData.get("certification_name"),
    certification_location: formData.get("certification_location"),
    resume_id: formData.get("resume_id"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    user_id,
    section_title,
    certification_name,
    certification_location,
    resume_id,
  } = validatedFields.data;
  try {
    const query = `INSERT INTO user_custom_section_two (user_id, name, location) VALUES ('${user_id}', '${certification_name}', '${certification_location}' )`;
    const data = await conn.query(query);

    if (section_title !== "blank") {
      const query2 = `UPDATE resumes SET custom_section_two_name = '${section_title}' WHERE id = '${resume_id}'`;
      const data2 = await conn.query(query2);
    }

  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/certifications/`);
    redirect(`/dashboard/certifications/`);
  }
}

export async function deleteWorkExperience(formData: FormData) {
  const validatedFields = DeleteWorkExperienceSchema.safeParse({
    id: formData.get("work_experience_id"),
    resume_id: formData.get("resume_id"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;
  try {
    const query = `DELETE FROM user_work_experience WHERE id = '${id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function createWorkExperience(formData: FormData) {
  const validatedFields = CreateWorkExperienceSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    company_name: formData.get("company_name"),
    job_title: formData.get("job_title"),
    location: formData.get("location"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    description_one: formData.get("description_one"),
    description_two: formData.get("description_two"),
    description_three: formData.get("description_three"),
    description_four: formData.get("description_four"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    user_id,
    resume_id,
    company_name,
    job_title,
    location,
    start_date,
    end_date,
    description_one,
    description_two,
    description_three,
    description_four,
  } = validatedFields.data;
  try {
    const query = `INSERT INTO user_work_experience (job_title, company_name, user_id, location, start_date, end_date, description_one, description_two, description_three, description_four) VALUES ('${job_title}', '${company_name}', '${user_id}', '${location}', '${start_date}', '${end_date}', '${description_one}', '${description_two}', '${description_three}', '${description_four}') `;
    const data = await conn.query(query);

  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function createUserImage(formData: FormData) {
}

export async function updateUserImage(formData: FormData) {
}

export async function updateUserWorkExperience(formData: FormData) {

  const validatedFields = UpdateWorkExperienceSchema.safeParse({
    experience_id: formData.get("experience_id"),
    resume_id: formData.get("resume_id"),
    company_name: formData.get("company_name"),
    job_title: formData.get("job_title"),
    location: formData.get("location"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    description_one: formData.get("description_one"),
    description_two: formData.get("description_two"),
    description_three: formData.get("description_three"),
    description_four: formData.get("description_four"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    experience_id,
    resume_id,
    company_name,
    job_title,
    location,
    start_date,
    end_date,
    description_one,
    description_two,
    description_three,
    description_four,
  } = validatedFields.data;

  try {
    const query = `UPDATE user_work_experience SET company_name = '${company_name}', job_title = '${job_title}', location = '${location}', start_date = '${start_date}', end_date = '${end_date}', description_one = '${description_one}', description_two = '${description_two}', description_three = '${description_three}', description_four = '${description_four}' WHERE id = '${experience_id}'`;

    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  }
}

export async function updateUserEducation(formData: FormData) {

  const validatedFields = UpdateEducationSchema.safeParse({
    education_id: formData.get("education_id"),
    resume_id: formData.get("resume_id"),
    institution_name: formData.get("institution_name"),
    location: formData.get("location"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    grade: formData.get("grade"),
    program: formData.get("program"),
    url: formData.get("url"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    education_id,
    resume_id,
    institution_name,
    location,
    start_date,
    end_date,
    grade,
    program,
    url,
  } = validatedFields.data;
  try {
    const query = `UPDATE user_education SET institution_name = '${institution_name}', location = '${location}', start_date = '${start_date}', end_date = '${end_date}', grade = '${grade}', program = '${program}', url = '${url}' WHERE id = '${education_id}'`;

    const data = await conn.query(query);

  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/education/edit/${education_id}`);
    redirect(`/dashboard/education/edit/${education_id}`);
  }
}

export async function updateSkillsSection(formData: FormData) {

  const validatedFields = UpdateSkillsSectionSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    show_skills_section: formData.get("show_skills_section"),
    show_skill_progress: formData.get("show_skill_progress"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }

  const { user_id, resume_id, show_skills_section, show_skill_progress } =
    validatedFields.data;

  try {
    const query = `UPDATE resumes SET show_skill_progress = '${show_skill_progress}', show_skills_section = '${show_skills_section}' WHERE id = '${resume_id}'`;

    const data = await conn.query(query);

  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateEducationSection(formData: FormData) {

  const validatedFields = UpdateEducationSectionSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    show_education_section: formData.get("show_education_section"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }

  const { user_id, resume_id, show_education_section } = validatedFields.data;

  try {
    const query = `UPDATE resumes SET show_education_section = '${show_education_section}' WHERE id = '${resume_id}'`;

    const data = await conn.query(query);

  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateOrganizationSection(formData: FormData) {

  const validatedFields = UpdateOrganizationsSectionSchema.safeParse({
    resume_id: formData.get("resume_id"),
    show_custom_section_one: formData.get("show_custom_section_one"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }

  const { user_id, resume_id, show_custom_section_one } = validatedFields.data;

  try {
    const query = `UPDATE resumes SET show_custom_section_one = '${show_custom_section_one}' WHERE id = '${resume_id}'`;

    const data = await conn.query(query);

  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateCertificationsSection(formData: FormData) {
  const validatedFields = UpdateCertificationsSectionSchema.safeParse({
    user_id: formData.get("user_id"),
    show_custom_section_two: formData.get("show_custom_section_two"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { user_id, resume_id, show_custom_section_two } = validatedFields.data;
  try {
    const query = `UPDATE resumes SET show_custom_section_two = '${show_custom_section_two}' WHERE id = '${resume_id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateUserOrganization(formData: FormData) {
  const validatedFields = UpdateOrganizationSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    organization_id: formData.get("organization_id"),
    organization_name: formData.get("organization_name"),
    organization_location: formData.get("organization_location"),
    organization_start: formData.get("organization_start"),
    organization_end: formData.get("organization_end"),
    organization_description: formData.get("organization_description"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    user_id,
    resume_id,
    organization_id,
    organization_name,
    organization_location,
    organization_start,
    organization_end,
    organization_description,
  } = validatedFields.data;

  try {
    const query = `UPDATE user_custom_section_one SET name = '${organization_name}', location = '${organization_location}', start_date = '${organization_start}', end_date = '${organization_end}', description = '${organization_description}' WHERE id = '${organization_id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/organizations`);
    redirect(`/dashboard/organizations`);
  }
}

export async function updateOrganizationSectionTitle(formData: FormData) {
  const validatedFields = UpdateOrganizationsSectionTitleSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    section_title: formData.get("section_title"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { user_id, resume_id, section_title } = validatedFields.data;

  try {
    const query = `UPDATE resumes SET custom_section_one_name = '${section_title}' WHERE id = '${resume_id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateCertificationSectionTitle(formData: FormData) {
  const validatedFields = UpdateOrganizationsSectionTitleSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    section_title: formData.get("section_title"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { user_id, resume_id, section_title } = validatedFields.data;

  try {
    const query = `UPDATE resumes SET custom_section_two_name = '${section_title}' WHERE id = '${resume_id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateUserCertfication(formData: FormData) {
  const validatedFields = UpdateCertificationSchema.safeParse({
    user_id: formData.get("user_id"),
    certification_id: formData.get("certification_id"),
    resume_id: formData.get("resume_id"),
    certification_name: formData.get("certification_name"),
    certification_location: formData.get("location_name"),
  });
  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const {
    user_id,
    resume_id,
    certification_id,
    certification_name,
    certification_location,
  } = validatedFields.data;

  try {
    const query = `UPDATE user_custom_section_two SET name = '${certification_name}', location = '${certification_location}' WHERE id = '${certification_id}'`;
    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  } else {
    revalidatePath(`/dashboard/certifications/`);
    redirect(`/dashboard/certifications/`);
  }
}

export async function updateResumeLine(formData: FormData) {
  // console.log(formData);
  // const validatedFields = UpdateCertificationSchema.safeParse({
  //   user_id: formData.get("user_id"),
  //   certification_id: formData.get("certification_id"),
  //   resume_id: formData.get("resume_id"),
  //   certification_name: formData.get("certification_name"),
  //   certification_location: formData.get("location_name"),
  // });
  // // console.log(validatedFields);
  // // // // console.log(validatedFields);
  // if (validatedFields.success === false) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Create user skill.",
  //   };
  // }
  // const {
  //   user_id,
  //   resume_id,
  //   certification_id,
  //   certification_name,
  //   certification_location,
  // } = validatedFields.data;
  // try {
  //   const query = `UPDATE user_custom_section_two SET name = '${certification_name}', location = '${certification_location}' WHERE id = '${certification_id}'`;
  //   const data = await conn.query(query);
  //   // console.log(query1);
  // } catch (error) {
  //   return { message: `Database Error: Failed to Update Invoice. ${error}` };
  // }
  // if (resume_id !== "blank") {
  //   revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  //   redirect(`/dashboard/resume/edit/${resume_id}`);
  // } else {
  //   revalidatePath(`/dashboard/certifications/`);
  //   redirect(`/dashboard/certifications/`);
  // }
}

export async function deleteResumeLine(formData: FormData) {
  
  const validatedFields = DeleteResumeLineSchema.safeParse({
    user_id: formData.get("user_id"),
    id: formData.get("id"),
    resume_id: formData.get("resume_id"),
    line_type: formData.get("line_type"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { user_id, id, resume_id, line_type } = validatedFields.data;

  try {

    let query;

    //check the linetype and formulate a specific query
    if (line_type === "education") {
      query = `DELETE FROM resume_lines WHERE resume_id = '${resume_id}' AND user_education_id = '${id}'`;
    } else if (line_type === "custom-section-one") {
      query = `DELETE FROM resume_lines WHERE resume_id = '${resume_id}' AND user_custom_section_one_id = '${id}'`;
    } else if (line_type === "custom-section-two") {
      query = `DELETE FROM resume_lines WHERE resume_id = '${resume_id}' AND user_custom_section_two_id = '${id}'`;
    } else if (line_type === "skill") {
      query = `DELETE FROM resume_lines WHERE resume_id = '${resume_id}' AND user_skills_id = '${id}'`;
    } else if (line_type === "work") {
      query = `DELETE FROM resume_lines WHERE resume_id = '${resume_id}' AND work_experience_id = '${id}'`;
    } else {
      query = "";
    }


    const data = await conn.query(query);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  if (resume_id === "blank" ?? line_type === "education") {
    revalidatePath(`/dashboard/education/`);
    redirect(`/dashboard/education/`);
  } else if (resume_id === "blank" ?? line_type === "skill") {
    revalidatePath(`/dashboard/skills/`);
    redirect(`/dashboard/skills/`);
  } else if (resume_id === "blank" ?? line_type === "work") {
    revalidatePath(`/dashboard/work-experience/`);
    redirect(`/dashboard/work-experience/`);
  } else if (resume_id === "blank" ?? line_type === "custom-section-one") {
    revalidatePath(`/dashboard/organizations/`);
    redirect(`/dashboard/organizations/`);
  } else if (resume_id === "blank" ?? line_type === "custom-section-two") {
    revalidatePath(`/dashboard/certifications/`);
    redirect(`/dashboard/certifications/`);
  } else if (resume_id !== "blank") {
    revalidatePath(`/dashboard/resume/edit/${resume_id}`);
    redirect(`/dashboard/resume/edit/${resume_id}`);
  }

  // if (resume_id !== "blank") {
  //   revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  //   redirect(`/dashboard/resume/edit/${resume_id}`);
  // } else {
  //   revalidatePath(`/dashboard/education/`);
  //   redirect(`/dashboard/education/`);
  // }
}

export async function createResumeLine(formData: FormData) {

  const validatedFields = CreateResumeLineSchema.safeParse({
    user_id: formData.get("user_id"),
    resume_id: formData.get("resume_id"),
    line_type: formData.get("line_type"),
    id: formData.get("id"),
  });

  if (validatedFields.success === false) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { user_id, resume_id, line_type, id } = validatedFields.data;

  let data1;

  try {
    let query;

    //check the linetype and formulate a specific query
    if (line_type === "education") {
      query = `SELECT * FROM resume_lines WHERE resume_id = '${resume_id}' AND user_education_id = '${id}'`;
    } else if (line_type === "custom-section-one") {
      query = `SELECT * FROM resume_lines WHERE resume_id = '${resume_id}' AND user_custom_section_one_id = '${id}'`;
    } else if (line_type === "custom-section-two") {
      query = `SELECT * FROM resume_lines WHERE resume_id = '${resume_id}' AND user_custom_section_two_id = '${id}'`;
    } else if (line_type === "skill") {
      query = `SELECT * FROM resume_lines WHERE resume_id = '${resume_id}' AND user_skills_id = '${id}'`;
    } else if (line_type === "work") {
      query = `SELECT * FROM resume_lines WHERE resume_id = '${resume_id}' AND work_experience_id = '${id}'`;
    } else {
      query = "";
    }

    data1 = await conn.query(query);

  } catch (error) {
    return {
      message: `Database Error: ${error}`,
    };
  }

  if (data1.rowCount > 0) {
    return {
      message: `Database Error: Resume already has ${line_type} ${id} included.`,
    };
  } else {
    let query;

    if (line_type === "education") {
      query = `INSERT INTO resume_lines (user_id, resume_id, user_education_id, line_type, position) VALUES ('${user_id}', '${resume_id}', '${id}', '${line_type}', '0' )`;
    } else if (line_type === "custom-section-one") {
      query = `INSERT INTO resume_lines (user_id, resume_id, user_custom_section_one_id, line_type, position) VALUES ('${user_id}', '${resume_id}', '${id}', '${line_type}', '0' )`;
    } else if (line_type === "custom-section-two") {
      query = `INSERT INTO resume_lines (user_id, resume_id, user_custom_section_two_id, line_type, position) VALUES ('${user_id}', '${resume_id}', '${id}', '${line_type}', '0' )`;
    } else if (line_type === "skill") {
      query = `INSERT INTO resume_lines (user_id, resume_id, user_skills_id, line_type, position) VALUES ('${user_id}', '${resume_id}', '${id}', '${line_type}', '0' )`;
    } else if (line_type === "work") {
      query = `INSERT INTO resume_lines (user_id, resume_id, work_experience_id, line_type, position) VALUES ('${user_id}', '${resume_id}', '${id}', '${line_type}', '0' )`;
    } else {
      query = "";
    }


    try {
      const data = await conn.query(query);
    } catch (error) {
      return {
        message: `Database Error: Failed to create resume ${line_type} line. ${error}`,
      };
    }

    if (resume_id === "blank" ?? line_type === "education") {
      revalidatePath(`/dashboard/education/`);
      redirect(`/dashboard/education/`);
    } else if (resume_id === "blank" ?? line_type === "skill") {
      revalidatePath(`/dashboard/skills/`);
      redirect(`/dashboard/skills/`);
    } else if (resume_id === "blank" ?? line_type === "work") {
      revalidatePath(`/dashboard/work-experience/`);
      redirect(`/dashboard/work-experience/`);
    } else if (resume_id === "blank" ?? line_type === "custom-section-one") {
      revalidatePath(`/dashboard/organizations/`);
      redirect(`/dashboard/organizations/`);
    } else if (resume_id === "blank" ?? line_type === "custom-section-two") {
      revalidatePath(`/dashboard/certifications/`);
      redirect(`/dashboard/certifications/`);
    } else if (resume_id !== "blank") {
      revalidatePath(`/dashboard/resume/edit/${resume_id}`);
      redirect(`/dashboard/resume/edit/${resume_id}`);
    }
  }
}
