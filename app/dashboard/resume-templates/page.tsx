"use client";

import { Suspense, useState } from "react";

import {
  resumeTemplates,
  bodyFonts,
  headerFonts,
  colors,
} from "../../data/data";
import { user } from "../../data/user-details";
import Classic from "../../ui/resume/classic/page";
// import Cubic from "./components/templates/resume/cubic/page";

export default function ClassicResume() {
  const [resumeStyling, setResumeStyling] = useState({
    resumeTitle: "",
    resumeTemplate: "classic",
    headingFont: "font-quicksand",
    bodyFont: "font-quicksand",
    color: "white",
  });

  const resumeTitleAction = (e: { target: HTMLInputElement }) => {
    let updatedValue = {};

    updatedValue = { resumeTitle: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const bodyFontAction = (e: { target: HTMLSelectElement }) => {
    let updatedValue = {};

    updatedValue = { bodyFont: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const headerFontAction = (e: { target: HTMLSelectElement }) => {
    let updatedValue = {};

    updatedValue = { headingFont: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const resumeTemplateAction = (e: { target: HTMLSelectElement }) => {
    let updatedValue = {};

    updatedValue = { resumeTemplate: e.target.value };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const colorAction = (e: React.MouseEvent<HTMLDivElement>) => {
    let updatedValue = {};

    updatedValue = { color: e.currentTarget.id };

    setResumeStyling((resumeStyling) => ({
      ...resumeStyling,
      ...updatedValue,
    }));
  };

  const deleteSkill = (e: any) => {
    console.log(e);
  };

  const ResumeStyling = () => {
    return (
      <div className="resume-styling">
        <div className="py-2 font-bold text-xl">
          <h2>Resume Styling</h2>
        </div>
        <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
          <div className="flex flex-col py-1">
            <label className="py-1" htmlFor="header-font">
              Resume Title
            </label>
            <input
              className="rounded bg-slate-200"
              value={resumeStyling.resumeTitle}
              onChange={(e) => resumeTitleAction(e)}
              placeholder="Resume Title"
            ></input>
          </div>
          <div className="flex flex-col py-1">
            <label className="py-1" htmlFor="resume-template">
              Resume Template
            </label>
            <select
              className="rounded bg-amber-300"
              value={resumeStyling.resumeTemplate}
              onChange={(e) => resumeTemplateAction(e)}
              name="resume-template"
              id="resume-template"
            >
              {resumeTemplates.map((resume) => {
                return (
                  <option
                    className={resume.name}
                    key={resume.id}
                    value={resume.name}
                  >
                    {resume.description}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <div className="py-1 flex flex-col">
              <label className="py-1" htmlFor="header-font">
                Colors
              </label>
              <div className="flex flex-row justify-around">
                {colors.map((color) => (
                  <div
                    style={{ cursor: "pointer" }}
                    key={color.id}
                    id={color.name}
                    onClick={(e) => colorAction(e)}
                    className={`rounded-[16px] border-2 border-black h-8 w-8 ${color.color} hover:-translate-y-1 duration-500`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="py-1 flex flex-col">
              <label className="py-1" htmlFor="header-font">
                Heading Font
              </label>
              <select
                className={`${resumeStyling.headingFont} rounded`}
                value={resumeStyling.headingFont}
                onChange={(e) => headerFontAction(e)}
                name="header-font"
                id="header-font"
              >
                {headerFonts.map((font) => {
                  return (
                    <option
                      className={font.name}
                      key={font.id}
                      value={font.name}
                    >
                      {font.description}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-col py-1">
            <label className="py-1" htmlFor="header-font">
              Body Font
            </label>
            <select
              className={`${resumeStyling.bodyFont} rounded`}
              value={resumeStyling.bodyFont}
              onChange={(e) => bodyFontAction(e)}
              name="header-font"
              id="header-font"
            >
              {bodyFonts.map((font) => {
                return (
                  <option className={font.name} key={font.id} value={font.name}>
                    {font.description}
                  </option>
                );
              })}
            </select>
          </div>

          <div style={{ height: "0.5rem" }}></div>
        </div>
      </div>
    );
  };

  const YourProfile = () => {
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
                value={resumeStyling.resumeTemplate}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
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
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
                ></input>
              </div>

              <div className="flex flex-col">
                <label className="py-1 px-1" htmlFor="social-icons">
                  Show Social Icons?
                </label>
              </div>
            </div>
            <div style={{ height: "0.5rem" }}></div>
          </div>
        </div>
      </div>
    );
  };

  const YourSkills = () => {
    return (
      <div>
        <div className="your-skills">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="py-2 font-bold text-xl">
                <h2>Your Skills</h2>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-row m-auto">
                <div className="flex flex-col px-4">Move Up</div>
                <div className="flex flex-col">Move Down</div>
              </div>
            </div>
          </div>

          <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
            <div className="flex flex-row w-auto">
              <div className="flex flex-col w-full py-1 px-1">
                <label className="py-1" htmlFor="section-title">
                  Section Title
                </label>
                <input
                  id="section-title"
                  className="rounded bg-slate-200"
                  value={resumeStyling.resumeTitle}
                  onChange={(e) => resumeTitleAction(e)}
                  placeholder="Section Title"
                ></input>
              </div>
            </div>
            <div className="flex flex-col w-full py-2 px-1">
              <label className="py-1" htmlFor="resume-template" hidden>
                Profile Image
              </label>
              <button
                className="rounded bg-amber-300 h-10 border border-black"
                value={resumeStyling.resumeTemplate}
                // onChange={(e) => resumeTemplateAction(e)}
                name="resume-template"
                id="resume-template"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col py-1 px-1">
                <label className="py-1" htmlFor="skills">
                  Skills
                </label>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col w-3/4">
                    <div className="flex flex-row w-full">
                      <input
                        id="skills"
                        value={"TEST"}
                        className="rounded bg-slate-200 w-full"
                      ></input>
                    </div>
                    <div className="flex flex-row py-3">
                      <input className="w-full" type="range"></input>
                    </div>
                  </div>
                  <div className="flex flex-col w-auto align-middle">
                    <p onClick={(e) => deleteSkill(e)}>Delete</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row">
                <div className="px-1 flex align-middle">
                  <input className="m-auto" type="checkbox"></input>
                </div>
                <div className="flex flex-col">
                  <p>Show skills section?</p>
                </div>
              </div>
              <div className="flex flex-row py-2">
                <div className="px-1 flex align-middle">
                  <input className="m-auto" type="checkbox"></input>
                </div>
                <div className="flex flex-col">
                  <p>Show skills progress bars?</p>
                </div>
              </div>
            </div>
            <div style={{ height: "0.5rem" }}></div>
          </div>
        </div>
        <div className="py-2"></div>
      </div>
    );
  };

  return (
    <main className="flex w-full">
      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col h-full overflow-scroll px-6 w-1/2 ">
          <ResumeStyling />
          <div className="py-2"></div>
          <YourProfile />
          <div className="py-2"></div>
          <YourSkills />
          <div className="p-2 text-center">
            <a
              href={`/api/pdf?bodyFont=${resumeStyling.bodyFont}&headerFont=${resumeStyling.headingFont}`}
              download="generated_pdf.pdf"
              className="downloadBtn"
            >
              Download PDF
            </a>
          </div>
        </div>
        <div className="flex flex-col h-full w-full m-auto overflow-scroll right-0">
          {resumeStyling.resumeTemplate === "classic" && (
            <Suspense>
              <Classic
                headingFont={resumeStyling.headingFont}
                bodyFont={resumeStyling.bodyFont}
                user={user}
              />
            </Suspense>
          )}
        </div>
      </div>
    </main>
  );
}
