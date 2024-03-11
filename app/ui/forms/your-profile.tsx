import Image from "next/image";

export default function YourProfile({ user }: { user: any }) {
  return (
    <div>
      <div className="your-profile">
        <div className="py-2 font-bold text-xl">
          <h2>Your Profile</h2>
        </div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <div className="flex flex-row justify-between w-auto"></div>
          <div className="flex flex-col py-1">
            <label className="py-1" htmlFor="resume-template">
              Profile Image
            </label>
            <Image alt="" height={100} width={100} src={user.thumbnail} />
            <button
              className="rounded bg-amber-300 h-10 border border-black"
              // value={resumeStyling.resumeTemplate}
              // onChange={(e) => resumeTemplateAction(e)}
              name="resume-template"
              id="resume-template"
            >
              {/* //TODO add image picker!! */}
              Add Image
            </button>
          </div>

          <div style={{ height: "0.5rem" }}></div>
        </div>
        <div className="py-2"></div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <div className="flex flex-row justify-between w-auto">
            <div className="flex flex-col w-1/2 py-1 px-1">
              <label className="py-1" htmlFor="first_name">
                First Name
              </label>
              <input
                id="first_name"
                name="first_name"
                className="rounded bg-slate-200"
                value={user.first_name}
                onChange={(e) => {}}
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
                value={user.last_name}
                onChange={(e) => {}}
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
                value={user.address_one}
                onChange={(e) => {}}
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
                value={user.address_two}
                onChange={(e) => {}}
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
                value={user.address_three}
                onChange={(e) => {}}
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
                value={user.country}
                onChange={(e) => {}}
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
                value={user.phone}
                onChange={(e) => {}}
                placeholder="City, Prov/State"
              ></input>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1 px-1">
              <label className="py-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                className="rounded bg-slate-200"
                value={user.email}
                onChange={(e) => {}}
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
                className="rounded bg-slate-200"
                value={user.website}
                onChange={(e) => {}}
                placeholder="http://www.website.com"
              ></input>
            </div>
          </div>
          <div style={{ height: "0.5rem" }}></div>
        </div>
      </div>
    </div>
  );
}
