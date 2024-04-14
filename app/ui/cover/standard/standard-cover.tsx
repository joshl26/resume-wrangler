import Page from "../page";
import {
  Application,
  Company,
  CoverLetter,
  User,
  UserCoverExperienceLine,
  UserCoverExperienceLines,
  UserCoverExperiences,
} from "@/app/lib/definitions";

export default async function StandardCover({
  coverLetter,
  user,
  company,
  application,
  selectedCoverExperiences,
  userCoverExperiences,
}: {
  user: User;
  coverLetter: CoverLetter;
  company: Company;
  application: Application;
  selectedCoverExperiences: UserCoverExperienceLines;
  userCoverExperiences: any;
}) {
  console.log(selectedCoverExperiences);
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
      <div className="flex flex-row text-4xl py-6 font-lite justify-center">
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
        <div className="flex flex-row pt-8 mb-1">
          <div className="flex flex-col">
            <p className="font-bold">{coverLetter?.recipient_title},</p>
          </div>
        </div>
        <div className="mt-8 inline">
          <p className="leading-2 inline">{coverLetter?.intro_text_start} </p>
          <p className="leading-2 inline font-bold">
            {application?.job_position}.{" "}
          </p>
          <p className="leading-2 inline">{coverLetter?.intro_text_end}</p>
          <p className="leading-2 inline"> {coverLetter?.intro_experience}</p>
        </div>
        <ul className="pt-2">
          {selectedCoverExperiences?.map(
            (coverExperience: UserCoverExperienceLine) => (
              <li key={coverExperience?.id} className="py-[0.125rem]">
                <p className="inline font-bold">
                  {
                    userCoverExperiences?.filter(
                      (userCoverExperience) =>
                        userCoverExperience?.id ===
                        coverExperience?.cover_experience_id
                    )[0]?.title
                  }{" "}
                </p>
                <p className="inline"> - </p>
                <p className="inline leading-2">
                  {
                    userCoverExperiences?.filter(
                      (userCoverExperience) =>
                        userCoverExperience?.id ===
                        coverExperience?.cover_experience_id
                    )[0]?.description
                  }
                </p>
              </li>
            )
          )}
        </ul>
        <div className="flex flex-row pt-4">
          <p>{coverLetter?.conclusion_text}</p>
        </div>
      </div>
      <div className="flex flex-row pt-6">
        <p>{coverLetter?.salutation_text},</p>
      </div>
      <div className="flex flex-row pt-5">
        <h2 className="text-4xl">
          {user?.first_name} {user?.last_name}
        </h2>
      </div>
    </Page>
  );
}
