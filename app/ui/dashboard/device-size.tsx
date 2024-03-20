import React from "react";

const DeviceSize = () => {
  return (
    <header className="p-10 relative flex items-center justify-center h-screen mb-12 overflow-hidden">
      <div className="relative z-30 p-5 text-2xl text-center text-white bg-slate-500 bg-opacity-50 rounded-xl">
        Please login from a device with a screen size larger that 768px width
        and/or 300px height
      </div>
      <video
        height={50}
        width={50}
        autoPlay
        playsInline
        loop
        muted
        className="absolute z-10 w-auto min-w-full min-h-full max-w-none"
      >
        <source
          src="https://res.cloudinary.com/dv6keahg3/video/upload/v1710779448/ResumeWrangler/video/lasso-cowboys_j1ablg.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </header>
  );
};

export default DeviceSize;
