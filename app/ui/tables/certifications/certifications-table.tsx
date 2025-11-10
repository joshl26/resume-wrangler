"use client";

import { deleteCertification } from "@/app/lib/actions";
import {
  User,
  UserCertification,
  UserCertifications,
} from "@/app/lib/definitions";
import Link from "next/link";
import React, { useState } from "react";
import Pagination from "../../pagination";
import { useRouter } from "next/navigation";

const Certifications = ({
  certifications,
  user,
  totalPages,
  query,
  currentPage,
  totalCount,
  filteredCertifications,
}: {
  certifications: UserCertifications;
  user: User;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  filteredCertifications: UserCertifications;
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});

  // Wrapper so form.action receives (formData: FormData) => void | Promise<void>
  const handleDeleteCertification = async (
    formData: FormData,
    idKey: string,
  ): Promise<void> => {
    setIsSubmitting((prev) => ({ ...prev, [idKey]: true }));
    try {
      const result = (await deleteCertification(formData)) as any;

      if (result?.errors) {
        // handle server-side errors if needed (log here)
        console.error("Delete certification failed:", result);
      } else {
        // refresh server data / revalidate
        router.refresh();
      }
    } catch (err) {
      console.error("Unexpected error deleting certification:", err);
    } finally {
      setIsSubmitting((prev) => ({ ...prev, [idKey]: false }));
    }
  };

  return (
    <div className="relative overflow-x-auto overflow-y-auto tight-shadow rounded px-4 py-4 mr-3 bg-white">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Certification Name
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
          {filteredCertifications[0] ? (
            filteredCertifications?.map((certification: UserCertification) => (
              <tr
                key={certification?.id}
                className=" border-b  hover:bg-gray-50 "
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  <Link
                    href={`/dashboard/certifications/edit/${certification?.id}`}
                  >
                    {certification?.name ? certification?.name : "N/A"}
                  </Link>
                </th>

                <td className="px-6 py-4">
                  {certification?.location ? certification?.location : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {certification?.start_date
                    ? certification?.start_date
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {certification?.end_date ? certification?.end_date : "N/A"}
                </td>
                <td className="text-left px-6 py-4">
                  <div className="flex flex-row items-center">
                    <Link
                      id={`edit-cert-${certification?.id}`}
                      href={`/dashboard/certifications/edit/${certification?.id}`}
                      className="font-medium  hover:underline"
                    >
                      Edit
                    </Link>

                    <form
                      action={(formData: FormData) =>
                        handleDeleteCertification(
                          formData,
                          `delete-cert-${String(certification?.id)}`,
                        )
                      }
                      className="ms-3"
                    >
                      <input
                        hidden
                        id="resume_id"
                        name="resume_id"
                        readOnly
                        value="blank"
                      />
                      <input
                        hidden
                        id="certification_id"
                        name="certification_id"
                        readOnly
                        value={String(certification.id)}
                      />
                      <button
                        id={`remove-cert-${certification?.id}`}
                        type="submit"
                        disabled={
                          isSubmitting[
                            `delete-cert-${String(certification?.id)}`
                          ]
                        }
                        className="font-medium hover:underline ms-3"
                      >
                        {isSubmitting[
                          `delete-cert-${String(certification?.id)}`
                        ]
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="flex items-center px-6 py-4">
                <Link
                  href="/dashboard/certifications/new"
                  className="font-medium text-azure-radiance-600 hover:underline"
                >
                  Start by creating your first certification here
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

export default Certifications;
