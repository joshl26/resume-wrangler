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

export default async function StandardCover() {
  return (
    <Page>
      <h1>TEST</h1>
    </Page>
  );
}
