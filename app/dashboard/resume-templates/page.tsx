import React from "react";

const Page = () => {
  return (
    <div className="w-full h-full pl-3 pr-4">
      <h1 className="">Start with a Résumé Template</h1>
      <p>
        Get a quick start by customizing an existing resume example template.
      </p>
      <div className="border border-black w-full h-full rounded">
        <div className="flex">
          <div className="flex flex-row">
            <div className="flex flex-column">
              <div className="flex flex-row"></div>
              <div className="flex flex-row"></div>
              <div className="flex flex-row"></div>
            </div>
            <div className="flex flex-column"></div>
            <div className="flex flex-column"></div>
            <div className="flex flex-column"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
