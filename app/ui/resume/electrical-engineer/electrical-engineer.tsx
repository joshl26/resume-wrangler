import Page from "../page";
import { User } from "../../../data/user-details";
import { resumeSkills } from "../../../data/resume-skills";
import { resumeExperiences } from "../../../data/resume-experiences";
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
} from "@fortawesome/free-brands-svg-icons";

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
}

const ElectricalEngineer = (props: Props) => {
  return (
    <>
      <Page>
        <div className="flex flex-row">
          <div className="flex flex-col w-[600px] rounded">
            <Image
              className="rounded-lg"
              alt={props.user.thumbnail}
              width={150}
              height={150}
              src={props.user.thumbnail}
            />
          </div>
          <div className="flex flex-col w-auto">
            <h1
              style={{
                textAlign: "left",
                textTransform: "uppercase",
                fontSize: "50px",
                lineHeight: "1.3",
                fontWeight: "bold",
              }}
              className={props.headingFont}
            >
              {props.user.first_name} {props.user.last_name}
            </h1>
            <p className={clsx("text-lg", props.bodyFont)}>
              {props.resume.description}
            </p>
          </div>
        </div>
        <div
          className={clsx(
            props.resumeColor,
            "border-gray-500 border-b-[1px] mt-4 w-full h-[3px]"
          )}
        ></div>
        <div className="flex flex-row pt-6">
          <div className="flex flex-col w-3/4">
            <div className="flex flex-row">
              <h2 className={props.headingFont}>WORK EXPERIENCE</h2>
            </div>
            <div className="flex flex-row"></div>{" "}
            <ul className="px-3 py-2">
              {props.userWorkExperiences.map((userWorkExperience: any) => (
                <li className="list-disc py-2" key={userWorkExperience.id}>
                  <h2 className="font-bold">{userWorkExperience.job_title}</h2>
                  <p>
                    {userWorkExperience.location}{" "}
                    {userWorkExperience.start_date} -{" "}
                    {userWorkExperience.end_date}
                  </p>
                  {userWorkExperience?.description_one && (
                    <p className=" text-sm">
                      {userWorkExperience.description_one}
                    </p>
                  )}
                  {userWorkExperience?.description_two && (
                    <p className=" text-sm">
                      {userWorkExperience?.description_two}
                    </p>
                  )}
                  {userWorkExperience?.description_three && (
                    <p className=" text-sm">
                      {userWorkExperience?.description_three}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col w-1/4">
            <div className="flex flex-col pb-3">
              <h2 className={props.headingFont}>PROFILE</h2>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px]">
                  <MapPinIcon className="w-[20px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  {props.user.address_one}
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <PhoneIcon className="w-[18px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">{props.user.phone}</div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <EnvelopeIcon className="w-[18px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">{props.user.email}</div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <FontAwesomeIcon
                    icon={faSquareFacebook}
                    className="w-[18px] m-auto"
                  />
                </div>
                <div className="flex flex-col w-3/4">{props.user.facebook}</div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="w-[18px] m-auto"
                  />
                </div>
                <div className="flex flex-col w-3/4">
                  {props.user.linked_in}
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-3">
              <ul>
                <h2 className={props.headingFont}>SKILLS</h2>
                {props.userSkills.map((userSkill: any) => (
                  <li className="flex flex-col" key={userSkill.id}>
                    <p>{userSkill.skill}</p>
                    <input
                      readOnly
                      value={userSkill.skill_level}
                      type="range"
                    />
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row pb-3">
              <ul>
                <h2 className={props.headingFont}>EDUCATION</h2>
                {props.userEducation.map((userEducation: any) => (
                  <li className="flex flex-col py-3" key={userEducation.id}>
                    <h2 className="font-bold">
                      {userEducation.institution_name}
                    </h2>
                    <p>{userEducation.location}</p>
                    <p>
                      {userEducation.start_date} - {userEducation.end_date}
                    </p>
                    <p>{userEducation.program}</p>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div className="flex flex-row pb-3">
              <h2 className={props.headingFont}>EDUCATION</h2>
            </div> */}
            <div className="flex flex-row pb-3">
              <ul>
                <h2 className={props.headingFont}>CERTIFICATION</h2>
                {props.userCertifications.map((userCertification: any) => (
                  <li className="flex flex-col" key={userCertification.id}>
                    <p>{userCertification.name}</p>
                    <p>{userCertification.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Page>
      {/* <Page></Page> */}
    </>
  );
};

export default ElectricalEngineer;
