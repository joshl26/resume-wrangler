import React from "react";

const YourSocialLinks = ({ user }: { user: any }) => {
  return (
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
  );
};

export default YourSocialLinks;
