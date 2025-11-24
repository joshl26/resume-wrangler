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
  Resume,
  UserWorkExperience,
  UserSkill,
  UserEducationExperience,
  UserCertification,
  UserOrganization,
} from "@/app/lib/definitions";

interface Props {
  user: User;
  body_font?: string;
  heading_font?: string;
  color?: string;
  resume: Resume;
  userWorkExperiences: UserWorkExperience[];
  userSkills: UserSkill[];
  userEducation: UserEducationExperience[];
  userCertifications: UserCertification[];
  userOrganizations: UserOrganization[];
  highlightColor?: string;
  show_social_icons?: boolean;
  show_skills_section?: boolean;
  show_skill_progress?: boolean;
  show_education_section?: boolean;
  show_custom_section_one?: boolean;
  show_custom_section_two?: boolean;
  educationResumeLines: UserEducationExperience[];
  workResumeLines: UserWorkExperience[];
  skillResumeLines: UserSkill[];
  organizationResumeLines: UserOrganization[];
  certificationResumeLines: UserCertification[];
}
// Helper to convert string "true" to boolean true
const isEnabled = (value?: string): boolean => value === "true";

const SOCIAL_MEDIA = [
  {
    key: "linked_in",
    icon: faLinkedin,
    label: "LinkedIn",
    url: (handle: string) => `https://linkedin.com/in/${handle}`,
  },
  {
    key: "facebook",
    icon: faSquareFacebook,
    label: "Facebook",
    url: (handle: string) => `https://facebook.com/${handle}`,
  },
  {
    key: "instagram",
    icon: faSquareInstagram,
    label: "Instagram",
    url: (handle: string) => `https://instagram.com/${handle}`,
  },
  {
    key: "twitter",
    icon: faSquareTwitter,
    label: "Twitter",
    url: (handle: string) => `https://twitter.com/${handle}`,
  },
  {
    key: "github",
    icon: faSquareGithub,
    label: "Github",
    url: (handle: string) => `https://github.com/${handle}`,
  },
] as const;

export default function ThreeDAnimator(props: Props) {
  const {
    user,
    resume,
    body_font,
    heading_font,
    color,
    highlightColor,
    show_social_icons,
    show_skills_section,
    show_skill_progress,
    show_education_section,
    show_custom_section_one,
    show_custom_section_two,
    educationResumeLines = [],
    workResumeLines = [],
    skillResumeLines = [],
    organizationResumeLines = [],
    certificationResumeLines = [],
  } = props;

  const effectiveBodyFont = body_font || resume?.body_font;
  const effectiveHeadingFont = heading_font || resume?.heading_font;
  const effectiveColor = color || resume?.color;
  const effectiveHighlightColor = highlightColor || resume?.highlight_color;

  const showSocialIcons =
    show_social_icons ?? resume?.show_social_icons ?? false;
  const showSkillsSection =
    show_skills_section ?? resume?.show_skills_section ?? false;
  const showSkillProgress =
    show_skill_progress ?? resume?.show_skill_progress ?? false;
  const showEducationSection =
    show_education_section ?? resume?.show_education_section ?? false;
  const showCustomSectionOne =
    show_custom_section_one ?? resume?.show_custom_section_one ?? false;
  const showCustomSectionTwo =
    show_custom_section_two ?? resume?.show_custom_section_two ?? false;

  const hasWorkExperience = workResumeLines.length > 0;
  const hasSkills = skillResumeLines.length > 0;
  const hasEducation = educationResumeLines.length > 0;
  const hasCertifications = certificationResumeLines.length > 0;
  const hasOrganizations = organizationResumeLines.length > 0;

  const PlaceholderText = ({ section }: { section: string }) => (
    <div className="py-4 px-4 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
      <p className={clsx("text-sm text-gray-500 italic", effectiveBodyFont)}>
        No {section} added yet. Add your {section.toLowerCase()} to complete
        your resume.
      </p>
    </div>
  );

  const SectionDivider = () => (
    <div className={clsx(effectiveColor, "w-full h-0.5")} />
  );

  const ContactItem = ({
    icon: Icon,
    href,
    children,
  }: {
    icon: any;
    href: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-row">
      <div className="flex flex-col w-[30px]">
        <Icon className="w-[18px] m-auto" />
      </div>
      <div className="flex flex-col w-auto flex-1">
        <a
          href={href}
          className={clsx(effectiveBodyFont, "text-sm py-1 pl-1 truncate")}
        >
          {children}
        </a>
      </div>
    </div>
  );

  const SocialMediaLink = ({
    iconComponent,
    label,
    url,
  }: {
    iconComponent: any;
    label: string;
    url: string;
  }) => (
    <div className="flex flex-row">
      <div className="flex flex-col w-[30px]">
        <FontAwesomeIcon icon={iconComponent} className="w-[18px] m-auto" />
      </div>
      <div className="flex flex-col flex-1">
        <a href={url} className={clsx(effectiveBodyFont, "text-sm py-1")}>
          {label}
        </a>
      </div>
    </div>
  );

  const WorkExperienceItem = ({
    experience,
  }: {
    experience: UserWorkExperience;
  }) => (
    <li className="py-2">
      <h2 className={clsx("font-bold", effectiveHeadingFont)}>
        {experience.job_title}
      </h2>
      <p className={clsx("text-[0.85rem] font-light", effectiveHeadingFont)}>
        {experience.company_name} - {experience.location} (
        {experience.start_date} - {experience.end_date})
      </p>
      {[
        experience.description_one,
        experience.description_two,
        experience.description_three,
        experience.description_four,
      ].map((description, index) =>
        description ? (
          <div key={index} className="flex flex-row justify-start">
            <div className="flex flex-col pr-3 pt-2.5">
              <div
                className={clsx("h-[5px] w-[5px] rounded-full", effectiveColor)}
              />
            </div>
            <div className="flex flex-col flex-1">
              <p className={clsx("text-sm", effectiveBodyFont)}>
                {description}
              </p>
            </div>
          </div>
        ) : null,
      )}
    </li>
  );

  return (
    <Page>
      {/* Header Section */}
      <div className="flex flex-row m-auto gap-6">
        <div className="flex flex-col w-1/4">
          <Image
            className="rounded-full"
            alt={`${user.first_name} ${user.last_name}`}
            width={350}
            height={350}
            src={user.thumbnail}
            priority
          />
        </div>
        <div className="flex flex-col w-3/4">
          <h1
            style={{
              textAlign: "left",
              textTransform: "uppercase",
              fontSize: "50px",
              lineHeight: "1",
              fontWeight: "bold",
            }}
            className={clsx("pb-3", effectiveHeadingFont)}
          >
            {user.first_name} {user.last_name}
          </h1>
          <p className={clsx("text-[1rem]", effectiveBodyFont)}>
            {resume?.description || (
              <span className="text-gray-400 italic">
                Add a professional summary to introduce yourself to potential
                employers...
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-row pt-3 gap-8">
        {/* Left Sidebar */}
        <div className="flex flex-col w-1/4">
          {/* Profile Section */}
          <div className="flex flex-col pb-4">
            <h2 className={clsx("font-bold", effectiveHeadingFont)}>PROFILE</h2>
            <SectionDivider />

            <div className="pt-2 space-y-1">
              {user?.address_one ? (
                <ContactItem
                  icon={MapPinIcon}
                  href={`https://www.google.com/search?q=${user.address_one}`}
                >
                  {user.address_one}
                </ContactItem>
              ) : (
                <div className="text-sm text-gray-400 italic py-1">
                  Add your address
                </div>
              )}

              {user?.phone ? (
                <ContactItem icon={PhoneIcon} href={`tel:${user.phone}`}>
                  {user.phone}
                </ContactItem>
              ) : (
                <div className="text-sm text-gray-400 italic py-1">
                  Add your phone number
                </div>
              )}

              {user?.email ? (
                <ContactItem icon={EnvelopeIcon} href={`mailto:${user.email}`}>
                  {user.email}
                </ContactItem>
              ) : (
                <div className="text-sm text-gray-400 italic py-1">
                  Add your email address
                </div>
              )}
            </div>

            {/* Social Media Links */}
            {showSocialIcons && (
              <div className="mt-2 space-y-1">
                {SOCIAL_MEDIA.map(({ key, icon, label, url }) => {
                  const handle = user[key as keyof User] as string;
                  return handle ? (
                    <SocialMediaLink
                      key={key}
                      iconComponent={icon}
                      label={label}
                      url={url(handle)}
                    />
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Skills Section */}
          {showSkillsSection && (
            <div className="flex flex-col pb-4">
              <h2 className={clsx("font-bold", effectiveHeadingFont)}>
                SKILLS
              </h2>
              <SectionDivider />

              {hasSkills ? (
                showSkillProgress ? (
                  <div className="pt-3 space-y-2">
                    {skillResumeLines.map((skill) => (
                      <div key={skill.id}>
                        <p
                          className={clsx(
                            "text-[0.75rem] font-bold mb-1",
                            effectiveBodyFont,
                          )}
                        >
                          {skill.skill}
                        </p>
                        <div className="rounded-full h-2.5 border border-black overflow-hidden">
                          <div
                            className={clsx(
                              "h-full rounded-2xl transition-all",
                              effectiveColor,
                            )}
                            style={{ width: `${skill.skill_level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="pt-3 flex flex-row flex-wrap gap-2">
                    {skillResumeLines.map((skill) => (
                      <li
                        key={skill.id}
                        className="px-2 py-1 rounded border border-gray-300 bg-gray-50"
                      >
                        <p
                          className={clsx(
                            "text-[0.75rem] font-bold",
                            effectiveBodyFont,
                          )}
                        >
                          {skill.skill}
                        </p>
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <div className="pt-3">
                  <PlaceholderText section="Skills" />
                </div>
              )}
            </div>
          )}

          {/* Education Section */}
          {showEducationSection && (
            <div className="flex flex-col pb-4">
              <h2 className={clsx("font-bold", effectiveHeadingFont)}>
                EDUCATION
              </h2>
              <SectionDivider />
              {hasEducation ? (
                <ul className="pt-3 space-y-3">
                  {educationResumeLines.map((education) => (
                    <li key={education.id}>
                      <h3
                        className={clsx(
                          "font-bold text-sm",
                          effectiveHeadingFont,
                        )}
                      >
                        {education.institution_name}
                      </h3>
                      <p className={clsx("text-sm", effectiveBodyFont)}>
                        {education.location}
                      </p>
                      <p className={clsx("text-sm", effectiveBodyFont)}>
                        {education.start_date} - {education.end_date}
                      </p>
                      <p
                        className={clsx(
                          "text-sm italic font-bold",
                          effectiveBodyFont,
                        )}
                      >
                        {education.program}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pt-3">
                  <PlaceholderText section="Education" />
                </div>
              )}
            </div>
          )}

          {/* Custom Section Two (Certifications) */}
          {showCustomSectionTwo && (
            <div className="flex flex-col pb-4">
              <h2 className={clsx("font-bold", effectiveHeadingFont)}>
                {resume?.custom_section_two_name || "Certifications"}
              </h2>
              <SectionDivider />
              {hasCertifications ? (
                <ul className="pt-3 space-y-2">
                  {certificationResumeLines.map((cert) => (
                    <li key={cert.id}>
                      <p
                        className={clsx(
                          "text-sm font-medium",
                          effectiveHeadingFont,
                        )}
                      >
                        {cert.name}
                      </p>
                      <p className={clsx("text-sm", effectiveBodyFont)}>
                        {cert.location}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pt-3">
                  <PlaceholderText section="Certifications" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Main Content */}
        <div className="flex flex-col w-3/4">
          {/* Work Experience Section */}
          <div className="flex flex-col pb-4">
            <h2 className={clsx("font-bold", effectiveHeadingFont)}>
              WORK EXPERIENCE
            </h2>
            <SectionDivider />
            {hasWorkExperience ? (
              <ul className="pt-2">
                {workResumeLines.map((experience) => (
                  <WorkExperienceItem
                    key={experience.id}
                    experience={experience}
                  />
                ))}
              </ul>
            ) : (
              <div className="pt-3">
                <PlaceholderText section="Work Experience" />
              </div>
            )}
          </div>

          {/* Custom Section One (Organizations) */}
          {showCustomSectionOne && (
            <div className="flex flex-col">
              <h2 className={clsx("font-bold", effectiveHeadingFont)}>
                {resume?.custom_section_one_name || "Organizations"}
              </h2>
              <SectionDivider />
              {hasOrganizations ? (
                <ul className="px-3 py-2 space-y-2">
                  {organizationResumeLines.map((org) => (
                    <li key={org.id} className="list-disc">
                      <p className={clsx("font-bold", effectiveHeadingFont)}>
                        {org.name}
                      </p>
                      <p className={clsx("text-sm", effectiveBodyFont)}>
                        {org.location}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="pt-3">
                  <PlaceholderText section="Organizations" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
}
