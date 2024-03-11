import { createCertification, deleteCertification } from "@/app/lib/actions";
import { useState } from "react";

export default function YourCertifications({
  userCertifications,
  resume,
  user,
}: {
  userCertifications: any;
  resume: any;
  user: any;
}) {
  // console.log(user.id);

  const [sectionTitle, setSectionTitle] = useState(
    resume?.custom_section_two_name
  );

  return (
    <div className="rounded border border-black w-full px-2">
      <div className="your-certifications">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <div className="py-2 font-bold text-xl">
              <h2>{sectionTitle}</h2>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="flex flex-row m-auto">
              <div className="flex flex-col px-4">Move Up</div>
              <div className="flex flex-col">Move Down</div>
            </div>
          </div>
        </div>
        <form action={createCertification} className="flex flex-row w-auto">
          <div className="flex flex-col w-full py-1 px-1">
            <label hidden htmlFor="resume_id" />
            <input
              readOnly
              hidden
              name="resume_id"
              id="resume_id"
              defaultValue={resume.id}
            />

            <label hidden htmlFor="user_id" />
            <input hidden name="user_id" id="user_id" defaultValue={user.id} />
            <label className="py-1" htmlFor="section_title">
              Section Title
            </label>
            <input
              required
              type="text"
              maxLength={14}
              id="section_title"
              name="section_title"
              className="rounded bg-slate-200"
              defaultValue={sectionTitle}
              onChange={(e) => setSectionTitle(e.target.value)}
              placeholder="Section Title"
            ></input>
            <h2 className="py-1">{sectionTitle}</h2>
            <div className="rounded border border-black w-full px-2">
              <div className="flex flex-row w-auto">
                <div className="flex flex-col w-full py-1 px-1">
                  <label className="py-1" htmlFor="certification_name">
                    Name
                  </label>
                  <input
                    required
                    id="certification_name"
                    name="certification_name"
                    className="rounded bg-slate-200"
                    defaultValue={""}
                    onChange={(e) => {}}
                    placeholder="Title, Activity, name, etc.."
                  ></input>
                </div>
              </div>
              <div className="flex flex-row w-auto">
                <div className="flex flex-col w-full py-1 pb-3 px-1">
                  <label className="py-1" htmlFor="certification_location">
                    Location
                  </label>
                  <input
                    id="certification_location"
                    name="certification_location"
                    className="rounded bg-slate-200"
                    defaultValue={""}
                    onChange={(e) => {}}
                    placeholder="Location"
                  ></input>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full pt-4 pb-2 px-1">
              <button
                type="submit"
                className="rounded bg-amber-300 h-10 border border-black"
              >
                Add New Entry
              </button>
            </div>
          </div>
        </form>
        <ul>
          {userCertifications?.map((certification: any) => (
            <li key={certification?.id}>
              <form action={deleteCertification}>
                <label hidden htmlFor="certification_id" />
                <input
                  readOnly
                  hidden
                  name="certification_id"
                  id="certification_id"
                  value={certification?.id}
                />
                <label hidden htmlFor="resume_id" />
                <input
                  readOnly
                  hidden
                  name="resume_id"
                  id="resume_id"
                  value={resume.id}
                />
                <h2 className="font-bold">{certification?.name}</h2>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p>{certification?.location}</p>
                    <p>
                      {certification?.start_date} - {certification?.end_date}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <button type="submit" className="font-bold">
                      Delete
                    </button>
                  </div>
                </div>
              </form>
            </li>
          ))}
        </ul>
        <div className="flex flex-row py-2">
          <div className="px-1 flex align-middle">
            <input
              className="m-auto bg-slate-200 rounded"
              type="checkbox"
              onChange={(e) => {}}
            ></input>
          </div>
          <div className="flex flex-col">
            <p>Show {sectionTitle} section?</p>
          </div>
        </div>
      </div>
      <div className="py-2"></div>
    </div>
  );
}
