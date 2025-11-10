"use client";

import { deleteOrganization } from "@/app/lib/actions";
import { UserOrganization, userOrganizations } from "@/app/lib/definitions";
import { User } from "next-auth";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

const Organizations = ({
  organizations,
  user,
  totalPages,
  query,
  currentPage,
  totalCount,
  filteredOrganizations,
}: {
  organizations: userOrganizations;
  user: User;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  filteredOrganizations: userOrganizations;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  // and we call the server action in a way that works whether it expects an id string
  // or FormData. We cast to `any` when invoking to avoid TypeScript signature mismatches.
  const handleDeleteOrganization = async (
    formData: FormData,
    key: string,
  ): Promise<void> => {
    setIsSubmitting((prev) => ({ ...prev, [key]: true }));
    try {
      const orgId = formData.get("organization_id")?.toString() ?? null;

      let result: any;
      // Try calling with the id string first (common pattern). If that fails, fallback to passing the FormData.
      try {
        result = await (
          deleteOrganization as unknown as (arg: any) => Promise<any>
        )(orgId ?? formData);
      } catch (err) {
        // If calling with the id failed for any reason, try passing FormData directly
        try {
          result = await (
            deleteOrganization as unknown as (arg: any) => Promise<any>
          )(formData);
        } catch (err2) {
          console.error(
            "deleteOrganization failed with both id and FormData:",
            err2,
          );
          throw err2;
        }
      }

      if (result?.errors) {
        console.error("Delete organization failed:", result);
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting organization:", err);
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
              Organization Name
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Start Date
            </th>
            <th scope="col" className="px-6 py-3">
              End Date
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrganizations?.length > 0 ? (
            filteredOrganizations?.map((organization: UserOrganization) => {
              const key = `delete-organization-${String(organization?.id)}`;
              return (
                <tr key={organization?.id} className=" border-b  ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    <Link
                      href={`/dashboard/organizations/edit/${organization?.id}`}
                    >
                      {organization?.name ?? "N/A"}
                    </Link>
                  </th>

                  <td className="px-6 py-4">
                    {organization?.location ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {organization?.start_date ?? "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {organization?.end_date ?? "N/A"}
                  </td>
                  <td className="text-left px-6 py-4">
                    <div className="flex flex-row items-center">
                      <Link
                        id={`edit-org-${organization?.id}`}
                        href={`/dashboard/organizations/edit/${organization?.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData: FormData) =>
                          handleDeleteOrganization(formData, key)
                        }
                        className="ms-3"
                      >
                        <input
                          required
                          hidden
                          id="resume_id"
                          name="resume_id"
                          readOnly
                          value="blank"
                        />
                        <input
                          required
                          hidden
                          id="organization_id"
                          name="organization_id"
                          readOnly
                          value={String(organization.id)}
                        />
                        <button
                          id="remove"
                          type="submit"
                          className="font-medium hover:underline ms-3"
                          disabled={!!isSubmitting[key]}
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
              <td colSpan={5} className="flex items-center px-6 py-4">
                <Link
                  href="/dashboard/organizations/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first organization here
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

export default Organizations;
