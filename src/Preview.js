import { TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const Preview = () => {
  // 이미지 파일 데이터
  const [file, setFile] = useState();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: false,
    // 이미지 드롭시 서버에 이미지 등록하는 부분
    onDrop: async (acceptedFiles) => {
      const formData = new FormData();

      formData.append("file", acceptedFiles[0]);

      const result = await axios.post("/api/upload", formData, {
        headers: { "content-type": "multipart/form-data" },
      });

      setFile(result.data.img);
    },
  });

  return (
    <section className="container">
      <div
        {...getRootProps({
          className: "dropzone",
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
            borderWidth: 2,
            borderRadius: 2,
            borderColor: "#eeeeee",
            borderStyle: "dashed",
            backgroundColor: "#fafafa",
            color: "#bdbdbd",
            outline: "none",
            transition: "border .24s ease-in-out",
            width: "500px",
            height: "200px",
            marginTop: "5px",
          },
        })}
      >
        <input {...getInputProps()} />
        {file ? (
          <img
            style={{
              display: "inline-flex",
              borderRadius: 2,
              border: "1px solid #eaeaea",
              marginBottom: 8,
              marginRight: 8,
              width: 200,
              height: 200,
              padding: 4,
              boxSizing: "border-box",
            }}
            src={`http://125.133.99.41:5000/api/file?src=${file}`}
            className={"create_file"}
          />
        ) : (
          <p>이미지를 입력해주세요</p>
        )}
      </div>
      <div>
        <TextField
          fullWidth
          label={"caption"}
          color="primary"
          sx={{
            marginTop: "5px",
          }}
          InputProps={{
            name: "create_caption",
          }}
        ></TextField>
      </div>
    </section>
  );
};

export default Preview;
