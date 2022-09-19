import React, { useEffect, useState } from "react";
import TextContent from "./TextContent";
import { boxState } from "../recoil/box-state";
import { useRecoilState } from "recoil";

const TextLayer = ({ text, y, doc, setBoxList }) => {
  const [loading, setLoading] = useState(true);
  const [box, setBox] = useRecoilState(boxState);

  useEffect(() => {
    const ar = [];
    const divide = () => {
      Object.keys(doc[0]).forEach((v) => {
        if (v !== "doc" && v !== "relations") {
          text.children.forEach((val, i) => {
            if (i > 0) {
              doc[0][v].forEach((value, j) => {
                if (
                  val.value === value.name &&
                  value.loc.split("-")[0] === val.attributes.start_char &&
                  value.loc.split("-")[1] === val.attributes.end_char
                ) {
                  val["loc"] = value;

                  return false;
                }
              });
            }
          });
        }
      });
      setLoading(false);
    };

    divide();
  }, []);

  return (
    <text y={y}>
      {!loading
        ? text.children.map((v, i) => {
            if (i > 0) {
              return (
                <TextContent
                  value={v}
                  key={v.attributes.id}
                  setBoxList={setBoxList}
                />
              );
            }
          })
        : null}
    </text>
  );
};

export default TextLayer;
