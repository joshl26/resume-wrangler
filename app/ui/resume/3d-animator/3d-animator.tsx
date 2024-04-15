import Page from "../page";
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
import {
  BodyFont,
  HeaderFont,
  Resume,
  User,
  UserCertification,
  UserCertifications,
  UserEducationExperience,
  UserEducationExperiences,
  UserOrganization,
  UserSkill,
  UserSkills,
  UserWorkExperience,
  UserWorkExperiences,
  userOrganizations,
} from "@/app/lib/definitions";

interface Props {
  user: User;
  body_font: any;
  heading_font: any;
  color: string;
  resume: Resume;
  userWorkExperiences: UserWorkExperiences;
  userSkills: UserSkills;
  userEducation: UserEducationExperiences;
  userCertifications: UserCertifications;
  userOrganizations: userOrganizations;
  selectedResumeHighlightColor: any;
  show_social_icons: string;
  show_skills_section: string;
  show_skill_progress: string;
  show_education_section: string;
  show_custom_section_one: string;
  show_custom_section_two: string;
  educationResumeLines: any;
  workResumeLines: any;
  skillResumeLines: any;
  organizationResumeLines: any;
  certificationResumeLines: any;
}

export default async function ThreeDAnimator(props: Props) {
  return (
    <Page>
      <div className="flex flex-row m-auto">
        <div className="flex flex-col w-1/4 rounded ">
          <Image
            className="rounded-full"
            alt={props?.user?.thumbnail}
            width={350}
            height={350}
            src={props?.user?.thumbnail}
          />
        </div>
        <div className="flex flex-col w-3/4 px-6">
          <h1
            style={{
              textAlign: "left",
              textTransform: "uppercase",
              fontSize: "50px",
              lineHeight: "1",
              fontWeight: "bold",
            }}
            className={clsx(
              "pb-3",
              props?.heading_font || props?.resume?.heading_font
            )}
          >
            {props?.user?.first_name} {props?.user?.last_name}
          </h1>
          <p
            className={clsx(
              "text-[1rem]",
              props?.body_font || props?.resume?.body_font
            )}
          >
            {props?.resume?.description}
          </p>
        </div>
      </div>
      <div className="flex flex-row pt-3">
        <div className="flex flex-col w-1/4 mr-8">
          <div className="flex flex-col pb-3">
            <h2
              className={clsx(
                "font-bold",
                props?.heading_font || props?.resume?.heading_font
              )}
            >
              PROFILE
            </h2>
            <div
              className={clsx(
                props?.color || props?.resume?.color,
                " w-full h-[2px]"
              )}
            />
            <div className="flex flex-row pt-4">
              <div className="flex flex-col w-[30px]">
                <MapPinIcon className="w-[20px] m-auto" />
              </div>
              <div className="flex flex-col w-3/4">
                <a
                  href={`https://www.google.com/search?q=${props?.user?.address_one}`}
                  className={clsx(
                    props?.body_font || props?.resume?.body_font,
                    "text-sm py-1"
                  )}
                >
                  {props?.user?.address_one}
                </a>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col w-[30px] ">
                <PhoneIcon className="w-[18px] m-auto" />
              </div>
              <div className="flex flex-col w-3/4">
                <a
                  href={`tel:${props?.user?.phone}`}
                  className={clsx(
                    props?.body_font || props?.resume?.body_font,
                    "text-sm py-1"
                  )}
                >
                  {props?.user?.phone}
                </a>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col w-[30px] ">
                <EnvelopeIcon className="w-[18px] m-auto" />
              </div>
              <div className="flex flex-col w-3/4">
                <a
                  href={`mailto:${props?.user?.email}`}
                  className={clsx(
                    props?.body_font || props?.resume?.body_font,
                    "text-sm py-1"
                  )}
                >
                  {props?.user?.email}
                </a>
              </div>
            </div>
            {props?.show_social_icons === "true" ||
            props?.resume?.show_social_icons === "true" ? (
              <>
                {props?.user?.linked_in === "" ? (
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
                      <a
                        href={`https://linkedin.com/${props?.user?.linked_in}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-sm py-1"
                        )}
                      >
                        {`in/${props?.user?.linked_in}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.facebook === "" ? (
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
                      <a
                        href={`https://facebook.com${props?.user?.facebook}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-sm py-1"
                        )}
                      >
                        {`facebook/${props?.user?.facebook}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.instagram === "" ? (
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
                      <a
                        href={`https://instagram.com${props?.user?.instagram}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-sm py-1"
                        )}
                      >
                        {`insta/${props?.user?.instagram}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.twitter === "" ? (
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
                      <a
                        href={`https://twitter.com${props?.user?.twitter}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-sm py-1"
                        )}
                      >
                        {`tweet/${props?.user?.twitter}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.github === "" ? (
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
                      <p
                        className={clsx(
                          props?.body_font || props?.resume?.body_font
                        )}
                      >
                        {props?.user?.github}
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </div>
          {props?.show_skill_progress === "true" ||
          props?.resume?.show_skill_progress === "true" ? (
            props.show_skills_section === "true" ||
            props?.resume?.show_skills_section === "true" ? (
              <div className="flex flex-col pb-3 pt-4">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font
                  )}
                >
                  SKILLS
                </h2>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    "w-full h-[3px]"
                  )}
                />
                <div className="pt-2">
                  {props?.skillResumeLines[0] &&
                    props?.skillResumeLines?.map((userSkill: UserSkill) => (
                      <div
                        className="flex flex-col py-[2px]"
                        key={userSkill?.id}
                      >
                        <p
                          className={clsx(
                            "text-[0.75rem] font-bold",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userSkill?.skill}
                        </p>

                        <div className="progress-container">
                          <div
                            className={clsx(
                              props?.resume?.highlight_color ||
                                props?.resume?.highlight_color,
                              "rounded-full h-[10px] border border-black"
                            )}
                          >
                            <div
                              className={clsx(
                                "progress-bar rounded-[1rem]",
                                props?.color || props?.resume?.color
                              )}
                              style={{
                                width: `${userSkill?.skill_level}%`,
                                height: "100%",
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {props?.show_skill_progress === "false" ||
          props?.resume?.show_skill_progress === "false" ? (
            props.show_skills_section === "true" ||
            props?.resume?.show_skills_section === "true" ? (
              <div className="flex flex-col pb-3 pt-2 w-full">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font
                  )}
                >
                  SKILLS
                </h2>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    " w-full h-[2px]"
                  )}
                />
                <ul className="pt-4 flex flex-row flex-wrap gap-2">
                  {props?.skillResumeLines[0] &&
                    props?.skillResumeLines?.map((userSkill: UserSkill) => (
                      <li
                        className={clsx(
                          `flex flex-col px-2 rounded py-[2px] border-[2px] border-[${props?.resume?.highlight_color}] text-[black]`
                        )}
                        key={userSkill?.id}
                      >
                        <p
                          className={clsx(
                            "text-[0.75rem] font-bold",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userSkill?.skill}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {props?.show_education_section === "true" ||
          props?.resume?.show_education_section === "true" ? (
            <div className="flex flex-row pb-3 pt-2">
              <ul className="w-full">
                <h1
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font
                  )}
                >
                  EDUCATION
                </h1>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    "w-full h-[2px]"
                  )}
                />
                {props?.educationResumeLines?.map(
                  (userEducation: UserEducationExperience) => (
                    <li className="flex flex-col pt-2" key={userEducation?.id}>
                      <h2
                        className={clsx(
                          "font-bold text-sm",
                          props?.heading_font || props?.resume?.heading_font
                        )}
                      >
                        {userEducation?.institution_name}
                      </h2>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.body_font || props?.resume?.body_font
                        )}
                      >
                        {userEducation?.location}
                      </p>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.body_font || props?.resume?.body_font
                        )}
                      >
                        {userEducation?.start_date} - {userEducation?.end_date}
                      </p>
                      <p
                        className={clsx(
                          "text-sm italic font-black",
                          props?.body_font || props?.resume?.body_font
                        )}
                      >
                        {userEducation?.program}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : (
            ""
          )}

          {props?.show_custom_section_two === "true" ||
          props?.resume?.show_custom_section_two === "true" ? (
            <div className="flex flex-row pb-3">
              <div className="flex flex-col">
                <h2
                  className={clsx(
                    "font-bold ",
                    props?.heading_font || props?.resume?.heading_font
                  )}
                >
                  {props?.resume?.custom_section_two_name}
                </h2>
                <ul>
                  {props?.certificationResumeLines?.map(
                    (userCertification: UserCertification) => (
                      <li className="flex flex-col" key={userCertification?.id}>
                        <p
                          className={clsx(
                            "text-sm font-bold pt-2",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userCertification?.name}
                        </p>
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userCertification?.location}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col w-3/4">
          <div className="flex flex-row">
            <h2
              className={clsx(
                "font-bold",
                props?.heading_font || props?.resume?.heading_font
              )}
            >
              WORK EXPERIENCE
            </h2>
          </div>
          <div
            className={clsx(
              props?.color || props?.resume?.color,
              " w-full h-[2px]"
            )}
          />
          <div className="flex flex-row"></div>{" "}
          <ul className="px-3 py-2">
            {props?.workResumeLines?.map(
              (userWorkExperience: UserWorkExperience) => (
                <li className="list-disc py-2" key={userWorkExperience?.id}>
                  <h2
                    className={clsx(
                      "font-bold",
                      props?.heading_font || props?.resume?.heading_font
                    )}
                  >
                    {userWorkExperience?.job_title}
                  </h2>
                  <p
                    className={clsx(
                      "text-[1rem]",
                      props?.heading_font || props?.resume?.heading_font
                    )}
                  >
                    {userWorkExperience?.company_name} -{" "}
                    {userWorkExperience?.location} (
                    {userWorkExperience?.start_date} -{" "}
                    {userWorkExperience?.end_date})
                  </p>
                  {userWorkExperience?.description_one && (
                    <div className="flex flex-row justify-start">
                      <div className="flex flex-col pr-3 pt-[10px]">
                        <div
                          className={clsx(
                            "h-[7px] w-[7px] rounded-full ",
                            props?.color || props?.resume?.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col w-auto text-left">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userWorkExperience?.description_one}
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
                            props?.color || props?.resume?.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm ",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userWorkExperience?.description_two}
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
                            props?.color || props?.resume?.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userWorkExperience?.description_three}
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

                            props?.color || props?.resume?.color
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font
                          )}
                        >
                          {userWorkExperience?.description_four}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              )
            )}
          </ul>
          {props?.show_custom_section_one === "true" ||
          props?.resume?.show_custom_section_one === "true" ? (
            <>
              <div className="flex flex-row">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font
                  )}
                >
                  {props.resume.custom_section_one_name}
                </h2>
              </div>
              <div
                className={clsx(
                  props?.color || props?.resume?.color,
                  " w-full h-[2px]"
                )}
              />
              <div className="flex flex-row"></div>{" "}
              <ul className="px-3 py-2">
                {props?.organizationResumeLines?.map(
                  (userOrganization: UserOrganization) => (
                    <li className="list-disc py-2" key={userOrganization?.id}>
                      <p
                        className={clsx(
                          "font-bold",
                          props?.heading_font || props?.resume?.heading_font
                        )}
                      >
                        {userOrganization?.name}
                      </p>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.body_font || props?.resume?.body_font
                        )}
                      >
                        {userOrganization?.location}
                      </p>
                    </li>
                  )
                )}
              </ul>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Page>
  );
}
