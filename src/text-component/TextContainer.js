import React, { useEffect, useState } from "react";
import TextLayer from "./TextLayer";

const TextContainer = ({ sentence, doc }) => {
  const [boxlist, setBoxList] = useState([]);

  useEffect(() => {
    setBoxList([]);
  }, []);

  return (
    <svg
      style={{
        width: "1400px",
        height: "800px",
        borderRadius: "5px",
        border: "1px solid #7fa2ff",
        overflow: "scroll",
        display: "block",
      }}
    >
      <g className="text">
        {sentence.map((v, i) => (
          <TextLayer
            y={(i + 1) * 70}
            text={v}
            key={v.attributes.id}
            doc={doc}
            setBoxList={setBoxList}
          />
        ))}
      </g>

      <g className="rect">
        {boxlist.length > 0
          ? boxlist.map((v) => (
              <rect
                x={v.x}
                y={v.y}
                width={v.width - 5}
                height={v.height}
                fill={v.color[0]}
              />
            ))
          : null}
      </g>
      <g className="caption">
        <text>
          {boxlist.length > 0
            ? boxlist.map((v) => (
                <tspan x={v.x} y={v.y + 40} fontSize="10px" fill={v.color[1]}>
                  {" "}
                  {v.type.length > 13 ? `${v.type.slice(0, 13)}...` : v.type}
                </tspan>
              ))
            : null}
        </text>
      </g>
    </svg>
  );
};

export default TextContainer;
