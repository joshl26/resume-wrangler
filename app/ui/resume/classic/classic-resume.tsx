import Page from "../page";
import { User } from "../../../data/user-details";
import { resumeSkills } from "../../../data/resume-skills";
import { resumeExperiences } from "../../../data/resume-experiences";

interface Props {
  user: User;
  bodyFont: string;
  headingFont: string;
}

const Classic = (props: Props) => {
  return (
    <>
      <Page>
        <div id="user_details">
          <div>
            <h1
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: "50px",
                lineHeight: "1.3",
                fontWeight: "bold",
              }}
              className={props.headingFont}
            >
              {props.user === null ? "First" : props.user.first_name}{" "}
              {props.user === null ? "Last" : props.user.last_name}
            </h1>
            <div
              style={{
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  margin: "auto",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  height: "100%",
                }}
              >
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  {props.user === null ? "Address" : props.user.address_three}
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  |
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  {props.user === null ? "Phone" : props.user.phone}
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  |
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  {props.user === null ? "Email" : props.user.email}
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  |
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  {props.user === null ? "LinkedIn" : props.user.linked_in}
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  |
                </p>
                <p
                  style={{
                    margin: "0.25rem",
                  }}
                  className={props.bodyFont}
                >
                  {props.user === null ? "Website" : props.user.website}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="resume_skills">
          {resumeSkills && (
            <div>
              <h2
                className={props.bodyFont}
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textAlign: "center",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: "1rem 0 0.25rem 0",
                  fontWeight: "bold",
                }}
              >
                TECHNICAL SKILLS
              </h2>
              <div style={{ display: "flex" }}>
                <h3
                  className={props.bodyFont}
                  style={{ margin: 0, fontWeight: "bold", fontSize: "0.95rem" }}
                >
                  Frontend:{" "}
                </h3>{" "}
                <p
                  className={props.bodyFont}
                  style={{
                    margin: 0,
                    paddingLeft: "0.25rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {resumeSkills.frontendSkills}
                </p>
              </div>
              <div style={{ display: "flex", fontSize: "0.95rem" }}>
                <h3
                  className={props.bodyFont}
                  style={{ margin: 0, fontWeight: "bold" }}
                >
                  Backend:{" "}
                </h3>
                <p
                  className={props.bodyFont}
                  style={{ margin: 0, paddingLeft: "0.25rem" }}
                >
                  {resumeSkills.backendSkills}
                </p>
              </div>
              <div style={{ display: "flex", fontSize: "0.95rem" }}>
                <h3
                  className={props.bodyFont}
                  style={{ margin: 0, fontWeight: "bold" }}
                >
                  Frameworks and Libraries:{" "}
                </h3>
                <p
                  className={props.bodyFont}
                  style={{ margin: 0, paddingLeft: "0.25rem" }}
                >
                  {resumeSkills.frontendSkills}
                </p>
              </div>
              <div style={{ display: "flex", fontSize: "0.95rem" }}>
                <h3
                  className={props.bodyFont}
                  style={{ margin: 0, fontWeight: "bold" }}
                >
                  Developer Tools:
                </h3>
                <p
                  className={props.bodyFont}
                  style={{
                    margin: 0,
                    paddingLeft: "0.25rem",
                    fontWeight: "lighter",
                  }}
                >
                  {" "}
                  {resumeSkills.frontendSkills}
                </p>
              </div>
            </div>
          )}
        </div>
        <div id="work-experience-1">
          {resumeExperiences && (
            <div>
              <h2
                className={props.bodyFont}
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textAlign: "center",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: "1rem 0 0.25rem 0",
                  fontWeight: "bold",
                }}
              >
                Work Experience
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[0].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[0].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[0].company}
                </p>
                <div
                  style={{
                    width: "175px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <a
                    style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    className={props.bodyFont}
                    href={resumeExperiences[0].linkUrl}
                  >
                    LIVE DEMO
                  </a>
                  <a
                    style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    className={props.bodyFont}
                    href={resumeExperiences[0].gitUrl}
                  >
                    GIT REPO
                  </a>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[0].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[0].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[0].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[0].decriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[0].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[0].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: "0.5rem" }}></div>
        <div id="work-experience-2">
          {resumeExperiences && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[1].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[1].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[1].company}
                </p>
                <div
                  style={{
                    width: "175px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <a
                    style={{ fontSize: "0.9rem", fontWeight: "bold" }}
                    className={props.bodyFont}
                    href={resumeExperiences[1].linkUrl}
                  >
                    LIVE DEMO
                  </a>
                  <a
                    style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    className={props.bodyFont}
                    href={resumeExperiences[1].gitUrl}
                  >
                    GIT REPO
                  </a>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[2].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[2].descriptionTwo}
                    </p>
                  </li>
                  {resumeExperiences[0].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[2].decriptionThree}
                      </p>
                    </li>
                  )}

                  {resumeExperiences[2].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[2].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div style={{ height: "0.5rem" }}></div>

        <div id="work-experience-3">
          {resumeExperiences && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[2].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[2].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[2].company}
                </p>
                <div
                  style={{
                    width: "175px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <a
                    style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    className={props.bodyFont}
                    href={resumeExperiences[2].linkUrl}
                  >
                    LIVE DEMO
                  </a>
                  <a
                    style={{ fontWeight: "bold", fontSize: "0.9rem" }}
                    className={props.bodyFont}
                    href={resumeExperiences[2].gitUrl}
                  >
                    GIT REPO
                  </a>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[2].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[2].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[2].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[2].descriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[2].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[2].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div id="education-1">
          {resumeExperiences && (
            <div>
              <h2
                className={props.bodyFont}
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textAlign: "center",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: "1rem 0 0.25rem 0",
                  fontWeight: "bold",
                }}
              >
                Education
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[3].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[3].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  className={props.bodyFont}
                  href={resumeExperiences[3].linkUrl}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[3].company}
                </a>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    className={props.bodyFont}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.25",
                      margin: "0",
                    }}
                  >
                    {resumeExperiences[3].detail}
                  </p>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[3].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[3].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[3].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[3].decriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[3].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[3].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Page>
      <Page>
        <div id="education-2">
          {resumeExperiences && (
            <div>
              <h2
                className={props.bodyFont}
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textAlign: "center",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: "1rem 0 0.25rem 0",
                  fontWeight: "bold",
                }}
              >
                Education Continued
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[4].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[4].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  className={props.bodyFont}
                  href={resumeExperiences[4].linkUrl}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[4].company}
                </a>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    className={props.bodyFont}
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.25",
                      margin: "0",
                    }}
                  >
                    {resumeExperiences[4].detail}
                  </p>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[4].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[4].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[4].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[4].decriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[4].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[4].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div id="technical-projects-1">
          {resumeExperiences && (
            <div>
              <h2
                className={props.bodyFont}
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textAlign: "center",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: "1rem 0 0.25rem 0",
                  fontWeight: "bold",
                }}
              >
                Technical Projects
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[6].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[6].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  className={props.bodyFont}
                  href={resumeExperiences[6].linkUrl}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[6].company}
                </a>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    className={props.bodyFont}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.25",
                      margin: "0",
                    }}
                  >
                    {resumeExperiences[6].detail}
                  </p>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[6].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[6].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[6].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[6].descriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[6].descriptionFour != "" && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[6].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div id="technical-projects-2">
          {resumeExperiences && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[7].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[7].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  className={props.bodyFont}
                  href={resumeExperiences[7].linkUrl}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[7].company}
                </a>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    className={props.bodyFont}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.25",
                      margin: "0",
                    }}
                  >
                    {resumeExperiences[7].detail}
                  </p>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[7].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[7].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[7].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[7].descriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[7].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[7].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div id="technical-projects-3">
          {resumeExperiences && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                    fontWeight: "bold",
                  }}
                >
                  {resumeExperiences[8].title}
                </h3>
                <h3
                  className={props.bodyFont}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[8].time}
                </h3>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  className={props.bodyFont}
                  href={resumeExperiences[8].linkUrl}
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.25",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[8].company}
                </a>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p
                    className={props.bodyFont}
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: "1.25",
                      margin: "0",
                    }}
                  >
                    {resumeExperiences[8].detail}
                  </p>
                </div>
              </div>
              <div>
                <ul
                  style={{
                    margin: "0.25rem 0 0.25rem 0",
                    listStyle: "circle",
                    paddingLeft: "1rem",
                  }}
                >
                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[8].descriptionOne}
                    </p>
                  </li>

                  <li>
                    <p
                      className={props.bodyFont}
                      style={{
                        fontSize: "0.85rem",
                        lineHeight: "1.25",
                        margin: "0",
                      }}
                    >
                      {resumeExperiences[8].descriptionTwo}
                    </p>
                  </li>

                  {resumeExperiences[8].descriptionThree && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[8].decriptionThree}
                      </p>
                    </li>
                  )}
                  {resumeExperiences[8].descriptionFour && (
                    <li>
                      <p
                        className={props.bodyFont}
                        style={{
                          fontSize: "0.85rem",
                          lineHeight: "1.25",
                          margin: "0",
                        }}
                      >
                        {resumeExperiences[8].descriptionFour}
                      </p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div id="technical-projects-3">
          {resumeExperiences && (
            <div>
              <h2
                className={props.bodyFont}
                style={{
                  textTransform: "uppercase",
                  textDecoration: "underline",
                  textAlign: "center",
                  fontSize: "1rem",
                  lineHeight: "1.5",
                  margin: "1rem 0 0.25rem 0",
                  fontWeight: "bold",
                }}
              >
                Professional Statement
              </h2>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  className={props.bodyFont}
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    margin: "0.25rem 0 0.25rem 0",
                  }}
                >
                  {resumeExperiences[5].descriptionOne}
                </p>
              </div>
            </div>
          )}
        </div>
      </Page>
    </>
  );
};

export default Classic;
