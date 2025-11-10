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
  User,
  UserCertification,
  UserEducationExperience,
  UserOrganization,
  UserSkill,
  UserWorkExperience,
} from "@/app/lib/definitions";

interface Props {
  user: User;
  body_font: string;
  heading_font: string;
  color: string;
  highlightColor: string;
  resume: any;
  userWorkExperiences: any;
  userSkills: any;
  userEducation: any;
  userCertifications: any;
  userOrganizations: any;
  show_social_icons: any;
  show_skills_section: any;
  show_skill_progress: any;
  show_education_section: any;
  show_custom_section_one: any;
  show_custom_section_two: any;
  educationResumeLines: any;
  workResumeLines: any;
  skillResumeLines: any;
  organizationResumeLines: any;
  certificationResumeLines: any;
}

export default async function Elegant(props: Props) {
  return (
    <Page>
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col">
          <div
            className={clsx(
              props?.color || props?.resume?.color,
              "w-full h-auto p-2",
            )}
          >
            <h1
              style={{
                color: "white",
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: "20px",
                lineHeight: "1",
                fontWeight: "bold",
              }}
              className={clsx(
                "pb-2",
                props?.heading_font || props?.resume?.heading_font,
              )}
            >
              {props?.user?.first_name} {props?.user?.last_name}
            </h1>
            <p
              className={clsx(
                "text-[1rem] italic font-medium text-white mb-2",
                props?.body_font || props?.resume?.body_font,
              )}
            >
              {props?.resume?.description}
            </p>
            <div className="flex flex-col ml-[-3px]">
              <div className="flex flex-row justify-start gap-1 h-[20px]">
                <div className="flex flex-col w-[18px] ml-px text-white">
                  <MapPinIcon className="m-auto" />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`https://www.google.com/search?q=${props?.user?.address_one}`}
                    className={clsx(
                      props?.body_font || props?.resume?.body_font,
                      "text-[0.65rem] py-1 text-white pl-px",
                    )}
                  >
                    {props?.user?.address_one}
                  </a>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-1 h-[20px]">
                <div className="flex flex-col w-[15px] ml-[3px] text-white">
                  <PhoneIcon className="m-auto" />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`tel:${props?.user?.phone}`}
                    className={clsx(
                      props?.body_font || props?.resume?.body_font,
                      "text-[0.65rem] py-1 pl-[2px] text-white",
                    )}
                  >
                    {props?.user?.phone}
                  </a>
                </div>
              </div>
              <div className="flex flex-row justify-start gap-1 h-[20px]">
                <div className="flex flex-col w-[15px] ml-[2.5px] ">
                  <EnvelopeIcon className="m-auto text-white " />
                </div>
                <div className="flex flex-col ">
                  <a
                    href={`mailto:${props?.user?.email}`}
                    className={clsx(
                      props?.body_font || props?.resume?.body_font,
                      "text-[0.65rem] truncate py-1 pl-[3px] text-white",
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
                    <div className="flex flex-row justify-start gap-1 h-[20px] ">
                      <div className="flex flex-col w-[15px] ml-[3px] text-white">
                        <FontAwesomeIcon icon={faLinkedin} className="m-auto" />
                      </div>
                      <div className="flex flex-col w-3/4 ">
                        <a
                          href={`https://linkedin.com/in/${props?.user?.linked_in}`}
                          className={clsx(
                            props?.body_font || props?.resume?.body_font,
                            "text-[0.65rem] py-1 pl-[2px] text-white my-auto",
                          )}
                        >
                          {`linkedin.com/in/${props?.user?.linked_in}`}
                        </a>
                      </div>
                    </div>
                  )}
                  {props?.user?.facebook === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row justify-start gap-1 h-[20px]">
                      <div className="flex flex-col w-[15px] ml-[3px] text-white">
                        <FontAwesomeIcon
                          icon={faSquareFacebook}
                          className="my-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <a
                          href={`https://facebook.com/${props?.user?.facebook}`}
                          className={clsx(
                            props?.body_font || props?.resume?.body_font,
                            "text-[0.65rem] truncate py-1 pl-[2px] my-auto text-white",
                          )}
                        >
                          {`facebook.com/${props?.user?.facebook}`}
                        </a>
                      </div>
                    </div>
                  )}
                  {props?.user?.instagram === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row justify-start gap-1 h-[20px] my-auto">
                      <div className="flex flex-col w-[15px] ml-[3px]  text-white">
                        <FontAwesomeIcon
                          icon={faSquareInstagram}
                          className="my-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <a
                          href={`https://instagram.com/${props?.user?.instagram}`}
                          className={clsx(
                            props?.body_font || props?.resume?.body_font,
                            "text-[0.65rem] pl-[2px] text-white  my-auto",
                          )}
                        >
                          {`instagram.com/${props?.user?.instagram}`}
                        </a>
                      </div>
                    </div>
                  )}
                  {props?.user?.twitter === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row justify-start gap-1 h-[20px]">
                      <div className="flex flex-col w-[15px] ml-[3px] text-white">
                        <FontAwesomeIcon
                          icon={faSquareTwitter}
                          className="m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <a
                          href={`https://twitter.com/${props?.user?.twitter}`}
                          className={clsx(
                            props?.body_font || props?.resume?.body_font,
                            "text-[0.65rem] pl-[2px] my-auto text-white",
                          )}
                        >
                          {`twitter.com/${props?.user?.twitter}`}
                        </a>
                      </div>
                    </div>
                  )}
                  {props?.user?.github === "" ? (
                    ""
                  ) : (
                    <div className="flex flex-row justify-start gap-1 h-[20px]">
                      <div className="flex flex-col w-[15px] ml-[3px] text-white">
                        <FontAwesomeIcon
                          icon={faSquareGithub}
                          className="m-auto"
                        />
                      </div>
                      <div className="flex flex-col w-3/4">
                        <a
                          href={`https://github.com/${props?.user?.github}`}
                          className={clsx(
                            props?.body_font || props?.resume?.body_font,
                            "text-[0.65rem] truncate pl-[2px] my-auto text-white",
                          )}
                        >
                          {`github.com/${props?.user?.github}`}
                        </a>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="bg-slate-100 h-[755px] w-full p-2">
            {props?.show_education_section === "true" ||
            props?.resume?.show_education_section === "true" ? (
              <div className="flex flex-row pb-4">
                <ul>
                  <h1
                    className={clsx(
                      "font-bold ",
                      props?.heading_font || props?.resume?.heading_font,
                    )}
                  >
                    EDUCATION
                  </h1>
                  {props?.educationResumeLines?.map(
                    (userEducation: UserEducationExperience) => (
                      <li
                        className="flex flex-col pt-2"
                        key={userEducation?.id}
                      >
                        <h2
                          className={clsx(
                            "font-bold text-sm",
                            props?.heading_font || props?.resume?.heading_font,
                          )}
                        >
                          {userEducation?.institution_name}
                        </h2>
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font,
                          )}
                        >
                          {userEducation?.location}
                        </p>
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font,
                          )}
                        >
                          {userEducation?.start_date} -{" "}
                          {userEducation?.end_date}
                        </p>
                        <p
                          className={clsx(
                            "text-sm italic font-black",
                            props?.body_font || props?.resume?.body_font,
                          )}
                        >
                          {userEducation?.program}
                        </p>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
            {props?.show_custom_section_two === "true" ||
            props?.resume?.show_custom_section_two === "true" ? (
              <div className="flex flex-row pb-4">
                <div className="flex flex-col">
                  <h2
                    className={clsx(
                      "font-bold ",
                      props?.heading_font || props?.resume?.heading_font,
                    )}
                  >
                    {props?.resume?.custom_section_two_name}
                  </h2>
                  <ul>
                    {props?.certificationResumeLines?.map(
                      (userCertification: UserCertification) => (
                        <li
                          className="flex flex-col"
                          key={userCertification?.id}
                        >
                          <p
                            className={clsx(
                              "text-sm font-bold pt-2",
                              props?.body_font || props?.resume?.body_font,
                            )}
                          >
                            {userCertification?.name}
                          </p>
                          <p
                            className={clsx(
                              "text-sm",
                              props?.body_font || props?.resume?.body_font,
                            )}
                          >
                            {userCertification?.location}
                          </p>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
            {props?.show_skill_progress === "true" ||
            props?.resume?.show_skill_progress === "true" ? (
              props.show_skills_section === "true" ||
              props?.resume?.show_skills_section === "true" ? (
                <div className="flex flex-col pb-3 ">
                  <h2
                    className={clsx(
                      "font-bold ",
                      props?.heading_font || props?.resume?.heading_font,
                    )}
                  >
                    SKILLS
                  </h2>
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
                              props?.body_font || props?.resume?.body_font,
                            )}
                          >
                            {userSkill?.skill}
                          </p>

                          <div className="progress-container">
                            <div
                              className={clsx(
                                props?.resume?.highlight_color ||
                                  props?.resume?.highlight_color,
                                "rounded-full h-[10px] border border-black",
                              )}
                            >
                              <div
                                className={clsx(
                                  "progress-bar rounded-full",
                                  props?.color || props?.resume?.color,
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
                <div className="flex flex-col pb-3 pt-2">
                  <h2
                    className={clsx(
                      "font-bold ",
                      props?.heading_font || props?.resume?.heading_font,
                    )}
                  >
                    SKILLS
                  </h2>
                  <ul className="pt-2 flex flex-row flex-wrap gap-1">
                    {props?.skillResumeLines[0] &&
                      props?.skillResumeLines?.map((userSkill: UserSkill) => (
                        <li
                          className={clsx(
                            "flex flex-col px-2 rounded py-[2px] border-[1.5px] text-[black]",
                            `border-${props?.highlightColor || props?.resume?.highlight_color}`,
                          )}
                          key={userSkill?.id}
                        >
                          <p
                            className={clsx(
                              "text-[0.75rem] font-bold",
                              props?.body_font || props?.resume?.body_font,
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
          </div>
        </div>
        <div className="flex flex-col pl-4 pt-1">
          <div className="flex flex-row">
            <h2
              className={clsx(
                "font-bold",
                props?.heading_font || props?.resume?.heading_font,
              )}
            >
              WORK EXPERIENCE
            </h2>
          </div>
          <ul className="pr-3 pb-2 ">
            {props?.workResumeLines?.map(
              (userWorkExperience: UserWorkExperience) => (
                <li className=" py-2" key={userWorkExperience?.id}>
                  <h2
                    className={clsx(
                      "font-bold",
                      props?.heading_font || props?.resume?.heading_font,
                    )}
                  >
                    {userWorkExperience?.job_title}
                  </h2>
                  <p
                    className={clsx(
                      "text-[0.85rem] font-lite",
                      props?.heading_font || props?.resume?.heading_font,
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
                            props?.color || props?.resume?.color,
                          )}
                        />
                      </div>
                      <div className="flex flex-col w-auto text-left">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font,
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
                            props?.color || props?.resume?.color,
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm ",
                            props?.body_font || props?.resume?.body_font,
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
                            props?.color || props?.resume?.color,
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font,
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

                            props?.color || props?.resume?.color,
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.body_font || props?.resume?.body_font,
                          )}
                        >
                          {userWorkExperience?.description_four}
                        </p>
                      </div>
                    </div>
                  )}
                </li>
              ),
            )}
          </ul>
          {props?.show_custom_section_one === "true" ||
          props?.resume?.show_custom_section_one === "true" ? (
            <>
              <div className="flex flex-row">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font,
                  )}
                >
                  {props.resume.custom_section_one_name}
                </h2>
              </div>
              {/* <div
                className={clsx(
                  props?.color || props?.resume?.color,
                  " w-full h-[2px]"
                )}
              /> */}
              <div className=""></div>{" "}
              {props?.organizationResumeLines?.map(
                (userOrganization: UserOrganization) => (
                  <div
                    className="flex flex-row py-2"
                    key={userOrganization?.id}
                  >
                    <div className="flex flex-col pr-3 pt-[10px]">
                      <div
                        className={clsx(
                          "h-[7px] w-[7px] rounded-full",

                          props?.color || props?.resume?.color,
                        )}
                      />
                    </div>

                    <div className="flex flex-col">
                      <h2
                        className={clsx(
                          "font-bold",
                          props?.heading_font || props?.resume?.heading_font,
                        )}
                      >
                        {userOrganization?.name}
                      </h2>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.body_font || props?.resume?.body_font,
                        )}
                      >
                        {userOrganization?.location}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </Page>
  );
}
