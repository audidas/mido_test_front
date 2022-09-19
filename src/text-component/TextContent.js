import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { boxState } from "../recoil/box-state";

const TextContent = ({ value, setBoxList }) => {
  const tspanRef = useRef();

  useEffect(() => {
    if (typeof value.loc !== "undefined") {
      let color = ["rgba(255,0,0,0.25)", "rgba(255,0,0)"];

      if (value.loc.type.includes("PER")) {
        color = ["rgba(255,204,92,0.25)", "rgba(255,204,92)"];
      } else if (value.loc.type.includes("GPE")) {
        color = ["rgba(255,131,3,0.25)", "rgba(255,131,3)"];
      } else if (value.loc.type.includes("FAC")) {
        color = ["rgba(248,115,158,0.25)", "rgba(248,115,158)"];
      } else if (value.loc.type.includes("LOC")) {
        color = ["rgba(221,158,247,0.25)", "rgba(221,158,247)"];
      } else if (value.loc.type.includes("VEH")) {
        color = ["rgba(113,205,159,0.25)", "rgba(113,205,159)"];
      } else if (value.loc.type.includes("ORG")) {
        color = ["rgba(108,190,244,0.25)", "rgba(108,190,244)"];
      } else if (value.loc.type.includes("WEA")) {
        color = ["rgba(122,131,146,0.25)", "rgba(122,131,146)"];
      } else if (value.loc.type.includes("VAL")) {
        color = ["rgba(122,131,146,0.25)", "rgba(122,131,146)"];
      } else if (value.loc.type.includes("TTL")) {
        color = ["rgba(122,131,146,0.25)", "rgba(122,131,146)"];
      } else if (value.loc.type.includes("COM")) {
        color = ["rgba(143,216,216,0.25)", "rgba(143,216,216)"];
      } else if (value.loc.type.includes("MHI")) {
        color = ["rgba(122,131,146,0.25)", "rgba(122,131,146)"];
      }
      const box = tspanRef.current.getBBox();
      setBoxList((prev) => {
        return [
          ...prev,
          {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
            color,
            type:
              value.loc.type.split(".").length > 1
                ? value.loc.type.split(".")[
                    value.loc.type.split(".").length - 1
                  ]
                : value.loc.type,
          },
        ];
      });
    }
  }, []);

  return (
    <>
      <tspan ref={tspanRef}>{`${value.value}\t`}</tspan>
    </>
  );
};

export default TextContent;
