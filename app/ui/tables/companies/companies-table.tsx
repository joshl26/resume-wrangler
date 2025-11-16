"use client";

import { deleteCompany } from "@/app/lib/actions";
import type { Companies, Company, User } from "@/app/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

export default function CompaniesTable({
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
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  const handleSubmit = async (
    actionFn: (formData: FormData) => Promise<unknown>,
    formData: FormData,
    id: string,
  ) => {
    setIsSubmitting((prev) => ({ ...prev, [id]: true }));
    try {
      await actionFn(formData);
      // After server action completes, refresh the page data
      router.refresh();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="relative tight-shadow rounded px-4 py-4 mr-3">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase">
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
          {filteredCompanies && filteredCompanies.length > 0 ? (
            filteredCompanies.map((company: Company) => {
              return (
                <tr key={company.id} className="border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 h-[55px] font-medium whitespace-nowrap"
                  >
                    <Link href={`/dashboard/companies/edit/${company.id}`}>
                      {company.name ?? "N/A"}
                    </Link>
                  </th>
                  <td className="px-6">{company.address_one ?? "N/A"}</td>
                  <td className="px-6">{company.recipient_title ?? "N/A"}</td>
                  <td className="px-6">{company.email ?? "N/A"}</td>
                  <td className="px-6">{company.phone ?? "N/A"}</td>
                  <td className="px-6">
                    <div className="flex flex-row items-center gap-3">
                      <Link
                        id={`edit-company-${company.id}`}
                        href={`/dashboard/companies/edit/${company.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData) =>
                          handleSubmit(
                            async (fd) => {
                              const id = fd.get("id");
                              if (typeof id === "string") {
                                return deleteCompany(id);
                              }
                              throw new Error("Invalid id");
                            },
                            formData,
                            `delete-company-${company.id}`,
                          )
                        }
                      >
                        <input
                          type="hidden"
                          name="id"
                          value={String(company.id)}
                          readOnly
                        />
                        <button
                          id={`remove-company-${company.id}`}
                          type="submit"
                          disabled={
                            isSubmitting[`delete-company-${company.id}`]
                          }
                          className="font-medium hover:underline ms-3"
                        >
                          {isSubmitting[`delete-company-${company.id}`]
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-6">
                <div className="flex items-center gap-2">
                  <span>Start by creating your first company</span>
                  <Link
                    href="/dashboard/companies/new"
                    className="font-medium text-azure-radiance-600 hover:underline"
                  >
                    here
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="relative pt-4">
        <Pagination totalPages={totalPages} totalCount={totalCount} />
      </div>
    </div>
  );
}
