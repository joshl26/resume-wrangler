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
    const data = await conn.query(query);

    const userApplications: Applications = data.rows.map(
      (application: Application) => ({
        ...application,
      })
    );

    return userApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [];
  }
}

export async function fetchFilteredApplications(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Join companies to applications so that applications.id becomes joined table.id
  try {
    const applications = await conn.query(`
        SELECT *
        FROM companies c
        JOIN applications a ON a.company_id = c.id
        WHERE a.user_id = '${userId}' AND 
          (
                c.name::text ILIKE '${`%${query}%`}' OR
                a.job_position::text ILIKE '${`%${query}%`}' OR
                c.address_one::text ILIKE '${`%${query}%`}'
          )
        ORDER BY a.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    // console.log(offset);

    return applications.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch applications.");
  }
}

export async function fetchApplicationsPages(query: string, userId: string) {
  noStore();

  // SELECT COUNT(*) AS application_count
  // FROM applications
  // WHERE user_id = '${userId}'
  // AND (job_position ILIKE '${`%${query}%`}' OR job_position ILIKE '${`%${query}%`}')

  // console.log(userId);

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = '${userId}' 
      AND (c.name::text ILIKE '${`%${query}%`}' OR 
      a.job_position::text ILIKE '${`%${query}%`}' OR 
      c.address_one::text ILIKE '${`%${query}%`}')
    `);

    const totalPages = Math.ceil(
      Number(count.rows[0].application_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

//TODO combine with fetchApplicationsPages
export async function fetchApplicationsCount(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS application_count
      FROM companies c
      JOIN applications a ON a.company_id = c.id
      WHERE a.user_id = '${userId}'
      AND (c.name::text ILIKE '${`%${query}%`}' OR 
      a.job_position::text ILIKE '${`%${query}%`}' OR 
      c.address_one::text ILIKE '${`%${query}%`}')
    `);

    const totalPages: number = count.rows[0].application_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchFilteredEducation(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const applications = await conn.query(`
        SELECT *
        FROM user_education u
        WHERE u.user_id = '${userId}' AND 
          (
                u.institution_name::text ILIKE '${`%${query}%`}' OR
                u.location::text ILIKE '${`%${query}%`}'
          )
        ORDER BY u.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    return applications.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch applications.");
  }
}

export async function fetchEducationPages(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS education_count
      FROM user_education u      
      WHERE u.user_id = '${userId}' 
      AND (u.location::text ILIKE '${`%${query}%`}' OR 
      u.institution_name::text ILIKE '${`%${query}%`}')
    `);

    // console.log(count);

    const totalPages: number = Math.ceil(
      Number(count.rows[0].education_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

//TODO combine with fetchEducationPages
export async function fetchEducationCount(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
    SELECT COUNT(*) AS education_count
    FROM user_education u      
    WHERE u.user_id = '${userId}' 
    AND (u.location::text ILIKE '${`%${query}%`}' OR 
    u.institution_name::text ILIKE '${`%${query}%`}')
  `);

    const totalPages: number = count.rows[0].education_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchFilteredSkills(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const skills = await conn.query(`
        SELECT *
        FROM user_skills u
        WHERE u.user_id = '${userId}' AND 
          (
                u.skill::text ILIKE '${`%${query}%`}' OR
                u.skill_level::text ILIKE '${`%${query}%`}'
          )
        ORDER BY u.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    return skills.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch skills.");
  }
}

export async function fetchSkillsPages(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS skills_count
      FROM user_skills u      
      WHERE u.user_id = '${userId}' 
      AND (u.skill::text ILIKE '${`%${query}%`}' OR 
      u.skill_level::text ILIKE '${`%${query}%`}')
    `);

    // console.log(count);

    const totalPages: number = Math.ceil(
      Number(count.rows[0].skills_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

//TODO combine with fetchEducationPages
export async function fetchSkillsCount(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
    SELECT COUNT(*) AS skills_count
    FROM user_skills u      
    WHERE u.user_id = '${userId}' 
    AND (u.skill::text ILIKE '${`%${query}%`}' OR 
    u.skill_level::text ILIKE '${`%${query}%`}')
  `);

    const totalPages: number = count.rows[0].skills_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchFilteredCompanies(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companies = await conn.query(`
        SELECT *
        FROM companies c
        WHERE c.user_id = '${userId}' AND 
          (
                c.name::text ILIKE '${`%${query}%`}' OR
                c.address_one::text ILIKE '${`%${query}%`}' OR
                c.address_two::text ILIKE '${`%${query}%`}' OR
                c.website_url::text ILIKE '${`%${query}%`}'
          )
        ORDER BY c.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    return companies.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchCompaniesPages(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS companies_count
      FROM companies c      
      WHERE c.user_id = '${userId}' 
      AND (
        c.name::text ILIKE '${`%${query}%`}' OR
        c.address_one::text ILIKE '${`%${query}%`}' OR
        c.address_two::text ILIKE '${`%${query}%`}' OR
        c.website_url::text ILIKE '${`%${query}%`}'
        )
    `);

    // console.log(count);

    const totalPages: number = Math.ceil(
      Number(count.rows[0].companies_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

//TODO combine with fetchEducationPages
export async function fetchCompaniesCount(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
    SELECT COUNT(*) AS companies_count
    FROM companies c      
    WHERE c.user_id = '${userId}' 
    AND (
      c.name::text ILIKE '${`%${query}%`}' OR
      c.address_one::text ILIKE '${`%${query}%`}' OR
      c.address_two::text ILIKE '${`%${query}%`}' OR
      c.website_url::text ILIKE '${`%${query}%`}'
      )
  `);

    const totalPages: number = count.rows[0].companies_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchFilteredWorkExperiences(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const companies = await conn.query(`
        SELECT *
        FROM user_work_experience u
        WHERE u.user_id = '${userId}' AND 
          (
            u.job_title::text ILIKE '${`%${query}%`}' OR
            u.company_name::text ILIKE '${`%${query}%`}' OR
            u.location::text ILIKE '${`%${query}%`}'
          )
        ORDER BY u.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    return companies.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchWorkExperiencePages(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS work_experiences_count
      FROM user_work_experience u      
      WHERE u.user_id = '${userId}' 
      AND (
          u.job_title::text ILIKE '${`%${query}%`}' OR
          u.company_name::text ILIKE '${`%${query}%`}' OR
          u.location::text ILIKE '${`%${query}%`}'
          )
    `);

    // console.log(count);

    const totalPages: number = Math.ceil(
      Number(count.rows[0].work_experiences_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

//TODO combine with fetchEducationPages
export async function fetchWorkExperiencesCount(query: string, userId: string) {
  noStore();

  try {
    const count = await conn.query(`    
    SELECT COUNT(*) AS work_experiences_count
    FROM user_work_experience u      
    WHERE u.user_id = '${userId}' 
    AND (
      u.job_title::text ILIKE '${`%${query}%`}' OR
      u.company_name::text ILIKE '${`%${query}%`}' OR
      u.location::text ILIKE '${`%${query}%`}'
      )
  `);

    const totalPages: number = count.rows[0].work_experiences_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}

export async function fetchFilteredUserCustomSectionOne(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const user_custom_section_one = await conn.query(`
        SELECT *
        FROM user_custom_section_one u
        WHERE u.user_id = '${userId}' AND 
          (
            u.name::text ILIKE '${`%${query}%`}' OR
            u.description::text ILIKE '${`%${query}%`}' OR
            u.location::text ILIKE '${`%${query}%`}'
          )
        ORDER BY u.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    return user_custom_section_one.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchUserCustomSectionOnePages(
  query: string,
  userId: string
) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS user_custom_section_one_count
      FROM user_custom_section_one u      
      WHERE u.user_id = '${userId}' 
      AND (
          u.name::text ILIKE '${`%${query}%`}' OR
          u.description::text ILIKE '${`%${query}%`}' OR
          u.location::text ILIKE '${`%${query}%`}'
          )
    `);

    // console.log(count);

    const totalPages: number = Math.ceil(
      Number(count.rows[0].user_custom_section_one_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of user custom section one.");
  }
}

//TODO combine with fetchEducationPages
export async function fetchUserCustomSectionOneCount(
  query: string,
  userId: string
) {
  noStore();

  try {
    const count = await conn.query(`    
    SELECT COUNT(*) AS user_custom_section_one_count
    FROM user_custom_section_one u      
    WHERE u.user_id = '${userId}' 
    AND (
        u.name::text ILIKE '${`%${query}%`}' OR
        u.description::text ILIKE '${`%${query}%`}' OR
        u.location::text ILIKE '${`%${query}%`}'
        )
  `);

    const totalPages: number = count.rows[0].user_custom_section_one_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of user custom section one.");
  }
}

export async function fetchFilteredUserCustomSectionTwo(
  query: string,
  currentPage: number,
  userId: string
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const user_custom_section_two = await conn.query(`
        SELECT *
        FROM user_custom_section_two u
        WHERE u.user_id = '${userId}' AND 
          (
            u.name::text ILIKE '${`%${query}%`}' OR
            u.description::text ILIKE '${`%${query}%`}' OR
            u.location::text ILIKE '${`%${query}%`}'
          )
        ORDER BY u.created_at DESC
        LIMIT '${ITEMS_PER_PAGE}' OFFSET '${offset}'
    `);

    return user_custom_section_two.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch companies.");
  }
}

export async function fetchUserCustomSectionTwoPages(
  query: string,
  userId: string
) {
  noStore();

  try {
    const count = await conn.query(`    
      SELECT COUNT(*) AS user_custom_section_two_count
      FROM user_custom_section_two u      
      WHERE u.user_id = '${userId}' 
      AND (
          u.name::text ILIKE '${`%${query}%`}' OR
          u.description::text ILIKE '${`%${query}%`}' OR
          u.location::text ILIKE '${`%${query}%`}'
          )
    `);

    // console.log(count);

    const totalPages: number = Math.ceil(
      Number(count.rows[0].user_custom_section_two_count) / ITEMS_PER_PAGE
    );
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of user custom section two.");
  }
}

//TODO combine with fetchEducationPages
export async function fetchUserCustomSectionTwoCount(
  query: string,
  userId: string
) {
  noStore();

  try {
    const count = await conn.query(`    
    SELECT COUNT(*) AS user_custom_section_two_count
    FROM user_custom_section_two u      
    WHERE u.user_id = '${userId}' 
    AND (
        u.name::text ILIKE '${`%${query}%`}' OR
        u.description::text ILIKE '${`%${query}%`}' OR
        u.location::text ILIKE '${`%${query}%`}'
        )
  `);

    const totalPages: number = count.rows[0].user_custom_section_two_count;
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of user custom section two.");
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
    const data = await conn.query(query);

    const userCompanies: Companies = data.rows.map((company: Company) => ({
      ...company,
    }));

    return userCompanies;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [];
  }
}

export async function fetchApplicationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM applications WHERE id = '${id}'`;
    const data = await conn.query(query);

    const application: Application = data?.rows[0];

    return application;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
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
    const data = await conn.query(query);

    const resumes: Resumes = data.rows.map((resume: Resume) => ({
      ...resume,
    }));

    return resumes;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchCoverLettersByUserId(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_letters WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    const coverLetters: CoverLetters = data.rows.map(
      (coverLetter: CoverLetter) => ({
        ...coverLetter,
      })
    );

    return coverLetters;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchResumeTemplates() {
  noStore();

  try {
    // const query = `SELECT * FROM resume_templates ORDER BY name ASC`;
    const query = `SELECT * FROM resume_templates WHERE active = 'true' ORDER BY name ASC`;

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
    return;
  }
}

export async function fetchResumeByIdAndUserId(id: string, user: User) {
  noStore();

  try {
    let query: string;

    if (user.access_level === "admin") {
      query = `SELECT * FROM resumes WHERE id = '${id}'`;
    } else {
      query = `SELECT * FROM resumes WHERE id = '${id}' AND user_id = '${user.id}'`;
    }

    const data = await conn.query(query);

    const resume: Resume = data?.rows[0];

    return resume;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchCoverLetterByIdAndUserId(id: string, user: User) {
  noStore();

  try {
    let query: string;

    // if (user.access_level === "admin") {
    //   query = `SELECT * FROM resumes WHERE id = '${id}'`;
    // } else {
    //   query = `SELECT * FROM resumes WHERE id = '${id}' AND user_id = '${user.id}'`;
    // }

    query = `SELECT * FROM cover_letters WHERE id = '${id}' AND user_id = '${user.id}'`;

    const data = await conn.query(query);

    const coverLetter: CoverLetter = data?.rows[0];

    return coverLetter;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch coverLetter template by id.");
    return;
  }
}

export async function fetchCoverTemplates() {
  noStore();

  try {
    // const query = `SELECT * FROM resume_templates ORDER BY name ASC`;
    const query = `SELECT * FROM cover_letter_templates WHERE active = 'true' ORDER BY name ASC`;

    const data = await conn.query(query);

    const coverTemplates: CoverTemplates = data.rows.map(
      (coverTemplate: CoverTemplate) => ({
        ...coverTemplate,
      })
    );

    return coverTemplates;
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

    const userEducationExperiences: UserEducationExperiences = data?.rows?.map(
      (userEducationExperience: UserEducationExperience) => ({
        ...userEducationExperience,
      })
    );

    return userEducationExperiences;
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

    return userOrganizations;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCertificationsByUserId(userId: string) {
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

export async function fetchCoverExperiencesByUserId(userId: string) {
  noStore();

  // console.log(userId);

  try {
    const query = `SELECT * FROM cover_experiences WHERE user_id = '${userId}'`;
    const data = await conn.query(query);

    const userCoverExperiences: UserCoverExperiences = data?.rows?.map(
      (userCoverExperience: UserCoverExperience) => ({
        ...userCoverExperience,
      })
    );

    return userCoverExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCoverExperiencesByCoverLetterId(id: string) {
  noStore();

  // console.log(userId);

  try {
    const query = `SELECT * FROM cover_experience_lines WHERE cover_letter_id = '${id}'`;
    const data = await conn.query(query);

    const userCoverExperiences: UserCoverExperienceLines = data?.rows?.map(
      (userCoverExperience: UserCoverExperienceLine) => ({
        ...userCoverExperience,
      })
    );

    return userCoverExperiences;
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

  // console.log(process.env.DEPLOYMENT_URL);

  const res = await fetch(
    `${process.env.DEPLOYMENT_URL}/api/resume-data?resumeId=${resumeId}&userEmail=${userEmail}`
    // `http://localhost:3000/api/resume-data?resumeId=${resumeId}&userEmail=${userEmail}`
  );
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getCoverData(coverId: string, userEmail: string) {
  noStore();
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // console.log(process.env.DEPLOYMENT_URL);

  const res = await fetch(
    `${process.env.DEPLOYMENT_URL}/api/cover-data?coverId=${coverId}&userEmail=${userEmail}`
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
    const data = await conn.query(query);

    const workExperience: UserWorkExperience = data?.rows[0];

    return workExperience;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchCoverExperienceById(id: string, userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM cover_experiences WHERE id = '${id}' AND user_id = '${userId}'`;
    // console.log(query);
    const data = await conn.query(query);

    const coverExperience: UserCoverExperience = data?.rows[0];

    return coverExperience;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchCertificationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_custom_section_two WHERE id = '${id}'`;
    const data = await conn.query(query);

    const certification: UserCertification = data?.rows[0];

    return certification;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchOrganizationById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_custom_section_one WHERE id = '${id}'`;
    // console.log(query);
    const data = await conn.query(query);
    const organization: UserOrganization = data?.rows[0];

    return organization;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
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
    const data = await conn.query(query);

    const userEducationExperiences: UserEducationExperiences = data.rows.map(
      (userEducationExperience: UserEducationExperience) => ({
        ...userEducationExperience,
      })
    );

    return userEducationExperiences;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchEducationById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_education WHERE id = '${id}'`;
    const data = await conn.query(query);

    const userEducationExperience: UserEducationExperience = data.rows[0];

    return userEducationExperience;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchSkillById(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM user_skills WHERE id = '${id}'`;
    const data = await conn.query(query);

    const skill: UserSkill = data.rows[0];

    return skill;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return;
  }
}

export async function fetchWorkExperiencesbyResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_work_experience u ON r.work_experience_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;
    const data = await conn.query(query);

    const userWorkExperiences: UserWorkExperiences = data.rows.map(
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

export async function fetchSkillsByResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_skills u ON r.user_skills_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;
    const data = await conn.query(query);

    const userSkills: UserSkills = data.rows.map((userSkill: UserSkill) => ({
      ...userSkill,
    }));

    return userSkills;
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
    const data = await conn.query(query);

    const userCertifications: UserCertifications = data.rows.map(
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

export async function fetchOrganizationsByResumeID(id: string) {
  noStore();

  try {
    const query = `SELECT * FROM resume_lines r JOIN user_custom_section_one u ON r.user_custom_section_one_id = u.id WHERE r.resume_id = '${id}' ORDER BY position ASC`;
    const data = await conn.query(query);

    const userOrganizations: userOrganizations = data.rows.map(
      (userOrganization: UserOrganization) => ({
        ...userOrganization,
      })
    );

    return userOrganizations;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchOpenApplicationsCountByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT COUNT(*) FROM applications WHERE user_id = '${userId}' AND is_complete = 'false'`;
    const data = await conn.query(query);

    const openApplications: number = data?.rows[0]?.count;

    return openApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return null;
  }
}

export async function fetchClosedApplicationsCountByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT COUNT(*) FROM applications WHERE user_id = '${userId}' AND is_complete = 'true'`;
    const data = await conn.query(query);

    const openApplications: number = data?.rows[0]?.count;

    return openApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return null;
  }
}

export async function fetchPendingApplicationsCountByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT COUNT(*) FROM applications WHERE user_id = '${userId}' AND is_complete = 'pending'`;
    const data = await conn.query(query);

    const openApplications: number = data?.rows[0]?.count;

    return openApplications;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return null;
  }
}

export async function fetchCoverLettersByUserIDJoinApplications(
  userId: string
) {
  noStore();

  try {
    const query = `SELECT * FROM cover_letters r JOIN applications u ON r.application_id = u.id WHERE r.user_id = '${userId}' ORDER BY r.id ASC`;
    const data = await conn.query(query);

    const coverLetters: CoverLetters & Applications = data.rows.map(
      (coverLetter: CoverLetter & Application) => ({
        ...coverLetter,
      })
    );

    // console.log(coverLetters);

    return coverLetters;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchResumesByUserIDJoinApplications(userId: string) {
  noStore();

  try {
    const query = `SELECT * FROM resumes r JOIN applications u ON r.application_id = u.id WHERE r.user_id = '${userId}' ORDER BY r.id ASC`;
    const data = await conn.query(query);

    const resumes: Resumes & Applications = data.rows.map(
      (resume: Resume & Application) => ({
        ...resume,
      })
    );

    // console.log(coverLetters);

    return resumes;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}
