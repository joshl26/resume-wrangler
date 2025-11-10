import Page from "../page";
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
  bodyFont: string;
  headingFont: string;
  color: string;
  highlightColor: string;
  resume: any;
  userWorkExperiences: any;
  userSkills: any;
  userEducation: any;
  userCertifications: any;
  userOrganizations: any;
  showSocialIcons: boolean;
  showSkillsSection: boolean;
  showSkillProgress: boolean;
  showEducationSection: boolean;
  showCustomSectionOne: boolean;
  showCustomSectionTwo: boolean;
  educationResumeLines: any;
  workResumeLines: any;
  skillResumeLines: any;
  organizationResumeLines: any;
  certificationResumeLines: any;
  showProjects: boolean;
  userProjects: any;
  showLanguages: boolean;
  userLanguages: any;
}

export default async function ModernV2(props: Props) {
  return (
    <Page>
      <div className="bg-slate-100 w-full h-[80px] mt-11 absolute left-0 right-0"></div>
      <div className="relative text-center flex flex-col">
        <div
          className={clsx(
            `border-${props.highlightColor || props?.resume?.highlightColor}`,
            "flex flex-row py-1 px-8 border-[2px] m-auto w-auto text-[40px] font-bold bg-white",
          )}
        >
          <h1
            className={clsx(
              "pr-3 font-thin",
              props?.headingFont || props?.resume?.headingFont,
            )}
          >
            {props?.user?.first_name}
          </h1>
          <h1
            className={clsx(
              `text-${props.highlightColor || props?.resume?.highlightColor} font-bold`,
              props?.headingFont || props?.resume?.headingFont,
            )}
          >
            {props?.user?.last_name}
          </h1>
        </div>
        <div className="flex flex-row m-auto pt-2">
          <p
            className={clsx(
              "text-[1.5rem] font-bold text-black mb-2",
              props?.bodyFont || props?.resume?.bodyFont,
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
                props?.headingFont || props?.resume?.headingFont,
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
                    props?.bodyFont || props?.resume?.bodyFont,
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
                    props?.bodyFont || props?.resume?.bodyFont,
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
                    props?.bodyFont || props?.resume?.bodyFont,
                    "text-[0.7rem] truncate py-1 ",
                  )}
                >
                  {props?.user?.email}
                </a>
              </div>
            </div>
            {props?.showSocialIcons || props?.resume?.showSocialIcons ? (
              <>
                {props?.user?.linked_in && (
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
                          props?.bodyFont || props?.resume?.bodyFont,
                          "text-[0.7rem] py-1 ",
                        )}
                      >
                        {`linkedin.com/in/${props?.user?.linked_in}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.facebook && (
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
                          props?.bodyFont || props?.resume?.bodyFont,
                          "text-[0.7rem] py-1",
                        )}
                      >
                        {`facebook.com/${props?.user?.facebook}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.instagram && (
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
                          props?.bodyFont || props?.resume?.bodyFont,
                          "text-[0.7rem] py-1 truncate",
                        )}
                      >
                        {`instagram.com/${props?.user?.instagram}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.twitter && (
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
                          props?.bodyFont || props?.resume?.bodyFont,
                          "text-[0.7rem] py-1 truncate",
                        )}
                      >
                        {`twitter.com/${props?.user?.twitter}`}
                      </a>
                    </div>
                  </div>
                )}
                {props?.user?.github && (
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
                          props?.bodyFont || props?.resume?.bodyFont,
                          "text-[0.7rem] py-1 truncate",
                        )}
                      >
                        {`github.com/${props?.user?.github}`}
                      </a>
                    </div>
                  </div>
                )}
              </>
            ) : null}
          </div>

          {props?.showSkillsSection && (
            <div className="flex flex-col pb-3 pt-4">
              <h2
                className={clsx(
                  "font-bold",
                  props?.headingFont || props?.resume?.headingFont,
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
              {props?.showSkillProgress ? (
                <div className="pt-2">
                  {props?.skillResumeLines?.map((userSkill: UserSkill) => (
                    <div className="flex flex-col py-[2px]" key={userSkill?.id}>
                      <p
                        className={clsx(
                          "text-[0.75rem] font-bold",
                          props?.bodyFont || props?.resume?.bodyFont,
                        )}
                      >
                        {userSkill?.skill}
                      </p>

                      <div className="progress-container">
                        <div
                          className={clsx(
                            props?.resume?.highlightColor,
                            "rounded-full h-[10px] border border-black",
                          )}
                        >
                          <div
                            className={clsx(
                              "progress-bar rounded-[1rem]",
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
              ) : (
                <ul className="pt-3 flex flex-row flex-wrap gap-1">
                  {props?.skillResumeLines?.map((userSkill: UserSkill) => (
                    <li
                      className={clsx(
                        "flex flex-col px-2 rounded py-[2px] border-[1px] text-[black]",
                        `border-${props?.highlightColor || props?.resume?.highlightColor}`,
                      )}
                      key={userSkill?.id}
                    >
                      <p
                        className={clsx(
                          "text-[0.75rem] font-bold",
                          props?.bodyFont || props?.resume?.bodyFont,
                        )}
                      >
                        {userSkill?.skill}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {props?.showEducationSection && (
            <div className="flex flex-row pb-3 pt-2">
              <ul className="w-full">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.headingFont || props?.resume?.headingFont,
                  )}
                >
                  EDUCATION
                </h2>
                <div
                  className={clsx(
                    props?.color || props?.resume?.color,
                    "w-full h-[3px]",
                  )}
                />
                {props?.educationResumeLines?.map(
                  (userEducation: UserEducationExperience) => (
                    <li className="flex flex-col pt-2" key={userEducation?.id}>
                      <h3
                        className={clsx(
                          "font-bold text-sm",
                          props?.headingFont || props?.resume?.headingFont,
                        )}
                      >
                        {userEducation?.institution_name}
                      </h3>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.bodyFont || props?.resume?.bodyFont,
                        )}
                      >
                        {userEducation?.location}
                      </p>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.bodyFont || props?.resume?.bodyFont,
                        )}
                      >
                        {userEducation?.start_date} - {userEducation?.end_date}
                      </p>
                      <p
                        className={clsx(
                          "text-sm italic font-black",
                          props?.bodyFont || props?.resume?.bodyFont,
                        )}
                      >
                        {userEducation?.program}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}

          {props?.showCustomSectionTwo && (
            <div className="flex flex-row pb-3">
              <div className="flex flex-col">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.headingFont || props?.resume?.headingFont,
                  )}
                >
                  {props?.resume?.customSectionTwoName}
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
                            props?.headingFont || props?.resume?.headingFont,
                          )}
                        >
                          {userCertification?.name}
                        </p>
                        <p
                          className={clsx(
                            "text-sm",
                            props?.bodyFont || props?.resume?.bodyFont,
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
          )}
        </div>
        <div className="flex flex-col w-3/4">
          <div className="flex flex-row">
            <h2
              className={clsx(
                "font-bold",
                props?.headingFont || props?.resume?.headingFont,
              )}
            >
              WORK EXPERIENCE
            </h2>
          </div>
          <div
            className={clsx(
              props?.color || props?.resume?.color,
              "w-full h-[3px]",
            )}
          />
          <ul className="pb-2">
            {props?.workResumeLines?.map(
              (userWorkExperience: UserWorkExperience) => (
                <li className="pt-1" key={userWorkExperience?.id}>
                  <h3
                    className={clsx(
                      "font-bold",
                      props?.headingFont || props?.resume?.headingFont,
                    )}
                  >
                    {userWorkExperience?.job_title}
                  </h3>
                  <p
                    className={clsx(
                      "text-[0.85rem] font-lite",
                      props?.headingFont || props?.resume?.headingFont,
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
                            "h-[5px] w-[5px] rounded-full",
                            props?.color || props?.resume?.color,
                          )}
                        />
                      </div>
                      <div className="flex flex-col w-auto text-left">
                        <p
                          className={clsx(
                            "text-sm",
                            props?.bodyFont || props?.resume?.bodyFont,
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
                            props?.bodyFont || props?.resume?.bodyFont,
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
                            props?.bodyFont || props?.resume?.bodyFont,
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
                            props?.bodyFont || props?.resume?.bodyFont,
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

          {props?.showCustomSectionOne && (
            <>
              <div className="flex flex-row">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.headingFont || props?.resume?.headingFont,
                  )}
                >
                  {props?.resume?.customSectionOneName}
                </h2>
              </div>
              <div
                className={clsx(
                  props?.color || props?.resume?.color,
                  " w-full h-[3px]",
                )}
              />
              <ul className="px-3">
                {props?.organizationResumeLines?.map(
                  (userOrganization: UserOrganization) => (
                    <li className="list-disc py-2" key={userOrganization?.id}>
                      <p
                        className={clsx(
                          "font-bold",
                          props?.headingFont || props?.resume?.headingFont,
                        )}
                      >
                        {userOrganization?.name}
                      </p>
                      <p
                        className={clsx(
                          "text-sm",
                          props?.bodyFont || props?.resume?.bodyFont,
                        )}
                      >
                        {userOrganization?.location}
                      </p>
                    </li>
                  ),
                )}
              </ul>
            </>
          )}

          {props?.showProjects && (
            <>
              <div className="flex flex-row">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.headingFont || props?.resume?.headingFont,
                  )}
                >
                  PROJECTS
                </h2>
              </div>
              <div
                className={clsx(
                  props?.color || props?.resume?.color,
                  "w-full h-[3px]",
                )}
              />
              <ul className="px-3">
                {props?.userProjects?.map((project: any) => (
                  <li className="list-disc py-2" key={project?.id}>
                    <p
                      className={clsx(
                        "font-bold",
                        props?.headingFont || props?.resume?.headingFont,
                      )}
                    >
                      {project?.title}
                    </p>
                    <p
                      className={clsx(
                        "text-sm",
                        props?.bodyFont || props?.resume?.bodyFont,
                      )}
                    >
                      {project?.description}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}

          {props?.showLanguages && (
            <>
              <div className="flex flex-row">
                <h2
                  className={clsx(
                    "font-bold",
                    props?.headingFont || props?.resume?.headingFont,
                  )}
                >
                  LANGUAGES
                </h2>
              </div>
              <div
                className={clsx(
                  props?.color || props?.resume?.color,
                  "w-full h-[3px]",
                )}
              />
              <ul className="px-3">
                {props?.userLanguages?.map((language: any) => (
                  <li className="list-disc py-2" key={language?.id}>
                    <p
                      className={clsx(
                        "font-bold",
                        props?.headingFont || props?.resume?.headingFont,
                      )}
                    >
                      {language?.name}
                    </p>
                    <p
                      className={clsx(
                        "text-sm",
                        props?.bodyFont || props?.resume?.bodyFont,
                      )}
                    >
                      {language?.proficiency}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Page>
  );
}
