"use client";

import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const WorldMap = () => {
  return (
    <div>
      <ComposableMap>
        <Geographies geography="/public/features.json">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default WorldMap;
