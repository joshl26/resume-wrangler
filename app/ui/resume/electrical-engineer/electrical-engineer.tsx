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
                  <p className={clsx("", props.bodyFont)}>
                    {userWorkExperience.location}{" "}
                    {userWorkExperience.start_date} -{" "}
                    {userWorkExperience.end_date}
                  </p>
                  {userWorkExperience?.description_one && (
                    <p className={clsx("text-sm", props.bodyFont)}>
                      {userWorkExperience.description_one}
                    </p>
                  )}
                  {userWorkExperience?.description_two && (
                    <p className={clsx("text-sm", props.bodyFont)}>
                      {userWorkExperience?.description_two}
                    </p>
                  )}
                  {userWorkExperience?.description_three && (
                    <p className={clsx("text-sm", props.bodyFont)}>
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
              <div className="flex flex-row pt-4">
                <div className="flex flex-col w-[30px]">
                  <MapPinIcon className="w-[20px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", props.bodyFont)}>
                    {props.user.address_one}
                  </p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <PhoneIcon className="w-[18px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", props.bodyFont)}>{props.user.phone}</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <EnvelopeIcon className="w-[18px] m-auto" />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", props.bodyFont)}>{props.user.email}</p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <FontAwesomeIcon
                    icon={faSquareFacebook}
                    className="w-[18px] m-auto"
                  />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", props.bodyFont)}>
                    {props.user.facebook}
                  </p>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-col w-[30px] ">
                  <FontAwesomeIcon
                    icon={faLinkedin}
                    className="w-[18px] m-auto"
                  />
                </div>
                <div className="flex flex-col w-3/4">
                  <p className={clsx("", props.bodyFont)}>
                    {props.user.linked_in}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col pb-3 pt-2">
              <h2 className={props.headingFont}>SKILLS</h2>
              <ul className="pt-2">
                {props.userSkills.map((userSkill: any) => (
                  <li className="flex flex-col py-[3px]" key={userSkill.id}>
                    <p className={clsx("text-sm", props.headingFont)}>
                      {userSkill.skill}
                    </p>
                    <div className="progress-container ">
                      <div
                        className="rounded-[1rem]"
                        style={{ border: "1px solid black", height: "1rem" }}
                      >
                        <div
                          className={clsx(
                            "progress-bar rounded-[1rem]",
                            props.resumeColor
                          )}
                          style={{
                            width: `${userSkill.skill_level}%`,
                            backgroundColor: `${props.resumeColor}`,
                            height: "100%",
                          }}
                        ></div>
                      </div>
                    </div>
                    {/* <progress
                      // className={props.resumeColor}
                      style={{ backgroundColor: "red" }}
                      color={"red"}
                      value={userSkill.skill_level / 100}
                    /> */}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-row pb-3 pt-2">
              <ul>
                <h2 className={props.headingFont}>EDUCATION</h2>
                {props.userEducation.map((userEducation: any) => (
                  <li className="flex flex-col pt-2" key={userEducation.id}>
                    <h2 className={clsx("font-bold", props.headingFont)}>
                      {userEducation.institution_name}
                    </h2>
                    <p className={clsx("text-sm", props.bodyFont)}>
                      {userEducation.location}
                    </p>
                    <p className={clsx("text-sm", props.bodyFont)}>
                      {userEducation.start_date} - {userEducation.end_date}
                    </p>
                    <p
                      className={clsx(
                        "text-sm italic font-black",
                        props.headingFont
                      )}
                    >
                      {" "}
                      {userEducation.program}
                    </p>
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
