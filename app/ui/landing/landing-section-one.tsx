import React from "react";
import Lasso from "@/public/LassoBlack.svg";
import RoseBlob from "./rose-blob";
import AzureBlob from "./azure-blob";

const LandingOne: React.FC = () => {
  return (
    <section className="landing-one">
      {/* Decorative blobs — pass both the shared utilities and the positional class */}
      {/* If RoseBlob/AzureBlob forward className to their root element, this will work. */}
      <RoseBlob className="hero-blob hero-blob-rose" />
      <AzureBlob className="hero-blob hero-blob-azure" />

      {/* If the blob components don't forward className, use the wrapper approach:
          <div className="hero-blob hero-blob-rose"><RoseBlob /></div>
          <div className="hero-blob hero-blob-azure"><AzureBlob /></div>
      */}

      <div className="landing-one-wrapper">
        <div className="landing-one-inner">
          <div className="landing-one-col landing-one-graphic">
            {/* Lasso is an inline SVG React component (SVGR). If it's a URL for next/image, swap to <Image /> */}
            <Lasso className="section-one-logo-svg" aria-hidden />
          </div>

          <div className="landing-one-col landing-one-copy">
            <h1 className="landing-one-heading">Tame your Job Search.</h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingOne;
