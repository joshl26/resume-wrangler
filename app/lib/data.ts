import { conn } from "../lib/database";

import {
  BodyFont,
  BodyFonts,
  HeaderFont,
  HeaderFonts,
  Resume,
  ResumeColor,
  ResumeColors,
  ResumeTemplate,
  ResumeTemplates,
  Resumes,
  User,
  userOrganizations,
  UserEducations,
  UserSkills,
  UserOrganization,
  UserCertifications,
  UserCertification,
  UserWorkExperience,
  UserWorkExperiences,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredInvoices(
//   query: string,
//   currentPage: number
// ) {
//   noStore();

//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await sql<InvoicesTable>`
//       SELECT
//         invoices.id,
//         invoices.amount,
//         invoices.date,
//         invoices.status,
//         customers.name,
//         customers.email,
//         customers.image_url
//       FROM invoices
//       JOIN customers ON invoices.customer_id = customers.id
//       WHERE
//         customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`} OR
//         invoices.amount::text ILIKE ${`%${query}%`} OR
//         invoices.date::text ILIKE ${`%${query}%`} OR
//         invoices.status ILIKE ${`%${query}%`}
//       ORDER BY invoices.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return invoices.rows;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch invoices.");
//   }
// }

export async function getUser(email: string) {
  noStore();

  try {
    const query = `SELECT * FROM users WHERE email='${email}'`;
    const data = await conn.query(query);

    const user: User = data.rows[0];

    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getResumeTemplates() {
  noStore();

  try {
    const query = "SELECT * FROM resume_templates ORDER BY name ASC";
    const latestResumeTemplates = await conn.query(query);
    return latestResumeTemplates.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume templates.");
    return {};
  }
}

export async function fetchResumeTemplateById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_templates WHERE resume_templates.id = '${id}'`;
    // console.log(query);
    const resumeTemplate = await conn.query(query);
    return resumeTemplate.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchApplicationsByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM applications WHERE user_id = '${userId}'`;
    // console.log(query);
    const resumeTemplate = await conn.query(query);
    return resumeTemplate.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchCompanyNameById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM companies WHERE id = '${id}'`;
    // console.log(query);
    const company = await conn.query(query);
    // console.log(company);
    return company.rows[0].name;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchLatestCompaniesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM companies WHERE user_id = '${userId}'`;
    // console.log(query);
    const companies = await conn.query(query);
    // console.log(companies);
    return companies.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchApplicationById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM applications WHERE id = '${id}'`;
    // console.log(query);
    const application = await conn.query(query);
    return application.rows[0];
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchCompanyById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM companies WHERE id = '${id}'`;
    // console.log(query);
    const application = await conn.query(query);
    return application.rows[0];
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchResumesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM resumes WHERE user_id = '${userId}'`;
    // console.log(query);
    const resumes = await conn.query(query);
    return resumes.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCoverLettersByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_letters WHERE user_id = '${userId}'`;
    // console.log(query);
    const coverLetters = await conn.query(query);
    return coverLetters.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchResumeTemplates() {
  noStore();

  try {
    const query = `SELECT * FROM resume_templates ORDER BY name ASC`;
    const data = await conn.query(query);

    const resumeTemplates: ResumeTemplates = data.rows.map(
      (resumeTemplate: ResumeTemplate) => ({
        ...resumeTemplate,
      })
    );

    return resumeTemplates;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchResumeColors() {
  noStore();

  try {
    const query = `SELECT * FROM resume_colors ORDER BY name ASC`;
    const data = await conn.query(query);

    const resumeColors: ResumeColors = data.rows.map(
      (resumeColor: ResumeColor) => ({
        ...resumeColor,
      })
    );

    return resumeColors;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchBodyFonts() {
  noStore();

  try {
    const query = `SELECT * FROM body_fonts ORDER BY name ASC`;

    const data = await conn.query(query);

    const bodyFonts: BodyFonts = data.rows.map((bodyFont: BodyFont) => ({
      ...bodyFont,
    }));

    return bodyFonts;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchHeaderFonts() {
  noStore();

  try {
    const query = `SELECT * FROM header_fonts ORDER BY name ASC`;
    const data = await conn.query(query);

    const headerFonts: HeaderFonts = data.rows.map(
      (headerFont: HeaderFont) => ({
        ...headerFont,
      })
    );

    return headerFonts;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchResumeById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resumes WHERE id = '${id}'`;
    const data = await conn.query(query);

    const resume: Resume = data?.rows[0];

    return resume;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchSkillsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_skills WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    const skills: UserSkills = data?.rows;

    return skills;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchEducationByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_education WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    // if (resume.rows[0]) {
    //   return resume.rows;
    // } else {
    //   return [null];
    // }

    const userEducations: UserEducations = data?.rows;

    return userEducations;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchOrganizationsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_one WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    const userOrganizations: userOrganizations = data?.rows?.map(
      (userOrganization: UserOrganization) => ({
        ...userOrganization,
      })
    );

    // const userOrganizations: userOrganizations = data?.rows;

    return userOrganizations;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCerftificationsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_two WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    const userCertifications: UserCertifications = data?.rows?.map(
      (userCertification: UserCertification) => ({
        ...userCertification,
      })
    );

    return userCertifications;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchWorkExperiencesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_work_experience WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    const userWorkExperiences: UserWorkExperiences = data?.rows?.map(
      (userWorkExperience: UserWorkExperience) => ({
        ...userWorkExperience,
      })
    );

    return userWorkExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function getData(resumeId: string, userEmail: string) {
  noStore();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  const res = await fetch(
    `http://${process.env.DEPLOYMENT_URL}/api/resume-data?resumeId=${resumeId}&userEmail=${userEmail}`
    // `http://localhost:3000/api/resume-data?resumeId=${resumeId}&userEmail=${userEmail}`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function fetchWorkExperienceById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_work_experience WHERE id = '${id}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows[0];
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCertificationById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_custom_section_two WHERE id = '${id}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows[0];
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchOrganizationById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_custom_section_one WHERE id = '${id}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows[0];
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchLatestResumeLinesbyResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines WHERE resume_id = '${id}'`;
    // console.log(query);
    const resumeLines = await conn.query(query);

    if (resumeLines.rows[0]) {
      return resumeLines.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchEducationExperiencesbyResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_education u ON r.user_education_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;

    // console.log(query);
    const resumeLines = await conn.query(query);

    // console.log(resumeLines.rowCount);

    if (resumeLines.rows[0]) {
      return resumeLines.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchEducationById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_education WHERE id = '${id}'`;
    // console.log(query);
    const application = await conn.query(query);
    return application.rows[0];
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchSkillById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_skills WHERE id = '${id}'`;
    // console.log(query);
    const skills = await conn.query(query);
    return skills.rows[0];
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return {};
  }
}

export async function fetchWorkExperiencesbyResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_work_experience u ON r.work_experience_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;

    // console.log(query);
    const resumeLines = await conn.query(query);

    // console.log(resumeLines.rowCount);

    if (resumeLines.rows[0]) {
      return resumeLines.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchSkillsByResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_skills u ON r.user_skills_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;

    // console.log(query);
    const skillLines = await conn.query(query);

    // console.log(skillLines.rowCount);

    if (skillLines.rows[0]) {
      return skillLines.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCertificationsByResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_custom_section_two u ON r.user_custom_section_two_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;

    // console.log(query);
    const certificationLines = await conn.query(query);

    // console.log(certificationLines.rowCount);

    if (certificationLines.rows[0]) {
      return certificationLines.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchOrganizationsByResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_custom_section_one u ON r.user_custom_section_one_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;

    // console.log(query);
    const certificationLines = await conn.query(query);

    // console.log(certificationLines.rowCount);

    if (certificationLines.rows[0]) {
      return certificationLines.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}
