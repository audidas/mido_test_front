import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";

const DetailImage = ({ src, caption }) => {
  return (
    <Box>
      <CardMedia
        component={"img"}
        image={`http://125.133.99.41:5000/api/file?src=${src}`}
        sx={{
          width: "800px",
          margin: "auto",
        }}
      />

      <Typography variant="h6" component={"div"}>
        {caption}
      </Typography>
    </Box>
  );
};

export default DetailImage;
