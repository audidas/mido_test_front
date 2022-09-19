import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import XMLParser from "react-xml-parser";
import { Process } from "./api/api";
import DetailImage from "./DetailImage";
import { createDocumentData } from "./functions/make-document";
import TextContainer from "./text-component/TextContainer";
import { chipTheme } from "./theme/theme";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contents, setContents] = useState({
    tag: "",
    rsd: "",
    text: "",
    images: [],
  });
  const [sentence, setSentence] = useState();

  const [doc, setDoc] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await Process.getDetail(id);
      const result = await Process.getFileContent(
        data.result.text_extraction.preprocess.ltf[
          Object.keys(data.result.text_extraction.preprocess.ltf)[
            Object.keys(data.result.text_extraction.preprocess.ltf).findIndex(
              (a) => {
                return a.split(".ltf.")[0].endsWith("0");
              }
            )
          ]
        ]
      );

      const enLink = await Process.getFileContent(
        data.result.text_extraction.postprocess2.postprocessing_link_confidence[
          Object.keys(
            data.result.text_extraction.postprocess2
              .postprocessing_link_confidence
          )[0]
        ]
      );

      const docData = createDocumentData(
        enLink.data.text,
        data.request.rsd_key
      );
      const sentences = new XMLParser()
        ._parseFromString(result.data.text)
        ["children"].at(-1)
        ["children"].at(-1)["children"];

      sentences.forEach((v, i) => [
        v.children.forEach((val, j) => {
          if (val.value.includes("&quot;")) {
            val.value = val.value.replace("&quot;", '"');
          }
        }),
      ]);

      setSentence(sentences);
      setDoc(docData);
      setContents({
        tag: data.request.user_tag,
        rsd: data.request.rsd_key,
        text: data.request.text,
        images: data.request.images,
      });
    };

    getData();
  }, [id]);

  return (
    <Card
      sx={{
        maxHeight: "800px",
        overflow: "scroll",
        height: "800px",
        width: "1500px",
        minWidth: "850px",
      }}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
        left: "auto",
        right: "auto",
        top: "auto",
        bottom: "auto",
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
            sx={{ position: "relative", right: "1400px" }}
            onClick={() => navigate("/")}
          >
            <ArrowBackIosNew></ArrowBackIosNew>
          </IconButton>
        }
      />
      <CardContent style={{ textAlign: "center" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <span
              style={{
                fontSize: "30px",
                lineHeight: "45px",
              }}
            >
              tag :{" "}
            </span>
            <TextField
              variant="outlined"
              style={{ width: "500px" }}
              disabled
              value={contents?.tag}
            />
          </Grid>
          <Grid item xs={6}>
            <span
              style={{
                fontSize: "30px",
                lineHeight: "45px",
              }}
            >
              RSD :{" "}
            </span>
            <TextField
              variant="outlined"
              style={{ width: "500px" }}
              disabled
              value={contents?.rsd}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardContent style={{ textAlign: "center", padding: "30px" }}>
        <div style={{ display: "inline-flex", width: "95%" }}>
          <Typography
            sx={{
              textAlign: "left",
              fontSize: "30px",
              width: "100px",
            }}
          >
            Text
          </Typography>
          <ThemeProvider theme={chipTheme}>
            <Chip label="Person" sx={{ marginTop: "6px" }} color="person" />
            <Chip
              label="Organization"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="organization"
            />
            <Chip
              label="GeopoliticalEntity"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="geopoliticalEntity"
            />
            <Chip
              label="Location"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="location"
            />
            <Chip
              label="Facility"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="facility"
            />
            <Chip
              label="Vehicle"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="vehicle"
            />
            <Chip
              label="Weapon"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="weapon"
            />
            <Chip
              label="Other"
              sx={{ marginTop: "6px", marginLeft: "3px" }}
              color="other"
            />
          </ThemeProvider>
        </div>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            {sentence?.length > 0 ? (
              <TextContainer sentence={sentence} doc={doc} />
            ) : null}
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <div
          style={{ height: "600px", overflow: "scroll" }}
          className="no-scroll"
        >
          {contents.images.map((v) => (
            <DetailImage src={v.img} caption={v.cap} key={v.img} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Detail;
