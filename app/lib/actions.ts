"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
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
});

const UserSocialsSchema = z.object({
  id: z.string(),
  linkedin: z.string({
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
});

const DeleteSkillsSchema = z.object({
  id: z.string({
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

const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceSchema.omit({ id: true, date: true });
const DeleteInvoice = InvoiceSchema.omit({ id: true, date: true });
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

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Database Error: Failed to Create Invoice.",
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
}

export async function updateUser(
  id: string,
  prevState: State,
  formData: FormData
) {
  // console.log(formData);
  const validatedFields = UpdateUser.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    first_name: formData.get("first-name"),
    last_name: formData.get("last-name"),
    address_line_one: formData.get("address-one"),
    address_line_two: formData.get("address-two"),
    address_line_three: formData.get("address-three"),
    phone: formData.get("phone"),
    website: formData.get("website"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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
  } = validatedFields.data;

  try {
    const query = `UPDATE users SET name = '${name}', email = '${email}', first_name = '${first_name}', last_name = '${last_name}', address_one = '${address_line_one}', address_two = '${address_line_two}', address_three = '${address_line_three}', phone = '${phone}', website = '${website}' WHERE id = '${id}'`;
    // console.log(query);

    const data = await conn.query(query);

    // console.log(data);

    // await sql`
    //     UPDATE invoices
    //     SET name = '${name}', email = '${email}'
    //     WHERE id = ${id}
    //   `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/user-profile");
  redirect("/dashboard/user-profile");
}

export async function updateSocials(
  id: string,
  prevState: State,
  formData: FormData
) {
  // console.log(formData);
  const validatedFields = UpdateSocials.safeParse({
    linkedin: formData.get("linkedin"),
    twitter: formData.get("twitter"),
    facebook: formData.get("facebook"),
    instagram: formData.get("instagram"),
    show_socials: formData.get("show-socials"),
    github: formData.get("github"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { linkedin, twitter, facebook, instagram, show_socials, github } =
    validatedFields.data;

  try {
    const query = `UPDATE users SET linked_in = '${linkedin}', twitter = '${twitter}', facebook = '${facebook}', instagram = '${instagram}', show_socials = '${show_socials}', github = '${github}' WHERE id = '${id}'`;
    // console.log(query);

    const data = await conn.query(query);

    // console.log(data);

    // await sql`
    //     UPDATE invoices
    //     SET name = '${name}', email = '${email}'
    //     WHERE id = ${id}
    //   `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/user-profile");
  redirect("/dashboard/user-profile");
}

export async function updateApplication(formData: FormData) {
  // console.log(formData);
  const validatedFields = UpdateApplication.safeParse({
    id: formData.get("application_id"),
    postingText: formData.get("posting_text"),
    // isComplete: formData.get("is_complete"),
    jobPosition: formData.get("job_position"),
    postingUrl: formData.get("posting_url"),
    analyzedPostingText: formData.get("analyzed_posting_text"),
    companyId: formData.get("company_id"),
  });

  // console.log(validatedFields);

  if (!validatedFields.success) {
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
    // console.log(query);

    const data = await conn.query(query);
    // console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function createApplication(formData: FormData) {
  // console.log(formData);
  const validatedFields = UpdateApplication.safeParse({
    id: formData.get("user_id"),
    postingText: formData.get("posting_text"),
    // isComplete: formData.get("is_complete"),
    jobPosition: formData.get("job_position"),
    postingUrl: formData.get("posting_url"),
    analyzedPostingText: formData.get("analyzed_posting_text"),
    companyId: formData.get("company_id"),
  });

  if (!validatedFields.success) {
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

  // INSERT INTO invoices (customer_id, amount, status, date)
  // VALUES (${customerId}, ${amountInCents}, ${status}, ${date})

  try {
    const query = `INSERT INTO applications (posting_text, job_position, posting_url, analyzed_posting_text, company_id, user_id) VALUES ('${postingText}', '${jobPosition}', '${postingUrl}', '${analyzedPostingText}', '${companyId}', '${id}')`;
    // console.log(query);

    const data = await conn.query(query);
    // console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function deleteApplication(id: string) {
  try {
    const query = `DELETE FROM applications WHERE id = ${id}`;
    // console.log(query);

    const data = await conn.query(query);
    // console.log(data);
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Application. ${error}`,
    };
  }

  revalidatePath("/dashboard/applications");
  redirect("/dashboard/applications");
}

export async function updateCompany(formData: FormData) {
  //console.log(formData);
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

  //console.log(validatedFields);

  if (!validatedFields.success) {
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
    // console.log(query);

    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath("/dashboard/companies");
  redirect("/dashboard/companies");
}

export async function createCompany(formData: FormData) {
  // console.log(formData);
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

  //console.log(validatedFields);

  if (!validatedFields.success) {
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
    //console.log(query);

    const data = await conn.query(query);
    // console.log(data);
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
    // console.log(query);

    const data = await conn.query(query);
    // console.log(data);
  } catch (error) {
    return {
      message: `Database Error: Failed to Delete Company. ${error}`,
    };
  }

  revalidatePath("/dashboard/companies");
  redirect("/dashboard/companies");
}

export async function deleteCoverLetter(id: string) {
  // console.log(id);

  try {
    const query = `DELETE FROM cover_letters WHERE id = ${id}`;
    // console.log(query);

    const data = await conn.query(query);
    // console.log(data);
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

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { user_id, application_id, company_id } = validatedFields.data;

  // console.log(user_id, application_id, company_id);

  try {
    const query = `INSERT INTO cover_letters (user_id, company_id, application_id) VALUES ('${user_id}', '${company_id}', '${application_id}')`;
    //console.log(query);

    const data = await conn.query(query);
    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
    // console.log(data);
  } catch (error) {
    return {
      message: `Database Error: Failed to create new company. ${error}`,
    };
  }
}

export async function deleteResume(id: string) {
  // console.log(id);

  try {
    const query = `DELETE FROM resumes WHERE id = ${id}`;
    // console.log(query);

    const data = await conn.query(query);
    // console.log(data);
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

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { user_id, application_id, company_id } = validatedFields.data;

  // console.log(user_id, application_id, company_id);

  try {
    const query = `INSERT INTO resumes (user_id, company_id, application_id) VALUES ('${user_id}', '${company_id}', '${application_id}')`;
    //console.log(query);

    const data = await conn.query(query);
    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
    // console.log(data);
  } catch (error) {
    return {
      message: `Database Error: Failed to create new company. ${error}`,
    };
  }
}

export async function updateYourResumeStyle(formData: FormData) {
  // console.log(formData);

  const validatedFields = YourResumeStyleSchema.safeParse({
    resume_title: formData.get("resume_title"),
    resume_template: formData.get("resume_template"),
    color: formData.get("color"),
    header_font: formData.get("header_font"),
    body_font: formData.get("body_font"),
    resume_id: formData.get("resume_id"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
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
  } = validatedFields.data;

  try {
    const query = `UPDATE resumes SET title = '${resume_title}', template = '${resume_template}', color = '${color}', heading_font = '${header_font}', body_font = '${body_font}' WHERE id = '${resume_id}'`;
    // console.log(query);

    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function updateYourSkills(formData: FormData) {
  // console.log(formData);
}

export async function createUserSkill(formData: FormData) {
  console.log(formData);

  const validatedFields = CreateSkillsSchema.safeParse({
    skill_title: formData.get("skill_title"),
    user_id: formData.get("user_id"),
    skill_level: formData.get("skill_level"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { skill_title, skill_level, user_id } = validatedFields.data;

  // console.log(skill_title, skill_level, user_id);

  try {
    const query = `INSERT INTO user_skills (skill, skill_level, user_id) VALUES ('${skill_title}', '${skill_level}', '${user_id}')`; // console.log(query);
    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/`);
  redirect(`/dashboard/resume/edit/`);
}

export async function deleteUserSkill(formData: FormData) {
  console.log(formData);

  const validatedFields = DeleteSkillsSchema.safeParse({
    id: formData.get("id"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id } = validatedFields.data;

  // console.log(skill_title, skill_level, user_id);

  try {
    const query = `DELETE FROM user_skills WHERE id = '${id}'`;
    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/`);
  redirect(`/dashboard/resume/edit/`);
}

export async function createUserEducation(formData: FormData) {
  console.log(formData);

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

  // console.log(validatedFields);

  if (!validatedFields.success) {
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

  // // console.log(skill_title, skill_level, user_id);

  try {
    const query = `INSERT INTO user_education (user_id, institution_name, location, start_date, end_date, grade, program, url) VALUES ('${user_id}', '${institution_name}', '${location}', '${start_date}' , '${end_date}' , '${grade}' , '${program}' , '${url}')`; // console.log(query);
    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Update Invoice. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function deleteEducation(formData: FormData) {
  console.log(formData);

  const validatedFields = DeleteEducationSchema.safeParse({
    id: formData.get("education_id"),
    resume_id: formData.get("resume_id"),
  });

  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;

  // console.log(skill_title, skill_level, user_id);

  try {
    const query = `DELETE FROM user_education WHERE id = '${id}'`;
    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function createOrganization(formData: FormData) {
  console.log(formData);

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

  console.log(validatedFields);

  if (!validatedFields.success) {
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

  // console.log(
  //   user_id,
  //   section_title,
  //   organization_name,
  //   organization_location,
  //   organization_start,
  //   organization_end,
  //   organization_description
  // );

  try {
    const query = `INSERT INTO user_custom_section_one (user_id, name, location, start_date, end_date, description) VALUES ('${user_id}', '${organization_name}', '${organization_location}', '${organization_start}' , '${organization_end}' , '${organization_description}' )`; // console.log(query);
    const data = await conn.query(query);

    const query2 = `UPDATE resumes SET custom_section_one_name = '${section_title}' WHERE id = '${resume_id}'`; // console.log(query);
    const data2 = await conn.query(query2);

    //console.log(data);
  } catch (error) {
    return {
      message: `Database Error: Failed to Create new organization. ${error}`,
    };
  }

  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function deleteOrganization(formData: FormData) {
  // console.log(formData);

  const validatedFields = DeleteOrganizationSchema.safeParse({
    id: formData.get("organization_id"),
    resume_id: formData.get("resume_id"),
  });

  // console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create user skill.",
    };
  }
  const { id, resume_id } = validatedFields.data;

  // console.log(skill_title, skill_level, user_id);

  try {
    const query = `DELETE FROM user_custom_section_one WHERE id = '${id}'`;
    const data = await conn.query(query);
    //console.log(data);
  } catch (error) {
    return { message: `Database Error: Failed to Delete user skill. ${error}` };
  }
  revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  redirect(`/dashboard/resume/edit/${resume_id}`);
}

export async function deleteCertification(formData: FormData) {
  // console.log(formData);
  // const validatedFields = DeleteOrganizationSchema.safeParse({
  //   id: formData.get("organization_id"),
  //   resume_id: formData.get("resume_id"),
  // });
  // // console.log(validatedFields);
  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields. Failed to Create user skill.",
  //   };
  // }
  // const { id, resume_id } = validatedFields.data;
  // // console.log(skill_title, skill_level, user_id);
  // try {
  //   const query = `DELETE FROM user_custom_section_one WHERE id = '${id}'`;
  //   const data = await conn.query(query);
  //   //console.log(data);
  // } catch (error) {
  //   return { message: `Database Error: Failed to Delete user skill. ${error}` };
  // }
  // revalidatePath(`/dashboard/resume/edit/${resume_id}`);
  // redirect(`/dashboard/resume/edit/${resume_id}`);
}
