import React from "react";
import Responses from "/public/graphs/Responses.png";
import Image from "next/image";

const ResponsesCard = () => {
  return (
    <div className="tour-response-this-week w-1/4 h-[250px] bg-white rounded-xl tight-shadow">
      <h2 className="font-bold p-2">Responses</h2>
      <div className="flex flex-row">
        <div className="w-full h-[200px]">
          <Image
            className="h-full w-auto m-auto"
            width={0}
            height={0}
            alt=""
            src={Responses}
          />
        </div>
      </div>
    </div>
  );
};

export default ResponsesCard;
