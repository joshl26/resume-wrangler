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
  userOrganizations,
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

export default async function StandardCover(props: Props) {
  return (
    <Page>
      {/* <div className="flex flex-row w-full">
        <div className="flex w-1/4 mx-auto rounded justify-around pb-6 pr-6">
          <Image
            className="flex rounded-lg mx-auto w-full"
            alt={props?.user?.thumbnail}
            width={350}
            height={350}
            src={props?.user?.thumbnail}
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
      <div
        className={clsx(
          props?.color || props?.resume?.color,
          " w-full h-[3px]"
        )}
      ></div> */}
    </Page>
  );
}
