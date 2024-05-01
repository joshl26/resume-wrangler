import { createCoverLine, deleteCoverLine } from "@/app/lib/actions";
import { useState } from "react";
import { SubmitButton } from "../submit-button";
import {
  CoverLetter,
  User,
  UserCoverExperience,
  UserCoverExperienceLines,
  UserCoverExperiences,
} from "@/app/lib/definitions";

export default function YourCoverLetterExperiences({
  userCoverExperiences,
  user,
  selectedCoverExperiences,
  coverLetter,
}: {
  userCoverExperiences: UserCoverExperiences;
  user: User;
  selectedCoverExperiences: UserCoverExperienceLines;
  coverLetter: CoverLetter;
}) {
  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div className="pt-4">
      <div className="py-2 font-bold text-xl">
        <h2>Your Cover Experiences</h2>
      </div>
      <div className="your-work-experiences form-amber rounded px-4 pt-1 pb-2">
        <div className="pb-2">
          <h3 className="font-medium py-1">Choose Experience from the list:</h3>
          <div className="h-[300px] rounded overflow-y-auto tight-shadow bg-white">
            <ul className="">
              {userCoverExperiences?.map((experience: UserCoverExperience) => (
                <li key={experience?.id} className="border p-2 ">
                  <div className="flex flex-row h-[50px]">
                    <div className="flex flex-col w-3/4 m-auto">
                      <h2 className="font-bold">{experience?.title}</h2>
                    </div>
                    <div className="flex flex-col pr-6 m-auto">
                      <form action={createCoverLine}>
                        <input
                          hidden
                          readOnly
                          name="user_id"
                          value={user?.id}
                        />
                        <input
                          hidden
                          readOnly
                          name="line_type"
                          value={"experience"}
                        />
                        <input
                          hidden
                          readOnly
                          name="cover_letter_id"
                          value={coverLetter?.id}
                        />
                        <input
                          hidden
                          readOnly
                          name="experience_id"
                          value={experience?.id}
                        />
                        <SubmitButton
                          className={
                            "hover:text-azure-radiance-600 hover:underline"
                          }
                        >
                          Add
                        </SubmitButton>
                      </form>
                      <form action={deleteCoverLine}>
                        <input
                          hidden
                          readOnly
                          name="user_id"
                          value={user?.id}
                        />
                        <input
                          hidden
                          readOnly
                          name="line_type"
                          value={"experience"}
                        />
                        <input
                          hidden
                          readOnly
                          name="cover_letter_id"
                          value={coverLetter?.id}
                        />
                        <input
                          hidden
                          readOnly
                          name="experience_id"
                          value={experience?.id}
                        />
                        <SubmitButton
                          className={"hover:text-rose-500 hover:underline"}
                        >
                          Remove
                        </SubmitButton>
                      </form>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
