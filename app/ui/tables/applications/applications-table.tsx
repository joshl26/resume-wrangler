"use client";

import {
  createCoverLetter,
  createResume,
  deleteApplication,
  deleteCoverLetter,
  deleteResume,
} from "@/app/lib/actions";
import { Applications, Companies } from "@/app/lib/definitions";
import Link from "next/link";

const ApplicationsTable = ({
  user,
  resumes,
  coverLetters,
  applications,
  companies,
}: {
  user: any;
  resumes: any;
  coverLetters: any;
  applications: Applications;
  companies: Companies;
}) => {
  // console.log(resumes);

  return (
    <div className="relative overflow-x-auto overflow-y-auto shadow-md sm:rounded-lg px-4 py-4">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-xs  uppercase ">
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
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {applications?.length > 0 ? (
            applications?.map((application: any) => (
              <tr key={application.id} className="border-b  hover:bg-gray-50 ">
                <Link href={`/dashboard/applications/edit/${application?.id}`}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    {application?.job_position
                      ? application?.job_position
                      : "N/A"}
                  </th>
                </Link>
                <td className="px-6 py-4">
                  {application?.company_id
                    ? companies.find(
                        ({ id }: any) => id === application?.company_id
                      ).name
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {application?.company_id
                    ? companies.find(
                        ({ id }: any) => id === application?.company_id
                      ).address_one
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {application?.is_complete === false ? "False" : "true"}
                </td>
                <td className="text-left px-6 py-4">
                  {coverLetters?.find(
                    (coverLetter: any) =>
                      coverLetter?.application_id === application.id
                  )?.id > 0 ? (
                    <div className="flex flex-row">
                      <a
                        id="edit"
                        href={`/dashboard/cover/edit/${
                          coverLetters.find(
                            (coverLetter: any) =>
                              coverLetter?.application_id === application.id
                          )?.id
                        }`}
                        className="font-medium hover:underline"
                      >
                        Edit
                      </a>
                      <button
                        id="remove"
                        onClick={() =>
                          deleteCoverLetter(
                            coverLetters.find(
                              (coverLetter: any) =>
                                coverLetter?.application_id === application.id
                            )?.id
                          )
                        }
                        className="font-medium hover:underline ms-3"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form action={createCoverLetter}>
                      <input
                        type="text"
                        required
                        hidden
                        name="user_id"
                        readOnly
                        value={user.id}
                      />
                      <input
                        type="text"
                        required
                        hidden
                        readOnly
                        name="application_id"
                        value={application.id}
                      />
                      <input
                        type="text"
                        required
                        hidden
                        name="company_id"
                        readOnly
                        value={application.company_id}
                      />
                      <button
                        type="submit"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Create
                      </button>
                    </form>
                  )}
                </td>

                <td className="text-left px-6 py-4">
                  {resumes?.find(
                    (resume: any) => resume.application_id === application.id
                  )?.id > 0 ? (
                    <div className="flex flex-row">
                      <a
                        id="edit"
                        href={`/dashboard/resume/edit/${
                          resumes.find(
                            (resume: any) =>
                              resume.application_id === application.id
                          )?.id
                        }`}
                        className="font-medium  hover:underline"
                      >
                        Edit
                      </a>
                      <button
                        id="remove"
                        onClick={() =>
                          deleteResume(
                            resumes.find(
                              (resume: any) =>
                                resume?.application_id === application.id
                            )?.id
                          )
                        }
                        className="font-medium hover:underline ms-3"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form action={createResume}>
                      <input
                        type="text"
                        required
                        hidden
                        name="user_id"
                        readOnly
                        value={user.id}
                      />
                      <input
                        type="text"
                        required
                        hidden
                        name="application_id"
                        readOnly
                        value={application.id}
                      />
                      <input
                        type="text"
                        required
                        hidden
                        name="company_id"
                        readOnly
                        value={application.company_id}
                      />
                      <button
                        type="submit"
                        className="font-medium text-azure-radiance-600 dark:text-azure-radiance-500 hover:underline"
                      >
                        Create
                      </button>
                    </form>
                  )}
                </td>
                <td className="text-left px-2 py-4">
                  <a
                    id="edit"
                    href={`/dashboard/applications/edit/${application.id}`}
                    className="font-medium  hover:underline"
                  >
                    Edit
                  </a>
                  <button
                    id="remove"
                    onClick={async () => deleteApplication(application.id)}
                    className="font-medium hover:underline ms-3"
                  >
                    Remove
                  </button>
                </td>
                {/* </Link> */}
              </tr>
            ))
          ) : (
            <tr>
              {/* <Link href="/dashboard/application/new"> */}
              <td className="flex items-center px-6 py-4">
                Start by creating your first application here
              </td>{" "}
              {/* </Link> */}
            </tr>
          )}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-black">
            1-10
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-black">
            1000
          </span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  "
            >
              1
            </a>
          </li>

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ApplicationsTable;
