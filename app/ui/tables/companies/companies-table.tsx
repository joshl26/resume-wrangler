"use client";

import { deleteCompany } from "@/app/lib/actions";
import type { Companies, Company, User } from "@/app/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

const CompaniesTable = ({
  companies,
  user,
  totalPages,
  query,
  currentPage,
  totalCount,
  filteredCompanies,
}: {
  companies: Companies;
  user: User;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  filteredCompanies: Companies;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  const handleDeleteCompany = async (
    formData: FormData,
    key: string,
  ): Promise<void> => {
    setIsSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      // Extract company_id from FormData
      const companyId = formData.get("company_id") as string;

      // Call deleteCompany with the company ID string
      const result = (await deleteCompany(companyId)) as any;
      if (result?.errors) {
        console.error("Delete company failed:", result);
      } else {
        // refresh so the UI reflects the deletion
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting company:", err);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [key]: false }));
    }
  };

  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow rounded px-4 py-4 mr-3 bg-white">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Company Name
            </th>
            <th scope="col" className="px-6 py-3">
              Address One
            </th>
            <th scope="col" className="px-6 py-3">
              Recipient
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies?.length > 0 ? (
            filteredCompanies?.map((company: Company) => {
              const key = `delete-company-${String(company?.id)}`;
              return (
                <tr
                  key={company?.id}
                  className=" border-b da hover:bg-gray-50 "
                >
                  <th
                    scope="row"
                    className="px-6 h-[45px] font-medium  whitespace-nowrap "
                  >
                    <Link href={`/dashboard/companies/edit/${company?.id}`}>
                      {company?.name ?? "N/A"}
                    </Link>
                  </th>
                  <td className="px-6 ">{company?.address_one ?? "N/A"}</td>
                  <td className="px-6 ">{company?.recipient_title ?? "N/A"}</td>
                  <td className="px-6 ">{company?.email ?? "N/A"}</td>
                  <td className="text-left px-6 ">{company?.phone ?? "N/A"}</td>
                  <td className="text-left px-6 ">
                    <div className="flex flex-row items-center">
                      <Link
                        id={`edit-company-${company.id}`}
                        href={`/dashboard/companies/edit/${company.id}`}
                        className="font-medium  hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData: FormData) =>
                          handleDeleteCompany(formData, key)
                        }
                        className="ms-3"
                      >
                        <input
                          type="hidden"
                          name="company_id"
                          value={String(company.id)}
                          readOnly
                        />
                        <button
                          id="remove"
                          type="submit"
                          disabled={!!isSubmitting[key]}
                          className="font-medium hover:underline ms-3"
                        >
                          {isSubmitting[key] ? "Removing..." : "Remove"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="flex items-center px-6 py-4">
                <Link
                  href="/dashboard/companies/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first company here
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pt-4">
        <Pagination totalPages={totalPages} totalCount={totalCount} />
      </div>
    </div>
  );
};

export default CompaniesTable;
