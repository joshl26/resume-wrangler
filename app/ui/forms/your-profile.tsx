import { updateUser } from "@/app/lib/actions";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { SubmitButton } from "../submit-button";
import { Resume, User } from "@/app/lib/definitions";

export default function YourProfile({
  user,
  resume,
}: {
  user: User;
  resume: Resume;
}) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id!);
  const [state, dispatch] = useFormState(updateUserWithId, initialState);

  const [edited, setEdited] = useState(false);

  const onChangeHandler = () => {
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
        <div className="tight-shadow form-amber rounded px-5 py-2 ">
          <div>
            <div className="flex flex-row justify-between w-auto"></div>
            <div className="flex flex-col py-1">
              <h2 className="py-1">Profile Image</h2>
              <Image
                className="m-auto py-4"
                alt=""
                height={250}
                width={250}
                src={user?.thumbnail}
              />
              <a
                className="m-auto rounded btn btn-amber hover:animate-pulse"
                href="/dashboard/user-profile/"
              >
                Update Image
              </a>
            </div>
            <div style={{ height: "0.5rem" }}></div>
          </div>
        </div>
        <div className="py-2"></div>
        <div className="form-amber tight-shadow rounded px-5 py-2 ">
          <form
            className=""
            onSubmit={() => setEdited(false)}
            action={dispatch}
          >
            <div className="flex flex-row justify-between w-auto">
              <div className="flex flex-col w-1/2 py-1 px-1">
                <input
                  hidden
                  readOnly
                  value={resume?.id}
                  id="resume_id"
                  name="resume_id"
                />
                <input
                  hidden
                  readOnly
                  value={user?.name}
                  id="name"
                  name="name"
                />
                <label className="py-1" htmlFor="first_name">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  defaultValue={user?.first_name}
                  onChange={onChangeHandler}
                  placeholder="First Name"
                />
              </div>
              <div className="flex flex-col w-1/2 py-1">
                <label className="py-1" htmlFor="last_name">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  defaultValue={user?.last_name}
                  onChange={onChangeHandler}
                  placeholder="Last Name"
                />
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
                  defaultValue={user?.address_one}
                  onChange={onChangeHandler}
                  placeholder="City, Prov/State"
                />
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
                  defaultValue={user?.address_two}
                  onChange={onChangeHandler}
                  placeholder="Street Address"
                />
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
                  defaultValue={user?.address_three}
                  onChange={onChangeHandler}
                  placeholder="Apartment/Buzzer"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="country">
                  Country
                </label>
                <input
                  id="country"
                  defaultValue={user?.country}
                  onChange={onChangeHandler}
                  placeholder="Country"
                />
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
                  defaultValue={user?.phone}
                  onChange={onChangeHandler}
                  placeholder="City, Prov/State"
                />
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
                  defaultValue={user?.email}
                  placeholder="Email Address"
                />
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
                  defaultValue={user?.website}
                  onChange={onChangeHandler}
                  placeholder="http://www.your-site.com"
                />
              </div>
            </div>
            <div style={{ height: "0.5rem" }} />
            {edited && (
              <SubmitButton className="btn btn-amber my-4 p-2 text-center w-auto animate-pulse">
                Save Change
              </SubmitButton>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
