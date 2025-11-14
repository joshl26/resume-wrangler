import Page from "../../page";
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

export default async function Modern(props: Props) {
  return (
    <Page>
      <div className="bg-slate-100 w-full h-[80px] mt-11 absolute left-0 right-0"></div>
      <div className="relative text-center flex flex-col">
        <div
          className={clsx(
            `border-${props.highlightColor || props?.resume?.highlight_color}`,
            "flex flex-row py-1 px-8 border-2 m-auto w-auto text-[40px] font-bold bg-white",
          )}
        >
          <h1
            className={clsx(
              "pr-3 font-thin",
              props?.heading_font || props?.resume?.heading_font,
            )}
          >
            {props?.user?.first_name}
          </h1>
          <h1
            className={clsx(
              `text-${props.highlightColor || props?.resume?.highlight_color} font-bold`,
              props?.heading_font || props?.resume?.heading_font,
            )}
          >
            {props?.user?.last_name}
          </h1>
        </div>
        <div className="flex flex-row m-auto pt-2">
          <p
            className={clsx(
              "text-[1.5rem] font-bold text-black mb-2",
              props?.body_font || props?.resume?.body_font,
            )}
          >
            {props?.resume?.title}
          </p>
        </div>
      </div>
      <div className="flex flex-row pt-3">
        <div className="flex flex-col w-1/4 mr-8">
          <div className="flex flex-col pb-1">
            <h2
              className={clsx(
                "font-bold",
                props?.heading_font || props?.resume?.heading_font,
              )}
            >
              PROFILE
            </h2>
            <div
              className={clsx(
                props?.color || props?.resume?.color,
                " w-full h-[3px]",
              )}
            />
            <div className="flex flex-row pt-2">
              <div className="flex flex-col w-[26px] pl-1">
                <MapPinIcon className="m-auto" />
              </div>
              <div className="flex flex-col w-auto">
                <a
                  href={`https://www.google.com/search?q=${props?.user?.address_one}`}
                  className={clsx(
                    props?.body_font || props?.resume?.body_font,
                    "text-[0.75rem] py-1 pl-1",
                  )}
                >
                  {props?.user?.address_one}
                </a>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-col w-[28px] ">
                <PhoneIcon className=" m-auto pl-2" />
              </div>
              <div className="flex flex-col w-full">
                <a
                  href={`tel:${props?.user?.phone}`}
                  className={clsx(
                    props?.body_font || props?.resume?.body_font,
                    "text-[0.75rem] py-1 pl-1",
                  )}
                >
                  {props?.user?.phone}
                </a>
              </div>
            </div>
            <div className="flex flex-row justify-start">
              <div className="flex flex-col w-[30px] ">
                <EnvelopeIcon className="w-[18px] m-auto" />
              </div>
              <div className="flex flex-col">
                <a
                  href={`mailto:${props?.user?.email}`}
                  className={clsx(
                    props?.body_font || props?.resume?.body_font,
                    "text-[0.7rem] truncate py-1 ",
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
                        className="m-auto w-[18px]"
                      />
                    </div>
                    <div className="flex flex-col w-3/4">
                      <a
                        href={`https://linkedin.com/in/${props?.user?.linked_in}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-[0.7rem] py-1 ",
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
                  <div className="flex flex-row">
                    <div className="flex flex-col w-[30px] ">
                      <FontAwesomeIcon
                        icon={faSquareFacebook}
                        className="w-[18px] m-auto"
                      />
                    </div>
                    <div className="flex flex-col w-3/4">
                      <a
                        href={`https://facebook.com/${props?.user?.facebook}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-[0.7rem] py-1",
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
                  <div className="flex flex-row">
                    <div className="flex flex-col w-[30px] ">
                      <FontAwesomeIcon
                        icon={faSquareInstagram}
                        className="w-[18px] m-auto"
                      />
                    </div>
                    <div className="flex flex-col w-3/4">
                      <a
                        href={`https://instagram.com/${props?.user?.instagram}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-[0.7rem] py-1 truncate",
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
                  <div className="flex flex-row">
                    <div className="flex flex-col w-[30px] ">
                      <FontAwesomeIcon
                        icon={faSquareTwitter}
                        className="w-[18px] m-auto"
                      />
                    </div>
                    <div className="flex flex-col w-3/4">
                      <a
                        href={`https://twitter.com/${props?.user?.twitter}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-[0.7rem] py-1 truncate",
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
                  <div className="flex flex-row">
                    <div className="flex flex-col w-[30px] ">
                      <FontAwesomeIcon
                        icon={faSquareGithub}
                        className="w-[18px] m-auto"
                      />
                    </div>
                    <div className="flex flex-col w-3/4">
                      <a
                        href={`https://github.com/${props?.user?.github}`}
                        className={clsx(
                          props?.body_font || props?.resume?.body_font,
                          "text-[0.7rem] py-1 truncate",
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

          {props?.show_skill_progress === "true" ||
          props?.resume?.show_skill_progress === "true" ? (
            props.show_skills_section === "true" ||
            props?.resume?.show_skills_section === "true" ? (
              <div className="flex flex-col pb-3 pt-4">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font,
                  )}
                >
                  SKILLS
                </h2>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    "w-full h-[3px]",
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
                                "progress-bar rounded-2xl",
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
              <div className="flex flex-col pb-3 pt-2 w-full">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font,
                  )}
                >
                  SKILLS
                </h2>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    " w-full h-[3px]",
                  )}
                />
                <ul className="pt-3 flex flex-row flex-wrap gap-1">
                  {props?.skillResumeLines[0] &&
                    props?.skillResumeLines?.map((userSkill: UserSkill) => (
                      <li
                        className={clsx(
                          "flex flex-col px-2 rounded py-[2px] border text-[black]",
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
          {props?.show_education_section === "true" ||
          props?.resume?.show_education_section === "true" ? (
            <div className="flex flex-row pb-3 pt-2">
              <ul className="w-full">
                <h1
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font,
                  )}
                >
                  EDUCATION
                </h1>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    "w-full h-[3px]",
                  )}
                />
                {props?.educationResumeLines?.map(
                  (userEducation: UserEducationExperience) => (
                    <li className="flex flex-col pt-2" key={userEducation?.id}>
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
                        {userEducation?.start_date} - {userEducation?.end_date}
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
            <div className="flex flex-row pb-3">
              <div className="flex flex-col">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.heading_font || props?.resume?.heading_font,
                  )}
                >
                  {props?.resume?.custom_section_two_name}
                </h2>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    "w-full h-[3px]",
                  )}
                />
                <ul>
                  {props?.certificationResumeLines?.map(
                    (userCertification: UserCertification) => (
                      <li className="flex flex-col" key={userCertification?.id}>
                        <p
                          className={clsx(
                            "text-sm font-medium pt-2",
                            props?.heading_font || props?.resume?.heading_font,
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
        </div>
        <div className="flex flex-col w-3/4">
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
          <div
            className={clsx(
              props?.color || props?.resume?.color,
              " w-full h-[3px]",
            )}
          />
          <div className="flex flex-row"></div>{" "}
          <ul className="pb-2">
            {props?.workResumeLines?.map(
              (userWorkExperience: UserWorkExperience) => (
                <li className="pt-1" key={userWorkExperience?.id}>
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
                      <div className="flex flex-col pr-3 pt-[8px]">
                        <div
                          className={clsx(
                            "h-[5px] w-[5px] rounded-full ",
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
                      <div className="flex flex-col pr-3 pt-[8px]">
                        <div
                          className={clsx(
                            "h-[5px] w-[5px] rounded-full",
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
                      <div className="flex flex-col pr-3 pt-[8px]">
                        <div
                          className={clsx(
                            "h-[5px] w-[5px] rounded-full",
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
                      <div className="flex flex-col pr-3 pt-[8px]">
                        <div
                          className={clsx(
                            "h-[5px] w-[5px] rounded-full",

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
              <div
                className={clsx(
                  props?.color || props?.resume?.color,
                  " w-full h-[3px]",
                )}
              />
              <div className="flex flex-row"></div>{" "}
              <ul className="px-3 ">
                {props?.organizationResumeLines?.map(
                  (userOrganization: UserOrganization) => (
                    <li className="list-disc py-2" key={userOrganization?.id}>
                      <p
                        className={clsx(
                          "font-bold",
                          props?.heading_font || props?.resume?.heading_font,
                        )}
                      >
                        {userOrganization?.name}
                      </p>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.body_font || props?.resume?.body_font,
                        )}
                      >
                        {userOrganization?.location}
                      </p>
                    </li>
                  ),
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
