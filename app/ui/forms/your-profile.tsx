export default function YourProfile() {
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
              <label className="py-1" htmlFor="first-name">
                First Name
              </label>
              <input
                id="first-name"
                className="rounded bg-slate-200"
                //   value={resumeStyling.resumeTitle}
                //   onChange={(e) => resumeStylingOnChangeHandler(e)}
                placeholder="First Name"
              ></input>
            </div>
            <div className="flex flex-col w-1/2 py-1">
              <label className="py-1" htmlFor="last-name">
                Last Name
              </label>
              <input
                id="last-name"
                className="rounded bg-slate-200"
                //   value={resumeStyling.resumeTitle}
                //   onChange={(e) => resumeTitleAction(e)}
                placeholder="Last Name"
              ></input>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1 px-1">
              <label className="py-1" htmlFor="address-one">
                Address One
              </label>
              <input
                id="address-one"
                className="rounded bg-slate-200"
                //   value={resumeStyling.resumeTitle}
                //   onChange={(e) => resumeTitleAction(e)}
                placeholder="City, Prov/State"
              ></input>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1 px-1">
              <label className="py-1" htmlFor="address-two">
                Address Two
              </label>
              <input
                id="address-two"
                className="rounded bg-slate-200"
                //   value={resumeStyling.resumeTitle}
                //   onChange={(e) => resumeTitleAction(e)}
                placeholder="Street Address"
              ></input>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col py-1 px-1">
              <label className="py-1" htmlFor="address-three">
                Address Three
              </label>
              <input
                id="address-three"
                className="rounded bg-slate-200"
                //   value={resumeStyling.resumeTitle}
                //   onChange={(e) => resumeTitleAction(e)}
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
                //   value={resumeStyling.resumeTitle}
                //   onChange={(e) => resumeTitleAction(e)}
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
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
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
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
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
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="http://www.website.com"
              ></input>
            </div>
          </div>
          <div style={{ height: "0.5rem" }}></div>
        </div>
      </div>
      <div className="py-2"></div>
      <div className="your-profile">
        <div className="py-2 font-bold text-xl">
          <h2>Your Social Links</h2>
        </div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <div className="flex flex-row justify-between w-auto">
            <div className="flex flex-col w-1/2 py-1 px-1">
              <label className="py-1" htmlFor="linked-in">
                LinkedIn
              </label>
              <input
                id="linked-in"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="LinkedIn"
              ></input>
            </div>
            <div className="flex flex-col w-1/2 py-1">
              <label className="py-1" htmlFor="facebook">
                Facebook
              </label>
              <input
                id="facebook"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="Facebook"
              ></input>
            </div>
          </div>
          <div className="flex flex-row justify-between w-auto">
            <div className="flex flex-col w-1/2 py-1 px-1">
              <label className="py-1" htmlFor="instagram">
                Instagram
              </label>
              <input
                id="instagram"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="Instagram"
              ></input>
            </div>
            <div className="flex flex-col w-1/2 py-1">
              <label className="py-1" htmlFor="twitter">
                Twitter
              </label>
              <input
                id="twitter"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="Twitter"
              ></input>
            </div>
          </div>
          <div className="flex flex-row justify-between w-auto">
            <div className="flex flex-col w-full py-1 px-1">
              <label className="py-1" htmlFor="github">
                Github
              </label>
              <input
                id="github"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
                placeholder="Github"
              ></input>
            </div>
          </div>
          <div className="flex flex-row py-1">
            <div className="flex flex-col px-1 py-2">
              <input
                id="social-icons"
                type="checkbox"
                className="rounded bg-slate-200"
                // value={resumeStyling.resumeTitle}
                // onChange={(e) => resumeTitleAction(e)}
              ></input>
            </div>

            <div className="flex flex-col">
              <label className="py-1 px-1" htmlFor="social-icons">
                Show Social Icons?
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
