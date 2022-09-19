import { Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Process } from "./api/api";

const Content = () => {
  const { state } = useLocation();

  // 파일내용 (텍스트)
  const [content, setContent] = useState();

  // 파일 내용 (이미지)
  const [image, setImage] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    // 문서이름을 받아 파일 내용을 받아오는 함수
    const getContent = async () => {
      try {
        setContent(null);
        setImage(null);
        if (state) {
          if (state.includes(".jpg")) {
            setImage(state);
          } else {
            const result = await Process.getFileContent(state);

            setContent(result.data);
          }
        }
      } catch (error) {
        console.log(error);
        navigate("/")
      }
    };
    getContent();
  }, [state]);

  return (
    <div
      style={{
        display: "inline-table",
      
      }}
    >
      <div>
        <Typography>파일경로 - {state}</Typography>
      </div>
{content?.text.length > 0?
      <pre
        style={{
          marginTop: "15px",
          fontSize: "12px",
          height: "95vh",
          overflow: "auto ",
          width:"85vw"
        }}
      >
        {content?.text ?? content?.json.toString()}
      </pre> :null

}
      {image ? (
        <img
          style={{
            borderRadius: 2,
            border: "1px solid #eaeaea",
            marginBottom: 8,
            marginRight: 8,
            padding: 4,
          }}
          src={`http://125.133.99.41:5000/api/file?src=${image}`}
        />
      ) : null}
    </div>
  );
};

export default Content;
