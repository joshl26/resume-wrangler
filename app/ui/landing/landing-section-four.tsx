import React from "react";
import Finance from "@/public/images/finance.svg";
import Graph from "@/public/images/graph.svg";
import Megaphone from "@/public/images/megaphone.svg";
import Handshake from "@/public/images/handshake.svg";
import Rocket from "@/public/images/rocket.svg";
import Ai from "@/public/images/ai.svg";

const FEATURES = [
  { Icon: Graph, title: "Achieve results." },
  { Icon: Finance, title: "Increase your net value." },
  { Icon: Megaphone, title: "Market your skills." },
  { Icon: Handshake, title: "Connect with the right people." },
  { Icon: Rocket, title: "Launch your career with us." },
  { Icon: Ai, title: "Harness the power of our AI." },
];

const LandingFour: React.FC = () => {
  return (
    <section className="landing-four">
      <div className="landing-four-inner">
        <div className="landing-four-header">
          <h3 className="landing-four-pretitle">Wrangle your dream career!</h3>
          <h2 className="landing-four-heading">
            We have all the tools you need to make it happen!
          </h2>
        </div>

        <div className="landing-four-cards" role="list" aria-label="Features">
          {FEATURES.map((f, i) => {
            const Icon = f.Icon;
            return (
              <div key={i} className="landing-four-card" role="listitem">
                <div className="landing-four-card-icon" aria-hidden>
                  {/* wrapper ensures sizing even if SVG component doesn't forward className */}
                  <div className="logo-item">
                    <Icon className="logo-svg" aria-hidden alt={f.title} />
                  </div>
                </div>

                <p className="landing-four-card-title">{f.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LandingFour;
