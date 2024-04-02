import { updateUser } from "@/app/lib/actions";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submit-button";

export default function YourProfile({
  user,
  resume,
}: {
  user: any;
  resume: any;
}) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = (e: any) => {
    if (edited === false) {
      setEdited(true);
    }
  };

  return (
    <div>
      <div className="your-profile">
        <div className="py-2 font-bold text-xl">
          <h2>Your Profile</h2>
        </div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <form action={""}>
            <div className="flex flex-row justify-between w-auto"></div>
            <div className="flex flex-col py-1">
              <label className="py-1" htmlFor="resume-template">
                Profile Image
              </label>
              <Image
                className="m-auto py-4"
                alt=""
                height={250}
                width={250}
                src={user.thumbnail}
              />
              <button
                // type="submit"
                className="rounded bg-amber-300 h-10 border border-black"
                // value={resumeStyling.resumeTemplate}
                // onChange={(e) => resumeTemplateAction(e)}
                name="resume-template"
                id="resume-template"
              >
                {/* //TODO add image picker!! */}
                Update Image
              </button>
            </div>
            <div style={{ height: "0.5rem" }}></div>
          </form>
        </div>
        <div className="py-2"></div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <form onSubmit={() => setEdited(false)} action={dispatch}>
            <div className="flex flex-row justify-between w-auto">
              <div className="flex flex-col w-1/2 py-1 px-1">
                <label hidden htmlFor="resume_id" />
                <input
                  hidden
                  readOnly
                  value={resume.id}
                  id="resume_id"
                  name="resume_id"
                />
                <label hidden htmlFor="name" />
                <input
                  hidden
                  readOnly
                  value={user.name}
                  id="name"
                  name="name"
                />
                <label className="py-1" htmlFor="first_name">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  className="rounded bg-slate-200"
                  defaultValue={user.first_name}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="First Name"
                ></input>
              </div>
              <div className="flex flex-col w-1/2 py-1">
                <label className="py-1" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  className="rounded bg-slate-200"
                  defaultValue={user.last_name}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Last Name"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="address_one">
                  Address One
                </label>
                <input
                  id="address_one"
                  name="address_one"
                  className="rounded bg-slate-200"
                  defaultValue={user.address_one}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="City, Prov/State"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="address_two">
                  Address Two
                </label>
                <input
                  id="address_two"
                  name="address_two"
                  className="rounded bg-slate-200"
                  defaultValue={user.address_two}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Street Address"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="address_three">
                  Address Three
                </label>
                <input
                  id="address_three"
                  name="address_three"
                  className="rounded bg-slate-200"
                  defaultValue={user.address_three}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Apartment/Buzzer"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  className="rounded bg-slate-200"
                  defaultValue={user.country}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="Country"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  className="rounded bg-slate-200"
                  defaultValue={user.phone}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="City, Prov/State"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label hidden className="py-1" htmlFor="email">
                  Email
                </label>
                <input
                  hidden
                  readOnly
                  id="email"
                  name="email"
                  className="rounded bg-slate-200"
                  defaultValue={user.email}
                  placeholder="Email Address"
                ></input>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="website">
                  Website
                </label>
                <input
                  id="website"
                  name="website"
                  className="rounded bg-slate-200"
                  defaultValue={user.website}
                  onChange={(e) => onChangeHandler(e)}
                  placeholder="http://www.website.com"
                ></input>
              </div>
            </div>
            <div style={{ height: "0.5rem" }}></div>
            {edited && (
              <SubmitButton className={""}>
                <div className="bg-yellow-400 my-4 p-2 text-center w-auto animate-pulse">
                  Save Change
                </div>
              </SubmitButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
