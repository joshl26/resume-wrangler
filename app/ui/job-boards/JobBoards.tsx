"use client";

import Image from "next/image";
import React from "react";
import { useState } from "react";

const searchProviders = [
  {
    id: 1,
    name: "indeed",
    url: "https://ca.indeed.com/",
    searchUrl: "https://ca.indeed.com/jobs?q=",
    logoImage: "/logo-indeed.svg",
  },
  {
    id: 2,
    name: "MONSTER",
    url: "https://www.monster.ca/",
    searchUrl: "https://www.monster.ca/jobs/search?q=",
    logoImage: "/logo-monster.png",
  },
  {
    id: 3,
    name: "glassdoor",
    url: "https://www.glassdoor.ca/",
    searchUrl: "https://www.glassdoor.ca/Job/jobs.htm?sc.keyword=",
    logoImage: "/logo-glassdoor.png",
  },
  {
    id: 4,
    name: "LinkedIn",
    url: "https://www.linkedin.com/",
    searchUrl: "https://www.linkedin.com/jobs/search?keywords=",
    logoImage: "/logo-linkedin.svg",
  },
  {
    id: 5,
    name: "Google",
    url: "https://www.google.com/",
    searchUrl: "https://www.google.com/search?q=&oq=&ibp=htl;jobs",
    logoImage: "/logo-google.svg",
  },
  {
    id: 6,
    name: "jooble",
    url: "https://jooble.org/",
    searchUrl: "https://jooble.org/SearchResult?ukw=",
    logoImage: "/logo-jooble.svg",
  },
  {
    id: 7,
    name: "SimplyHired",
    url: "https://www.simplyhired.com/",
    searchUrl: "https://www.simplyhired.com/search?q=",
    logoImage: "/logo-simply-hired.png",
  },
  {
    id: 8,
    name: "ZipRecruiter",
    url: "https://www.ziprecruiter.com/",
    searchUrl: "https://www.ziprecruiter.com/jobs-search?search=",
    logoImage: "/logo-zip-recruiter.svg",
  },
  {
    id: 9,
    name: "snagajob",
    url: "https://www.snagajob.com/",
    searchUrl: "https://www.snagajob.com/search?q=",
    logoImage: "/logo-snagajob.jpg",
  },
  {
    id: 10,
    name: "CAREERBUILDER",
    url: "https://www.careerbuilder.com/",
    searchUrl: "https://www.careerbuilder.com/jobs?emp=&keywords=",
    logoImage: "/logo-career-builder.png",
  },
  {
    id: 11,
    name: "idealist",
    url: "https://www.idealist.org/",
    searchUrl: "https://www.idealist.org/en/jobs?q=",
    logoImage: "/logo-idealist.png",
  },
];

const JobBoards = () => {
  const [jobTitle, setJobTitle] = useState("Software Engineer");

  function OnChangeHandler(e) {
    setJobTitle(e.target.value);
  }
  return (
    <section className="py-10 flex flex-row bg-orange-100 w-full">
      <div className="flex flex-col w-9/12 bg-orange-200 tight-shadow py-4 px-4 mt-20 mb-6 mx-auto">
        <h1 className="text-2xl font-semibold">What is your job title?</h1>
        <p className="py-2">Type in the job position you are looking for.</p>
        <input
          type="text"
          onChange={OnChangeHandler}
          value={jobTitle}
          placeholder="e.g. Software Engineer"
        ></input>
        <div className="border-b-2 border-black h-4 w-full"></div>
        {searchProviders?.map((provider) =>
          jobTitle ? (
            <div
              key={provider.id}
              className="border-b-2 border-black w-full flex flex-row justify-between"
            >
              <div className="w-auto contents">
                <Image
                  className="h-auto"
                  width={100}
                  height={0}
                  alt=""
                  src={provider.logoImage}
                ></Image>
              </div>
              <a target="_blank" href={`${provider.searchUrl}${jobTitle}`}>
                <h2 className="py-2 text-1xl">
                  {" "}
                  Search {provider.name} for {jobTitle} positions
                </h2>
              </a>
            </div>
          ) : (
            <div
              key={provider.id}
              className="border-b-2 border-black w-full flex flex-row justify-between"
            >
              <div className="contents">
                <Image
                  className="h-auto"
                  width={100}
                  height={0}
                  alt=""
                  src={provider.logoImage}
                ></Image>
              </div>
              <a target="_blank" href={provider.url}>
                <h2 className="py-2 text-1xl">Search {provider.name}</h2>
              </a>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default JobBoards;
