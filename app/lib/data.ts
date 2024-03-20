import { conn } from "../lib/database";

import { User } from "./definitions";
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

// export async function fetchInvoicesPages(query: string) {
//   noStore();

//   try {
//     console.log(`Query: ${query}`);

//     const queryString = `SELECT COUNT(*) FROM invoices JOIN customers ON invoices.customer_id = customers.id WHERE customers.name ILIKE ${`%${query}%`} OR customers.email ILIKE ${`%${query}%`} OR invoices.amount::text ILIKE ${`%${query}%`} OR invoices.date::text ILIKE ${`%${query}%`} OR invoices.status ILIKE ${`%${query}%`}`;

//     console.log(`Query: ${queryString}`);

//     // const queryString = `SELECT COUNT(*) FROM invoices `;

//     const count = await conn.query(queryString);

//     console.log(count);
//     //   const count = await sql`SELECT COUNT(*)
//     //   FROM invoices
//     //   JOIN customers ON invoices.customer_id = customers.id
//     //   WHERE
//     //     customers.name ILIKE ${`%${query}%`} OR
//     //     customers.email ILIKE ${`%${query}%`} OR
//     //     invoices.amount::text ILIKE ${`%${query}%`} OR
//     //     invoices.date::text ILIKE ${`%${query}%`} OR
//     //     invoices.status ILIKE ${`%${query}%`}
//     // `;

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch total number of invoices.");
//   }
// }

// export async function fetchInvoiceById(id: string) {
//   noStore();

//   try {
//     const data = await sql<InvoiceForm>`
//       SELECT
//         invoices.id,
//         invoices.customer_id,
//         invoices.amount,
//         invoices.status
//       FROM invoices
//       WHERE invoices.id = ${id};
//     `;

//     const invoice = data.rows.map((invoice) => ({
//       ...invoice,
//       // Convert amount from cents to dollars
//       amount: invoice.amount / 100,
//     }));
//     console.log(invoice); // Invoice is an empty array []
//     return invoice[0];
//   } catch (error) {
//     console.error("Database Error:", error);
//   }
// }

// // export async function fetchCustomers() {
// //   noStore();

// //   try {
// //     const data = await sql<CustomerField>`
// //       SELECT
// //         id,
// //         name
// //       FROM customers
// //       ORDER BY name ASC
// //     `;

// //     const customers = data.rows;
// //     return customers;
// //   } catch (err) {
// //     console.error("Database Error:", err);
// //     throw new Error("Failed to fetch all customers.");
// //   }
// // }

// export async function fetchFilteredCustomers(query: string) {
//   noStore();

//   try {
//     const data = await sql<CustomersTable>`
// 		SELECT
// 		  customers.id,
// 		  customers.name,
// 		  customers.email,
// 		  customers.image_url,
// 		  COUNT(invoices.id) AS total_invoices,
// 		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
// 		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
// 		FROM customers
// 		LEFT JOIN invoices ON customers.id = invoices.customer_id
// 		WHERE
// 		  customers.name ILIKE ${`%${query}%`} OR
//         customers.email ILIKE ${`%${query}%`}
// 		GROUP BY customers.id, customers.name, customers.email, customers.image_url
// 		ORDER BY customers.name ASC
// 	  `;

//     const customers = data.rows.map((customer) => ({
//       ...customer,
//       total_pending: formatCurrency(customer.total_pending),
//       total_paid: formatCurrency(customer.total_paid),
//     }));

//     return customers;
//   } catch (err) {
//     console.error("Database Error:", err);
//     throw new Error("Failed to fetch customer table.");
//   }
// }

//TODO ////////////////////////////////////

export async function getUser(email: string) {
  noStore();

  try {
    const query = `SELECT * FROM users WHERE email='${email}'`;
    const user = await conn.query(query);
    // console.log(user.rows[0]);

    // const user = await sql`SELECT * from USERS where email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getResumeTemplates() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
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

  // console.log(id);

  // let uuid = id as UUID;

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
    // console.log(query);
    const resumeTemplates = await conn.query(query);
    return resumeTemplates.rows;
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
    // console.log(query);
    const resumeColors = await conn.query(query);
    return resumeColors.rows;
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
    // console.log(query);
    const bodyFonts = await conn.query(query);
    return bodyFonts.rows;
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
    // console.log(query);
    const headerFonts = await conn.query(query);
    return headerFonts.rows;
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchResumeById(id: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM resumes WHERE id = '${id}'`;
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

export async function fetchSkillsByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_skills WHERE user_id = '${userId}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchEducationByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_education WHERE user_id = '${userId}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchOrganizationsByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_custom_section_one WHERE user_id = '${userId}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchCerftificationsByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_custom_section_two WHERE user_id = '${userId}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows;
    } else {
      return [null];
    }
  } catch (error: any) {
    console.error("Database Error:", error);
    // throw new Error("Failed to fetch resume template by id.");
    return [null];
  }
}

export async function fetchWorkExperiencesByUserId(userId: string) {
  noStore();

  // console.log(id);

  try {
    const query = `SELECT * FROM user_work_experience WHERE user_id = '${userId}'`;
    // console.log(query);
    const resume = await conn.query(query);

    if (resume.rows[0]) {
      return resume.rows;
    } else {
      return [null];
    }
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
