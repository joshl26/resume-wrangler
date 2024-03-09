export default function YourResumeStyling() {
  return (
    <div className="resume-styling">
      <div className="pb-2 font-bold text-xl">
        <h2>Resume Styling</h2>
        {/* <p>{resumeStylingChanged === false ? "false" : "true"}</p> */}
      </div>
      <div className="drop-shadow-md border-[1px] border-slate-300 rounded px-5 py-2 ">
        <div className="flex flex-col py-1">
          <label className="py-1" htmlFor="header-font">
            Resume Title
          </label>
          <input
            className="rounded bg-slate-200"
            // value={resumeStyling.resumeTitle}
            // onChange={(e) => resumeStylingOnChangeHandler(e)}
            placeholder="Resume Title"
          ></input>
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1" htmlFor="resume-template">
            Resume Template
          </label>
          <select
            className="rounded bg-amber-300"
            // value={resumeStyling.resumeTemplate}
            // onChange={(e) => resumeStylingOnChangeHandler(e)}
            name="resume-template"
            id="resume-template"
          >
            {/* {resumeTemplates.map((resume: any) => {
              return (
                <option
                  className={resume.name}
                  key={resume.id}
                  value={resume.name}
                >
                  {resume.description}
                </option>
              );
            })} */}
          </select>
        </div>
        <div className="flex flex-col">
          <div className="py-1 flex flex-col">
            <label className="py-1" htmlFor="header-font">
              Colors
            </label>
            <div className="flex flex-row justify-around">
              {/* {resumeColors.map((color: any) => (
                <div
                  style={{ cursor: "pointer" }}
                  key={color.id}
                  id={color.name}
                  onClick={(e) => colorAction(e)}
                  className={`rounded-[16px] border-2 border-black h-8 w-8 ${color.color} hover:-translate-y-1 duration-500`}
                ></div>
              ))} */}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="py-1 flex flex-col">
            <label className="py-1" htmlFor="header-font">
              Heading Font
            </label>
            <select
              //   className={`${resumeStyling.headingFont} rounded`}
              //   value={resumeStyling.headingFont}
              //   onChange={(e) => headerFontAction(e)}
              name="header-font"
              id="header-font"
            >
              {/* {headerFonts.map((font: any) => {
                return (
                  <option className={font.name} key={font.id} value={font.name}>
                    {font.description}
                  </option>
                );
              })} */}
            </select>
          </div>
        </div>
        <div className="flex flex-col py-1">
          <label className="py-1" htmlFor="header-font">
            Body Font
          </label>
          <select
            // className={`${resumeStyling.bodyFont} rounded`}
            // value={resumeStyling.bodyFont}
            // onChange={(e) => bodyFontAction(e)}
            name="header-font"
            id="header-font"
          >
            {/* {bodyFonts.map((font: any) => {
              return (
                <option className={font.name} key={font.id} value={font.name}>
                  {font.description}
                </option>
              );
            })} */}
          </select>
        </div>

        <div style={{ height: "0.5rem" }}></div>
      </div>
    </div>
  );
}
