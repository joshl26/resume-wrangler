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
  Application,
  Company,
  CoverLetter,
  User,
  UserCertification,
  UserEducationExperience,
  UserOrganization,
  UserSkill,
  UserWorkExperience,
  userOrganizations,
} from "@/app/lib/definitions";

export default async function StandardCover({
  coverLetter,
  user,
  company,
  application,
}: {
  user: User;
  coverLetter: CoverLetter;
  company: Company;
  application: Application;
}) {
  console.log(coverLetter);

  return (
    <Page>
      <div className="flex flex-row w-full ">
        <h1 className="m-auto text-6xl font-bold">
          {user?.first_name} {user?.last_name}
        </h1>
      </div>
      <div className="flex flex-row justify-center text-[0.85rem] ">
        <div className="flex">
          <a href={`https://www.google.com/search?q=${user?.address_one}`}>
            {user?.address_one}
          </a>
        </div>
        <div className="flex px-2"> | </div>
        <div className="flex">
          <a href="tel:905-990-1035">{user?.phone}</a>
        </div>
        <div className="flex px-2"> | </div>
        <div className="flex">
          <a href={`mailto:${user?.email}`}>{user?.email}</a>
        </div>
        <div className="flex px-2"> | </div>
        <div className="flex">
          <a href={`https://linkedin.com/${user?.linked_in}`}>
            {`linkedin.com/${user?.linked_in}`}
          </a>
        </div>
        <div className="flex px-2"> | </div>
        <div className="flex">
          <a href={user?.website}>{user?.website}</a>
        </div>
      </div>
      <div className="flex flex-row text-4xl pt-4 font-lite justify-center">
        <h2>Cover Letter</h2>
      </div>
      <div className="text-sm">
        <div className="flex flex-row pt-6">
          <div className="flex flex-col">
            <p>{company?.name}</p>
            <p>{company?.address_one}</p>
            <p>{company?.address_two}</p>
          </div>
        </div>
        <div className="flex flex-row pt-6 mb-1">
          <div className="flex flex-col">
            <p className="font-bold">{coverLetter?.recipient_title},</p>
          </div>
        </div>
        <div className="mt-4 inline">
          <p className="leading-2 inline">{coverLetter?.intro_text_start} </p>
          <p className="leading-2 inline font-bold">
            {application?.job_position}.{" "}
          </p>
          <p className="leading-2 inline">{coverLetter?.intro_text_end}</p>
        </div>
        <ul className="pt-2">
          <li className="py-[0.125rem]">
            <p className="inline font-bold">Express/MongoDB/Node.js</p>
            <p className="inline"> - </p>
            <p className="inline leading-2">
              I have a strong appreciation for using Express, MongoDB, and
              Node.js for web development due to their seamless integration and
              robust capabilities. The combination of Expresses minimal and
              flexible framework, MongoDB NoSQL database for easy and efficient
              data storage, and Node.js efficient server-side programming
              language allows for efficient and scalable development.
              Additionally, these technologies are well-supported and constantly
              updated, offering a reliable and constantly evolving foundation
              for web applications.
            </p>
          </li>
          <li className="py-[0.125rem]">
            <p className="inline font-bold">TypeScript</p>
            <p className="inline"> - </p>
            <p className="inline leading-2">
              Typescript is an incredibly useful tool for web development. Its
              strong typing system helps me organize my code better and prevents
              errors, making my development process smoother and more efficient.
              Furthermore, Typescript supports modern JavaScript features and
              works well with popular web frameworks.
            </p>
          </li>
          <li className="py-[0.125rem]">
            <p className="inline font-bold">React</p>
            <p className="inline"> - </p>
            <p className="inline leading-2">
              As a developer, my experience with ReactJS has been both
              challenging and rewarding. I have found working with the library
              to be efficient and intuitive, but it does require a strong
              understanding of JavaScript fundamentals which I have strong
              background in.
            </p>
          </li>
          <li className="py-[0.125rem]">
            <p className="inline font-bold">NextJS</p>
            <p className="inline"> - </p>
            <p className="inline leading-2">
              I highly enjoy using NextJS for web development due to its
              streamlined and efficient framework. The built-in server-side
              rendering and automatic code splitting allow for faster loading
              times and better performance. Additionally, the ease of creating
              dynamic and interactive user interfaces using React components and
              the support for serverless functions make it a powerful tool for
              building modern, scalable web applications. NextJS intuitive
              file-based routing system and built-in CSS and Sass support also
              contribute to a more organized and cohesive development
              experience.
            </p>
          </li>
          <li className="py-[0.125rem]">
            <p className="inline font-bold">Amazon Web Services (AWS)</p>
            <p className="inline"> - </p>
            <p className="inline leading-2">
              am a proficient user of AWS for web development due to its
              extensive range of services and features that allow for efficient
              and reliable creation, deployment, and management of web
              applications. The scalability and flexibility of the platform
              provide cost-effective solutions for businesses of any size.
            </p>
          </li>
        </ul>
        <div className="flex flex-row pt-4">
          <p>
            In addition to the skills mentioned above, I have a solid
            educational foundation which includes a Bachelor’s Degree in
            Engineering Technology from McMaster University and an Advanced
            Diploma in Engineering Technology from Mohawk College.
          </p>
        </div>
      </div>
      <div className="flex flex-row pt-6">
        <p>Regards,</p>
      </div>
      <div className="flex flex-row pt-5">
        <h2 className="text-4xl">Josh Lehman</h2>
      </div>
    </Page>
  );
}
