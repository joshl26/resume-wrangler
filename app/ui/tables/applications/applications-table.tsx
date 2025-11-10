"use client";

import {
  createCoverLetter,
  createResume,
  deleteApplication,
  deleteCoverLetter,
  deleteResume,
} from "@/app/lib/actions";
import {
  Application,
  Applications,
  Companies,
  Company,
  CoverLetter,
  CoverLetters,
  Resume,
  Resumes,
  User,
} from "@/app/lib/definitions";
import Link from "next/link";
import Pagination from "../../pagination";
import { fetchFilteredApplications } from "@/app/lib/data";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ApplicationsTable({
  user,
  resumes,
  coverLetters,
  companies,
  totalPages,
  query,
  currentPage,
  totalCount,
  sort,
  serverApplications,
}: {
  user: User;
  resumes: Resumes;
  coverLetters: CoverLetters;
  companies: Companies;
  totalPages: number;
  query: string;
  currentPage: number;
  totalCount: number;
  sort: string;
  // Optional server-provided initial data for streaming/server-side rendering
  serverApplications?: Applications;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<Record<string, boolean>>({});
  // Use serverApplications as the initial state if provided to avoid extra client fetch
  const [filteredApplications, setFilteredApplications] =
    useState<Applications>(serverApplications ?? []);

  useEffect(() => {
    let mounted = true;

    // If serverApplications was provided (including empty array), sync state and skip client-side fetch
    if (serverApplications !== undefined) {
      if (mounted) setFilteredApplications(serverApplications ?? []);
      return () => {
        mounted = false;
      };
    }

    (async () => {
      try {
        const data = await fetchFilteredApplications(
          query,
          currentPage,
          user?.id,
          sort,
        );
        if (mounted) setFilteredApplications(data ?? []);
      } catch (err) {
        console.error("Failed to fetch filtered applications:", err);
        if (mounted) setFilteredApplications([]);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [query, currentPage, user?.id, sort, serverApplications]);

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
    <div className="relative tight-shadow rounded px-4 py-4 mr-3 bg-white">
      <table className="w-full text-sm text-left rtl:text-right tight-shadow">
        <thead className="text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Job Position
            </th>
            <th scope="col" className="px-6 py-3">
              Company
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
            <th scope="col" className="px-6 py-3">
              Submitted
            </th>
            <th scope="col" className="px-6 py-3">
              Cover
            </th>
            <th scope="col" className="px-6 py-3">
              Resume
            </th>
            <th scope="col" className="">
              Application
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredApplications && filteredApplications.length > 0 ? (
            filteredApplications.map((application: Application) => {
              // compute once to avoid repeated finds
              const company = companies.find(
                (c: Company) => c.id === application.company_id,
              );
              const companyName = company?.name ?? "N/A";
              const companyLocation = company?.address_one ?? "N/A";

              const cover = coverLetters.find(
                (coverLetter: CoverLetter) =>
                  coverLetter.application_id === application.id,
              );
              const coverId = cover?.id;

              const resume = resumes.find(
                (r: Resume) => r.application_id === application.id,
              );
              const resumeId = resume?.id;

              return (
                <tr key={application.id} className="border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 h-[55px] font-medium whitespace-nowrap "
                  >
                    <Link
                      href={`/dashboard/applications/edit/${application.id}`}
                    >
                      {application.job_position ?? "N/A"}
                    </Link>
                  </th>

                  <td className="px-6">{companyName}</td>
                  <td className="px-6">{companyLocation}</td>
                  <td className="px-6 py-4">
                    {application.is_complete ?? "—"}
                  </td>

                  <td className="text-left px-6">
                    {coverId !== undefined ? (
                      <div className="flex flex-row items-center gap-3">
                        <Link
                          id={`edit-cover-${coverId}`}
                          href={`/dashboard/cover/edit/${coverId}`}
                          className="font-medium hover:underline"
                        >
                          Edit
                        </Link>

                        <form
                          action={(formData) =>
                            handleSubmit(
                              deleteCoverLetter,
                              formData,
                              `delete-cover-${application.id}`,
                            )
                          }
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={String(coverId)}
                            readOnly
                          />
                          <button
                            id={`remove-cover-${coverId}`}
                            type="submit"
                            disabled={
                              isSubmitting[`delete-cover-${application.id}`]
                            }
                            className="font-medium hover:underline ms-3"
                          >
                            {isSubmitting[`delete-cover-${application.id}`]
                              ? "Removing..."
                              : "Remove"}
                          </button>
                        </form>
                      </div>
                    ) : (
                      <form
                        action={(formData) =>
                          handleSubmit(
                            createCoverLetter,
                            formData,
                            `create-cover-${application.id}`,
                          )
                        }
                      >
                        <input
                          type="hidden"
                          name="user_id"
                          value={String(user.id)}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="application_id"
                          value={String(application.id)}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="company_id"
                          value={
                            application.company_id
                              ? String(application.company_id)
                              : ""
                          }
                          readOnly
                        />
                        <button
                          type="submit"
                          disabled={
                            isSubmitting[`create-cover-${application.id}`]
                          }
                          className="font-medium text-azure-radiance-600 dark:text-azure-radiance-500 hover:underline"
                        >
                          {isSubmitting[`create-cover-${application.id}`]
                            ? "Creating..."
                            : "Create"}
                        </button>
                      </form>
                    )}
                  </td>

                  <td className="text-left px-6">
                    {resumeId !== undefined ? (
                      <div className="flex flex-row items-center gap-3">
                        <Link
                          id={`edit-resume-${resumeId}`}
                          href={`/dashboard/resume/edit/${resumeId}`}
                          className="font-medium hover:underline"
                        >
                          Edit
                        </Link>

                        <form
                          action={(formData) =>
                            handleSubmit(
                              deleteResume,
                              formData,
                              `delete-resume-${application.id}`,
                            )
                          }
                        >
                          <input
                            type="hidden"
                            name="id"
                            value={String(resumeId)}
                            readOnly
                          />
                          <button
                            id={`remove-resume-${resumeId}`}
                            type="submit"
                            disabled={
                              isSubmitting[`delete-resume-${application.id}`]
                            }
                            className="font-medium hover:underline ms-3"
                          >
                            {isSubmitting[`delete-resume-${application.id}`]
                              ? "Removing..."
                              : "Remove"}
                          </button>
                        </form>
                      </div>
                    ) : (
                      <form
                        action={(formData) =>
                          handleSubmit(
                            createResume,
                            formData,
                            `create-resume-${application.id}`,
                          )
                        }
                      >
                        <input
                          type="hidden"
                          name="user_id"
                          value={String(user.id)}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="application_id"
                          value={String(application.id)}
                          readOnly
                        />
                        <input
                          type="hidden"
                          name="company_id"
                          value={
                            application.company_id
                              ? String(application.company_id)
                              : ""
                          }
                          readOnly
                        />
                        <button
                          type="submit"
                          disabled={
                            isSubmitting[`create-resume-${application.id}`]
                          }
                          className="font-medium text-azure-radiance-600 dark:text-azure-radiance-500 hover:underline"
                        >
                          {isSubmitting[`create-resume-${application.id}`]
                            ? "Creating..."
                            : "Create"}
                        </button>
                      </form>
                    )}
                  </td>

                  <td className="px-2">
                    <div className="flex flex-row justify-start items-center gap-3">
                      <Link
                        id={`edit-app-${application.id}`}
                        href={`/dashboard/applications/edit/${application.id}`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </Link>

                      <form
                        action={(formData) =>
                          handleSubmit(
                            deleteApplication,
                            formData,
                            `delete-app-${application.id}`,
                          )
                        }
                      >
                        <input
                          type="hidden"
                          name="id"
                          value={String(application.id)}
                          readOnly
                        />
                        <button
                          id={`remove-app-${application.id}`}
                          type="submit"
                          disabled={
                            isSubmitting[`delete-app-${application.id}`]
                          }
                          className="font-medium hover:underline ms-3"
                        >
                          {isSubmitting[`delete-app-${application.id}`]
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
              <td colSpan={7} className="px-6 py-6">
                <div className="flex items-center gap-2">
                  <span>Start by creating your first application</span>
                  <Link
                    href="/dashboard/applications/new"
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
