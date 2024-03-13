import Page from "../page";
import { User } from "../../../data/user-details";
import Image from "next/image";
import clsx from "clsx";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faLinkedin,
  faSquareInstagram,
  faSquareTwitter,
  faSquareGithub,
} from "@fortawesome/free-brands-svg-icons";
import { getData } from "@/app/lib/data";

interface Props {
  user: User;
  bodyFont: string;
  headingFont: string;
  resumeColor: string;
  resume: any;
  userWorkExperiences: any;
  userSkills: any;
  userEducation: any;
  userCertifications: any;
  selectedResumeHighlightColor: any;
}

// async function getData() {
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.

//   const res = await fetch(
//     "http://localhost:3000/api/resume-data?resumeId=4&userEmail=user@nextmail.com"
//   );
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

export default async function ElectricalEngineer({ props }: { props: Props }) {
  // const data = await getData("4", "user@nextmail.com");

  console.log(props.user);

  return (
    <>
      {/* <Page>
        <div className="flex flex-row">
          <div className="flex flex-col w-[600px] rounded">
            <Image
              className="rounded-lg"
              alt={data.user.thumbnail}
              width={150}
              height={150}
              src={data.user.thumbnail}
            />
          </div>
          <div className="flex flex-col w-auto">
            <h1
              style={{
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: "50px",
                lineHeight: "1",
                fontWeight: "bold",
              }}
              className={data.resume.heading_font}
            >
              {data.user.first_name} {data.user.last_name}
            </h1>
            <p className={clsx("text-lg", data.resume.body_font)}>
              {data.resume.description}
            </p>
          </div>
        </div>
        <div
          className={clsx(
            data.resume.color,
            "border-gray-500 border-b-[1px] mt-4 w-full h-[3px]"
          )}
        ></div>
        <div className="flex flex-row pt-6">
          <div className="flex flex-col w-3/4">
            <div className="flex flex-row">
              <h2 className={data.resume.heading_font}>WORK EXPERIENCE</h2>
            </div>
            <div className="flex flex-row"></div>{" "}
            <ul className="px-3 py-2">
              {data.userWorkExperiences.map((userWorkExperience: any) => (
                <li className="list-disc py-2" key={userWorkExperience.id}>
                  <h2 className={clsx("font-bold", data.resume.heading_font)}>
                    {userWorkExperience.job_title}
                  </h2>
                  <p className={clsx("", data.resume.body_font)}>
                    {userWorkExperience.company_name} -{" "}
                    {userWorkExperience.location} (
                    {userWorkExperience.start_date} -{" "}
                    {userWorkExperience.end_date})
                  </p>
                  {userWorkExperience?.description_one && (
                    <div className="flex flex-row justify-start">
                      <div className="flex flex-col pr-3 pt-[10px]">
                        <div
                          className={clsx(
                            "h-[7px] w-[7px] rounded-full ",
                            data.resume.body_font,
                            data.resume.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col w-auto text-left">
                        <p
                          className={clsx(
                            "text-sm py-1",
                            data.resume.body_font
                          )}
                        >
                          {userWorkExperience.description_one}
                        </p>
                      </div>
                    </div>
                  )}
                  {userWorkExperience?.description_two && (
                    <div className="flex flex-row justify-start">
                      <div className="flex flex-col pr-3 pt-[10px]">
                        <div
                          className={clsx(
                            "h-[7px] w-[7px] rounded-full",
                            data.resume.body_font,
                            data.resume.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm py-1",
                            data.resume.body_font
                          )}
                        >
                          {userWorkExperience.description_two}
                        </p>
                      </div>
                    </div>
                  )}
                  {userWorkExperience?.description_three && (
                    <div className="flex flex-row justify-start">
                      <div className="flex flex-col pr-3 pt-[10px]">
                        <div
                          className={clsx(
                            "h-[7px] w-[7px] rounded-full",
                            data.resume.body_font,
                            data.resume.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm py-1",
                            data.resume.body_font
                          )}
                        >
                          {userWorkExperience.description_three}
                        </p>
                      </div>
                    </div>
                  )}
                  {userWorkExperience?.description_four && (
                    <div className="flex flex-row justify-start">
                      <div className="flex flex-col pr-3 pt-[10px]">
                        <div
                          className={clsx(
                            "h-[7px] w-[7px] rounded-full",
                            data.resume.body_font,
                            data.resume.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm py-1",
                            data.resume.body_font
                          )}
                        >
                          {userWorkExperience.description_four}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-1/4">
            <div className="flex flex-col pb-3">
              <h2 className={data.resume.heading_font}>PROFILE</h2>
              <div className="flex flex-row pt-4">
                <div className="flex flex-col w-[30px]">
                  <MapPinIcon className="w-[20px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", data.resume.body_font)}>
                    {data.user.address_one}
                  </p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <PhoneIcon className="w-[18px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", data.resume.body_font)}>
                    {data.user.phone}
                  </p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <EnvelopeIcon className="w-[18px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", data.resume.body_font)}>
                    {data.user.email}
                  </p>
                </div>
              </div>

              {data.resume.show_social_icons === "true" ? (
                <>
                  {" "}
                  {data.user.linked_in === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row">
                      <div className="flex flex-col w-[30px] ">
                        <FontAwesomeIcon
                          icon={faLinkedin}
                          className="w-[18px] m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <p className={clsx("", data.resume.body_font)}>
                          {data.user.linked_in}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.user.facebook === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row">
                      <div className="flex flex-col w-[30px] ">
                        <FontAwesomeIcon
                          icon={faSquareFacebook}
                          className="w-[18px] m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <p className={clsx("", data.resume.body_font)}>
                          {data.user.facebook}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.user.instagram === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row">
                      <div className="flex flex-col w-[30px] ">
                        <FontAwesomeIcon
                          icon={faSquareInstagram}
                          className="w-[18px] m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <p className={clsx("", data.resume.body_font)}>
                          {data.user.instagram}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.user.twitter === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row">
                      <div className="flex flex-col w-[30px] ">
                        <FontAwesomeIcon
                          icon={faSquareTwitter}
                          className="w-[18px] m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <p className={clsx("", data.resume.body_font)}>
                          {data.user.twitter}
                        </p>
                      </div>
                    </div>
                  )}
                  {data.user.github === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row">
                      <div className="flex flex-col w-[30px] ">
                        <FontAwesomeIcon
                          icon={faSquareGithub}
                          className="w-[18px] m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <p className={clsx("", data.resume.body_font)}>
                          {data.user.github}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col pb-3 pt-2">
              <h2 className={data.resume.heading_font}>SKILLS</h2>
              <ul className="pt-2">
                {data.userSkills.map((userSkill: any) => (
                  <li className="flex flex-col py-[3px]" key={userSkill.id}>
                    <p className={clsx("text-sm", data.resume.heading_font)}>
                      {userSkill.skill}
                    </p>
                    <div className="progress-container ">
                      <div
                        className={clsx(
                          data.selectedResumeHighlightColor,
                          "rounded-[1rem] h-[1rem] border border-black"
                        )}
                      >
                        <div
                          className={clsx(
                            "progress-bar rounded-[1rem]",
                            data.resume.color
                          )}
                          style={{
                            width: `${userSkill.skill_level}%`,
                            height: "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row pb-3 pt-2">
              <ul>
                <h2 className={data.resume.heading_font}>EDUCATION</h2>
                {data.userEducation.map((userEducation: any) => (
                  <li className="flex flex-col pt-2" key={userEducation.id}>
                    <h2 className={clsx("font-bold", data.resume.heading_font)}>
                      {userEducation.institution_name}
                    </h2>
                    <p className={clsx("text-sm", data.resume.body_font)}>
                      {userEducation.location}
                    </p>
                    <p className={clsx("text-sm", data.resume.body_font)}>
                      {userEducation.start_date} - {userEducation.end_date}
                    </p>
                    <p
                      className={clsx(
                        "text-sm italic font-black",
                        data.resume.heading_font
                      )}
                    >
                      {" "}
                      {userEducation.program}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row pb-3">
              <ul>
                <h2 className={clsx("", data.resume.heading_font)}>
                  CERTIFICATION
                </h2>
                {data.userCertifications.map((userCertification: any) => (
                  <li className="flex flex-col" key={userCertification.id}>
                    <p className={clsx("text-sm", data.resume.body_font)}>
                      {userCertification.name}
                    </p>
                    <p className={clsx("text-sm", data.resume.body_font)}>
                      {userCertification.location}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Page> */}
      {/* <Page></Page> */}
    </>
  );
}