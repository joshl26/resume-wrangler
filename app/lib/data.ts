// import { sql } from "@vercel/postgres";
import { conn } from "../lib/database";

import {
  // CustomerField,
  // CustomersTable,
  // InvoiceForm,
  // InvoicesTable,
  User,
} from "./definitions";
// import { formatCurrency } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
// import { UUID } from "crypto";

// export async function fetchRevenue() {
//   // Add noStore() here prevent the response from being cached.
//   // This is equivalent to in fetch(..., {cache: 'no-store'}).
//   noStore();

//   try {
//     // Artificially delay a reponse for demo purposes.
//     // Don't do this in real life :)

//     console.log("Fetching revenue data...");
//     await new Promise((resolve) => setTimeout(resolve, 3000));

//     const query = "SELECT * FROM revenue";
//     const data = await conn.query(query);
//     // const data = await sql<Revenue>`SELECT * FROM revenue`;

//     console.log("Data fetch complete after 3 seconds.");

//     return data.rows;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// export async function fetchLatestInvoices() {
//   noStore();

//   try {
//     const query =
//       "SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id FROM invoices JOIN customers ON invoices.customer_id = customers.id ORDER BY invoices.date DESC LIMIT 5";
//     const data = await conn.query(query);

//     // const data = await sql<LatestInvoiceRaw>`
//     //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
//     //   FROM invoices
//     //   JOIN customers ON invoices.customer_id = customers.id
//     //   ORDER BY invoices.date DESC
//     //   LIMIT 5`;

//     const latestInvoices = data.rows.map((invoice: any) => ({
//       ...invoice,
//       amount: formatCurrency(invoice.amount),
//     }));
//     return latestInvoices;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch the latest invoices.");
//   }
// }

// export async function fetchCardData() {
//   noStore();

//   try {
//     // You can probably combine these into a single SQL query
//     // However, we are intentionally splitting them to demonstrate
//     // how to initialize multiple queries in parallel with JS.
//     const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
//     const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
//     const invoiceStatusPromise = sql`SELECT
//          SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
//          SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
//          FROM invoices`;

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
//     const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
//     const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
//     const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

//     return {
//       numberOfCustomers,
//       numberOfInvoices,
//       totalPaidInvoices,
//       totalPendingInvoices,
//     };
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to card data.");
//   }
// }

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
