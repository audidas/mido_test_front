import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";

import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Process } from "./api/api";
import Preview from "./Preview";

const CreateForm = () => {
  const navigate = useNavigate();

  // tag 입력 값
  const [tag, setTag] = useState("");

  // Rsd_key 입력 값
  const [key, setKey] = useState("");

  // 뉴스 메인 기사 텍스트
  const [text, setText] = useState("");

  // 캡션 수 (최소 0 , 최대 10)
  const [num, setNum] = useState(1);

  // num 제어 함수 
  const settingNum = (state) => {
    if (state === "plus" && num < 10) {
      setNum((prevNum) => prevNum + 1);
    } else if (state === "minus" && num > 0) {
      setNum((prevNum) => prevNum - 1);
    }
  };

  // 서버에 sample 정보를 보내는 함수
  const onClickSubmit = useCallback(async () => {
    try {
      const files = document.getElementsByClassName("create_file");
      const captions = document.getElementsByName("create_caption");
      let images = [];
      let caption_check = true;

      if (
        files.length === 0 &&
        (captions.length === 1) & (captions[0].value.length === 0)
      ) {
        images = [];
      } else {
        if (files.length === 0 || files.length !== num) {
          console.log("이미지 입력");
          return;
        }

        for (let index = 0; index < captions.length; index++) {
          const element = captions[index];

          if (typeof element.value === "undefined") {
            caption_check = false;
            break;
          }

          images.push({ cap: element.value, img: "" });
        }

        for (let index = 0; index < files.length; index++) {
          const element = files[index];
         
          images[index] = {
            cap: images[index].cap,
            img: element.src.split("=")[1],
          };
        }

        if (!caption_check) {
          console.log("캡션 입력");
          return;
        }
      }

      const result = await Process.createProcess({
        user_tag: tag,
        rsd_key: key,
        text,
        images,
      });

      if (result.status !== 200) {
        console.log("안됌 ㅠㅅㅠ");
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      return;
    }
  }, [text, key, tag, num]);

  return (
    <Card
      sx={{ maxHeight: "800px", overflow: "scroll", height: "800px" }}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        width:"550px"
      }}
      className="no-scroll"
    >
      <CardHeader
        sx={{
          justifyContent: "left",
        }}
        action={
          <IconButton
            aria-label="settings"
            style={{ borderColor: "white" }}
            sx={{ position: "relative", right: "500px" }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosNew></ArrowBackIosNew>
          </IconButton>
        }
      />

      <CardContent style={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="User Tag"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Rsd Key"
              onChange={(e) => setKey(e.target.value)}
              value={key}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent style={{ textAlign: "center", padding: "30px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              label="Text"
              multiline
              row={4}
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <span
          style={{
            display: "inline-flex",
            justifyContent: "right",
            width: "100%",
            paddingRight: "10px",
            marginTop: "10px",
          }}
        >
          <Button style={{ right: "320px" }} onClick={onClickSubmit}>
            전송
          </Button>
          <div
            onClick={()=>settingNum("plus")}
            style={{ display: "flex" }}
          >
            <Button>추가 </Button>
          </div>
          <div
            onClick={()=>settingNum("minus")}
            style={{ display: "flex" }}
          >
            <Button>제거 </Button>
          </div>
        </span>
        <div style={{ height: "600px", overflow: "scroll" }} className="
        6no-scroll" > 
          {[...Array(num)].map((v, i) => (
            <Preview key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateForm;
