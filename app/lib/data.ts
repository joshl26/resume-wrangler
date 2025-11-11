"use server";

import { conn } from "../lib/database";
import { ITEMS_PER_PAGE } from "./constants";

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
  User,
  userOrganizations,
  UserEducationExperiences,
  UserSkills,
  UserOrganization,
  UserCertifications,
  UserCertification,
  UserWorkExperience,
  UserWorkExperiences,
  UserEducationExperience,
  UserSkill,
  Applications,
  Application,
  Companies,
  Company,
  Resumes,
  CoverLetters,
  CoverLetter,
  UserCoverExperiences,
  UserCoverExperience,
  CoverTemplates,
  CoverTemplate,
  UserCoverExperienceLines,
  UserCoverExperienceLine,
} from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
require("dotenv").config();

// Helper function to safely return rows
function safeRows<T>(data: any): T[] {
  if (!data || !Array.isArray(data.rows)) return [];
  return data.rows as T[];
}

export async function getUser(email: string) {
  noStore();

  try {
    const query = `SELECT * FROM users WHERE email = $1`;
    const data = await conn.query(query, [email]);

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
    const query = `SELECT * FROM resume_templates ORDER BY name ASC`;
    const latestResumeTemplates = await conn.query(query);
    return safeRows<ResumeTemplate>(latestResumeTemplates);
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchResumeTemplateById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_templates WHERE id = $1`;
    const resumeTemplate = await conn.query(query, [id]);
    return safeRows<ResumeTemplate>(resumeTemplate);
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchApplicationsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM applications WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const userApplications: Applications = safeRows<Application>(data).map(
      (application: Application) => ({
        ...application,
      })
    );

    return userApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchFilteredApplications(
  query: string,
  currentPage: number,
  userId: string,
  sort: string
): Promise<Applications> {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  let mainQuery: string;
  const values: any[] = [userId, pattern, ITEMS_PER_PAGE, offset];

  if (sort === "" || sort === "all") {
    mainQuery = `
      SELECT *
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
      ORDER BY a.created_at DESC
      LIMIT $3 OFFSET $4
    `;
  } else if (sort === "submitted") {
    mainQuery = `
      SELECT *
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND a.is_complete = 'true'
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
      ORDER BY a.created_at DESC
      LIMIT $3 OFFSET $4
    `;
  } else if (sort === "not_submitted") {
    mainQuery = `
      SELECT *
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND a.is_complete = 'false'
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
      ORDER BY a.created_at DESC
      LIMIT $3 OFFSET $4
    `;
  } else {
    mainQuery = `
      SELECT *
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
      ORDER BY a.created_at DESC
      LIMIT $3 OFFSET $4
    `;
  }

  try {
    const applications = await conn.query(mainQuery, values);
    return safeRows<Application>(applications);
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchApplicationsPages(
  query: string,
  userId: string,
  sort: string
) {
  noStore();

  const pattern = `%${query}%`;
  let mainQuery: string;
  const values: any[] = [userId, pattern];

  if (sort === "" || sort === "all") {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  } else if (sort === "submitted") {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND a.is_complete = 'true'
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  } else if (sort === "not_submitted") {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND a.is_complete = 'false'
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  } else {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  }

  try {
    const count = await conn.query(mainQuery, values);
    const totalPages = Math.ceil(Number(count.rows[0].application_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of applications.");
  }
}

export async function fetchApplicationsCount(query: string, userId: string, sort: string) {
  noStore();

  const pattern = `%${query}%`;
  let mainQuery: string;
  const values: any[] = [userId, pattern];

  if (sort === "" || sort === "all") {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  } else if (sort === "submitted") {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND a.is_complete = 'true'
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  } else if (sort === "not_submitted") {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND a.is_complete = 'false'
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  } else {
    mainQuery = `
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        a.job_position::text ILIKE $2 OR
        c.address_one::text ILIKE $2
      )
    `;
  }

  try {
    const count = await conn.query(mainQuery, values);
    const totalPages: number = Number(count.rows[0].application_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of applications.");
  }
}

export async function fetchFilteredEducation(
  query: string,
  currentPage: number,
  userId: string
): Promise<UserEducationExperiences> {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  try {
    const applications = await conn.query(
      `
        SELECT *
        FROM user_education u
        WHERE u.user_id = $1
        AND (
          u.institution_name::text ILIKE $2 OR
          u.location::text ILIKE $2
        )
        ORDER BY u.created_at DESC
        LIMIT $3 OFFSET $4
      `,
      [userId, pattern, ITEMS_PER_PAGE, offset]
    );

    return safeRows<UserEducationExperience>(applications);
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchEducationPages(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
      SELECT COUNT(*) AS education_count
      FROM user_education u
      WHERE u.user_id = $1
      AND (u.location::text ILIKE $2 OR u.institution_name::text ILIKE $2)
    `,
      [userId, pattern]
    );

    const totalPages: number = Math.ceil(Number(count.rows[0].education_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of education pages.");
  }
}

export async function fetchEducationCount(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
    SELECT COUNT(*) AS education_count
    FROM user_education u
    WHERE u.user_id = $1
    AND (u.location::text ILIKE $2 OR u.institution_name::text ILIKE $2)
  `,
      [userId, pattern]
    );

    const totalPages: number = Number(count.rows[0].education_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch education count.");
  }
}

export async function fetchFilteredSkills(query: string, currentPage: number, userId: string): Promise<UserSkills> {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  try {
    const skills = await conn.query(
      `
        SELECT *
        FROM user_skills u
        WHERE u.user_id = $1
        AND (
          u.skill::text ILIKE $2 OR
          u.skill_level::text ILIKE $2
        )
        ORDER BY u.skill ASC
        LIMIT $3 OFFSET $4
      `,
      [userId, pattern, ITEMS_PER_PAGE, offset]
    );

    return safeRows<UserSkill>(skills);
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchSkillsPages(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
      SELECT COUNT(*) AS skills_count
      FROM user_skills u
      WHERE u.user_id = $1
      AND (u.skill::text ILIKE $2 OR u.skill_level::text ILIKE $2)
    `,
      [userId, pattern]
    );

    const totalPages: number = Math.ceil(Number(count.rows[0].skills_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of skills pages.");
  }
}

export async function fetchSkillsCount(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
    SELECT COUNT(*) AS skills_count
    FROM user_skills u
    WHERE u.user_id = $1
    AND (u.skill::text ILIKE $2 OR u.skill_level::text ILIKE $2)
  `,
      [userId, pattern]
    );

    const totalPages: number = Number(count.rows[0].skills_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills count.");
  }
}

export async function fetchFilteredCompanies(query: string, currentPage: number, userId: string) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  try {
    const companies = await conn.query(
      `
        SELECT *
        FROM companies c
        WHERE c.user_id = $1
        AND (
          c.name::text ILIKE $2 OR
          c.address_one::text ILIKE $2 OR
          c.address_two::text ILIKE $2 OR
          c.website_url::text ILIKE $2
        )
        ORDER BY c.created_at DESC
        LIMIT $3 OFFSET $4
    `,
      [userId, pattern, ITEMS_PER_PAGE, offset]
    );

    return safeRows<Company>(companies);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchCompaniesPages(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
      SELECT COUNT(*) AS companies_count
      FROM companies c
      WHERE c.user_id = $1
      AND (
        c.name::text ILIKE $2 OR
        c.address_one::text ILIKE $2 OR
        c.address_two::text ILIKE $2 OR
        c.website_url::text ILIKE $2
      )
    `,
      [userId, pattern]
    );

    const totalPages: number = Math.ceil(Number(count.rows[0].companies_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of companies pages.");
  }
}

export async function fetchCompaniesCount(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
    SELECT COUNT(*) AS companies_count
    FROM companies c
    WHERE c.user_id = $1
    AND (
      c.name::text ILIKE $2 OR
      c.address_one::text ILIKE $2 OR
      c.address_two::text ILIKE $2 OR
      c.website_url::text ILIKE $2
    )
  `,
      [userId, pattern]
    );

    const totalPages: number = Number(count.rows[0].companies_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies count.");
  }
}

// Work Experience Functions
export async function fetchFilteredWorkExperiences(query: string, currentPage: number, userId: string) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  try {
    const workExperiences = await conn.query(
      `
        SELECT *
        FROM user_work_experience u
        WHERE u.user_id = $1
        AND (
          u.job_title::text ILIKE $2 OR
          u.company_name::text ILIKE $2 OR
          u.location::text ILIKE $2
        )
        ORDER BY u.created_at DESC
        LIMIT $3 OFFSET $4
    `,
      [userId, pattern, ITEMS_PER_PAGE, offset]
    );

    return safeRows<UserWorkExperience>(workExperiences);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch work experiences.");
  }
}

export async function fetchWorkExperiencePages(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
      SELECT COUNT(*) AS work_experiences_count
      FROM user_work_experience u
      WHERE u.user_id = $1
      AND (
        u.job_title::text ILIKE $2 OR
        u.company_name::text ILIKE $2 OR
        u.location::text ILIKE $2
      )
    `,
      [userId, pattern]
    );

    const totalPages: number = Math.ceil(Number(count.rows[0].work_experiences_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of work experience pages.");
  }
}

export async function fetchWorkExperiencesCount(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
    SELECT COUNT(*) AS work_experiences_count
    FROM user_work_experience u
    WHERE u.user_id = $1
    AND (
      u.job_title::text ILIKE $2 OR
      u.company_name::text ILIKE $2 OR
      u.location::text ILIKE $2
    )
  `,
      [userId, pattern]
    );

    const totalPages: number = Number(count.rows[0].work_experiences_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch work experiences count.");
  }
}

export async function fetchFilteredUserCustomSectionOne(query: string, currentPage: number, userId: string) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  try {
    const user_custom_section_one = await conn.query(
      `
        SELECT *
        FROM user_custom_section_one u
        WHERE u.user_id = $1
        AND (
          u.name::text ILIKE $2 OR
          u.description::text ILIKE $2 OR
          u.location::text ILIKE $2
        )
        ORDER BY u.created_at DESC
        LIMIT $3 OFFSET $4
    `,
      [userId, pattern, ITEMS_PER_PAGE, offset]
    );

    return safeRows(user_custom_section_one);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch custom section one records.");
  }
}

export async function fetchUserCustomSectionOnePages(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
      SELECT COUNT(*) AS user_custom_section_one_count
      FROM user_custom_section_one u
      WHERE u.user_id = $1
      AND (
        u.name::text ILIKE $2 OR
        u.description::text ILIKE $2 OR
        u.location::text ILIKE $2
      )
    `,
      [userId, pattern]
    );

    const totalPages: number = Math.ceil(Number(count.rows[0].user_custom_section_one_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of custom section one pages.");
  }
}

export async function fetchUserCustomSectionOneCount(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
    SELECT COUNT(*) AS user_custom_section_one_count
    FROM user_custom_section_one u
    WHERE u.user_id = $1
    AND (
      u.name::text ILIKE $2 OR
      u.description::text ILIKE $2 OR
      u.location::text ILIKE $2
    )
  `,
      [userId, pattern]
    );

    const totalPages: number = Number(count.rows[0].user_custom_section_one_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch custom section one count.");
  }
}

export async function fetchFilteredUserCustomSectionTwo(query: string, currentPage: number, userId: string) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const pattern = `%${query}%`;

  try {
    const user_custom_section_two = await conn.query(
      `
        SELECT *
        FROM user_custom_section_two u
        WHERE u.user_id = $1
        AND (
          u.name::text ILIKE $2 OR
          u.description::text ILIKE $2 OR
          u.location::text ILIKE $2
        )
        ORDER BY u.created_at DESC
        LIMIT $3 OFFSET $4
    `,
      [userId, pattern, ITEMS_PER_PAGE, offset]
    );

    return safeRows(user_custom_section_two);
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch custom section two records.");
  }
}

export async function fetchUserCustomSectionTwoPages(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
      SELECT COUNT(*) AS user_custom_section_two_count
      FROM user_custom_section_two u
      WHERE u.user_id = $1
      AND (
        u.name::text ILIKE $2 OR
        u.description::text ILIKE $2 OR
        u.location::text ILIKE $2
      )
    `,
      [userId, pattern]
    );

    const totalPages: number = Math.ceil(Number(count.rows[0].user_custom_section_two_count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of custom section two pages.");
  }
}

export async function fetchUserCustomSectionTwoCount(query: string, userId: string) {
  noStore();

  const pattern = `%${query}%`;

  try {
    const count = await conn.query(
      `
    SELECT COUNT(*) AS user_custom_section_two_count
    FROM user_custom_section_two u
    WHERE u.user_id = $1
    AND (
      u.name::text ILIKE $2 OR
      u.description::text ILIKE $2 OR
      u.location::text ILIKE $2
    )
  `,
      [userId, pattern]
    );

    const totalPages: number = Number(count.rows[0].user_custom_section_two_count);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch custom section two count.");
  }
}

export async function fetchCompanyNameById(id: string) {
  noStore();

  try {
    const query = `SELECT name FROM companies WHERE id = $1`;
    const company = await conn.query(query, [id]);
    return company.rows[0]?.name;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchLatestCompaniesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM companies WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const userCompanies: Companies = safeRows<Company>(data).map((company: Company) => ({
      ...company,
    }));

    return userCompanies;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchApplicationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM applications WHERE id = $1`;
    const data = await conn.query(query, [id]);

    const application: Application = data?.rows[0];

    return application;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchCompanyById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM companies WHERE id = $1`;
    const application = await conn.query(query, [id]);
    return application.rows[0];
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchResumesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM resumes WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const resumes: Resumes = safeRows<Resume>(data).map((resume: Resume) => ({
      ...resume,
    }));

    return resumes;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchCoverLettersByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_letters WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const coverLetters: CoverLetters = safeRows<CoverLetter>(data).map((coverLetter: CoverLetter) => ({
      ...coverLetter,
    }));

    return coverLetters;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchResumeTemplates(): Promise<ResumeTemplates> {
  noStore();

  try {
    const query = `SELECT * FROM resume_templates WHERE active = 'true' ORDER BY name ASC`;
    const data = await conn.query(query);

    const resumeTemplates: ResumeTemplates = safeRows<ResumeTemplate>(data).map((resumeTemplate: ResumeTemplate) => ({
      ...resumeTemplate,
    }));

    return resumeTemplates;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchResumeColors() {
  noStore();

  try {
    const query = `SELECT * FROM resume_colors ORDER BY name ASC`;
    const data = await conn.query(query);

    const resumeColors: ResumeColors = safeRows<ResumeColor>(data).map((resumeColor: ResumeColor) => ({
      ...resumeColor,
    }));

    return resumeColors;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchBodyFonts() {
  noStore();

  try {
    const query = `SELECT * FROM body_fonts ORDER BY name ASC`;
    const data = await conn.query(query);

    const bodyFonts: BodyFonts = safeRows<BodyFont>(data).map((bodyFont: BodyFont) => ({
      ...bodyFont,
    }));

    return bodyFonts;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchHeaderFonts() {
  noStore();

  try {
    const query = `SELECT * FROM header_fonts ORDER BY name ASC`;
    const data = await conn.query(query);

    const headerFonts: HeaderFonts = safeRows<HeaderFont>(data).map((headerFont: HeaderFont) => ({
      ...headerFont,
    }));

    return headerFonts;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchResumeById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resumes WHERE id = $1`;
    const data = await conn.query(query, [id]);

    const resume: Resume = data?.rows[0];

    return resume;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchResumeByIdAndUserId(id: string, userOrId: User | string) {
  noStore();

  try {
    const userId = typeof userOrId === "string" ? userOrId : userOrId.id;
    const isAdmin = typeof userOrId !== "string" && userOrId.access_level === "admin";

    let query: string;
    let values: any[];

    if (isAdmin) {
      query = `SELECT * FROM resumes WHERE id = $1`;
      values = [id];
    } else {
      query = `SELECT * FROM resumes WHERE id = $1 AND user_id = $2`;
      values = [id, userId];
    }

    const data = await conn.query(query, values);
    const resume: Resume = data?.rows[0];
    return resume;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchCoverLetterByIdAndUserId(id: string, userOrId: User | string) {
  noStore();

  try {
    const userId = typeof userOrId === "string" ? userOrId : userOrId.id;
    const isAdmin = typeof userOrId !== "string" && userOrId.access_level === "admin";

    let query: string;
    let values: any[];

    if (isAdmin) {
      query = `SELECT * FROM cover_letters WHERE id = $1`;
      values = [id];
    } else {
      query = `SELECT * FROM cover_letters WHERE id = $1 AND user_id = $2`;
      values = [id, userId];
    }

    const data = await conn.query(query, values);
    const coverLetter: CoverLetter = data?.rows[0];
    return coverLetter;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchCoverTemplates() {
  noStore();

  try {
    const query = `SELECT * FROM cover_letter_templates WHERE active = 'true' ORDER BY name ASC`;
    const data = await conn.query(query);

    const coverTemplates: CoverTemplates = safeRows<CoverTemplate>(data).map((coverTemplate: CoverTemplate) => ({
      ...coverTemplate,
    }));

    return coverTemplates;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchSkillsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_skills WHERE user_id = $1 ORDER BY skill ASC`;
    const data = await conn.query(query, [userId]);

    const skills: UserSkills = safeRows<UserSkill>(data);

    return skills;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchEducationByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_education WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const userEducationExperiences: UserEducationExperiences = safeRows<UserEducationExperience>(data).map(
      (userEducationExperience: UserEducationExperience) => ({
        ...userEducationExperience,
      })
    );

    return userEducationExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchOrganizationsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_one WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const userOrganizations: userOrganizations = safeRows<UserOrganization>(data).map((userOrganization: UserOrganization) => ({
      ...userOrganization,
    }));

    return userOrganizations;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchCertificationsByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_two WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const userCertifications: UserCertifications = safeRows<UserCertification>(data).map((userCertification: UserCertification) => ({
      ...userCertification,
    }));

    return userCertifications;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchWorkExperiencesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_work_experience WHERE user_id = $1`;
    const data = await conn.query(query, [userId]);

    const userWorkExperiences: UserWorkExperiences = safeRows<UserWorkExperience>(data).map((userWorkExperience: UserWorkExperience) => ({
      ...userWorkExperience,
    }));

    return userWorkExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchCoverExperiencesByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_experiences WHERE user_id = $1 ORDER BY title ASC`;
    const data = await conn.query(query, [userId]);

    const userCoverExperiences: UserCoverExperiences = safeRows<UserCoverExperience>(data).map((userCoverExperience: UserCoverExperience) => ({
      ...userCoverExperience,
    }));

    return userCoverExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchCoverExperiencesByCoverLetterId(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_experience_lines WHERE cover_letter_id = $1`;
    const data = await conn.query(query, [id]);

    const userCoverExperiences: UserCoverExperienceLines = safeRows<UserCoverExperienceLine>(data).map(
      (userCoverExperience: UserCoverExperienceLine) => ({
        ...userCoverExperience,
      })
    );

    return userCoverExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function getData(resumeId: string, userEmail: string) {
  noStore();

  const res = await fetch(`${process.env.DEPLOYMENT_URL}/api/resume-data?resumeId=${encodeURIComponent(resumeId)}&userEmail=${encodeURIComponent(userEmail)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCoverData(coverId: string, userEmail: string) {
  noStore();

  const res = await fetch(`${process.env.DEPLOYMENT_URL}/api/cover-data?coverId=${encodeURIComponent(coverId)}&userEmail=${encodeURIComponent(userEmail)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function fetchWorkExperienceById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_work_experience WHERE id = $1`;
    const data = await conn.query(query, [id]);

    const workExperience: UserWorkExperience = data?.rows[0];

    return workExperience;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchCoverExperienceById(id: string, userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_experiences WHERE id = $1 AND user_id = $2`;
    const data = await conn.query(query, [id, userId]);

    const coverExperience: UserCoverExperience = data?.rows[0];

    return coverExperience;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchCertificationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_two WHERE id = $1`;
    const data = await conn.query(query, [id]);

    const certification: UserCertification = data?.rows[0];

    return certification;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchOrganizationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_one WHERE id = $1`;
    const data = await conn.query(query, [id]);
    const organization: UserOrganization = data?.rows[0];

    return organization;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchLatestResumeLinesbyResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines WHERE resume_id = $1`;
    const resumeLines = await conn.query(query, [id]);

    return safeRows(resumeLines);
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchEducationExperiencesbyResumeID(id: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM resume_lines r
      JOIN user_education u ON r.user_education_id = u.id
      WHERE r.resume_id = $1
      ORDER BY position ASC
    `;
    const data = await conn.query(query, [id]);

    const userEducationExperiences: UserEducationExperiences = safeRows<UserEducationExperience>(data).map(
      (userEducationExperience: UserEducationExperience) => ({
        ...userEducationExperience,
      })
    );

    return userEducationExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchEducationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_education WHERE id = $1`;
    const data = await conn.query(query, [id]);

    const userEducationExperience: UserEducationExperience = data.rows[0];

    return userEducationExperience;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchSkillById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_skills WHERE id = $1`;
    const data = await conn.query(query, [id]);

    const skill: UserSkill = data.rows[0];

    return skill;
  } catch (error: any) {
    console.error("Database Error:", error);
    return undefined;
  }
}

export async function fetchWorkExperiencesbyResumeID(id: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM resume_lines r
      JOIN user_work_experience u ON r.work_experience_id = u.id
      WHERE r.resume_id = $1
      ORDER BY u.created_at DESC
    `;
    const data = await conn.query(query, [id]);

    const userWorkExperiences: UserWorkExperiences = safeRows<UserWorkExperience>(data).map(
      (userWorkExperience: UserWorkExperience) => ({
        ...userWorkExperience,
      })
    );

    return userWorkExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchSkillsByResumeID(id: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM resume_lines r
      JOIN user_skills u ON r.user_skills_id = u.id
      WHERE r.resume_id = $1
      ORDER BY position ASC
    `;
    const data = await conn.query(query, [id]);

    const userSkills: UserSkills = safeRows<UserSkill>(data).map((userSkill: UserSkill) => ({
      ...userSkill,
    }));

    return userSkills;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchCertificationsByResumeID(id: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM resume_lines r
      JOIN user_custom_section_two u ON r.user_custom_section_two_id = u.id
      WHERE r.resume_id = $1
      ORDER BY position ASC
    `;
    const data = await conn.query(query, [id]);

    const userCertifications: UserCertifications = safeRows<UserCertification>(data).map((userCertification: UserCertification) => ({
      ...userCertification,
    }));

    return userCertifications;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchOrganizationsByResumeID(id: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM resume_lines r
      JOIN user_custom_section_one u ON r.user_custom_section_one_id = u.id
      WHERE r.resume_id = $1
      ORDER BY position ASC
    `;
    const data = await conn.query(query, [id]);

    const userOrganizations: userOrganizations = safeRows<UserOrganization>(data).map((userOrganization: UserOrganization) => ({
      ...userOrganization,
    }));

    return userOrganizations;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchOpenApplicationsCountByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT COUNT(*)::int AS count FROM applications WHERE user_id = $1 AND is_complete = 'false'`;
    const data = await conn.query(query, [userId]);

    const openApplications: number = Number(data.rows[0]?.count || 0);

    return openApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function fetchClosedApplicationsCountByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT COUNT(*)::int AS count FROM applications WHERE user_id = $1 AND is_complete = 'true'`;
    const data = await conn.query(query, [userId]);

    const openApplications: number = Number(data.rows[0]?.count || 0);

    return openApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function fetchPendingApplicationsCountByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT COUNT(*)::int AS count FROM applications WHERE user_id = $1 AND is_complete = 'pending'`;
    const data = await conn.query(query, [userId]);

    const openApplications: number = Number(data.rows[0]?.count || 0);

    return openApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    return null;
  }
}

export async function fetchCoverLettersByUserIDJoinApplications(userId: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM applications a
      JOIN cover_letters c ON c.application_id = a.id
      WHERE c.user_id = $1
      ORDER BY c.id ASC
    `;
    const data = await conn.query(query, [userId]);

    const coverLetters: (CoverLetter & Application)[] = safeRows<CoverLetter & Application>(data).map((coverLetter: CoverLetter & Application) => ({
      ...coverLetter,
    }));

    return coverLetters;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}

export async function fetchResumesByUserIDJoinApplications(userId: string) {
  noStore();

  try {
    const query = `
      SELECT *
      FROM applications a
      JOIN resumes r ON r.application_id = a.id
      WHERE r.user_id = $1
      ORDER BY r.id ASC
    `;
    const data = await conn.query(query, [userId]);

    const resumes: (Resume & Application)[] = safeRows<Resume & Application>(data).map((resume: Resume & Application) => ({
      ...resume,
    }));

    return resumes;
  } catch (error: any) {
    console.error("Database Error:", error);
    return [];
  }
}