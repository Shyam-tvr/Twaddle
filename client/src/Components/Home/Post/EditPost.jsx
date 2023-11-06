import React, { useEffect } from "react";
import { postApi } from "../../../API/Post";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Box, Card, Typography } from "@mui/material";

const EditPost = ({ id }) => {
  const token = useSelector((state) => state.user.accessToken);
  const [postData, setPostData] = useState();
  const [next, setNext] = useState(false);
  const handleNext = () => {
    if (next) {
      console.log(postData)
    } else {
      setNext(true);
    }
  };
  useEffect(() => {
    postApi.getPost(id, token).then((res) => {
      setPostData(res.post);
    });
  });
  return (
    <Card
      sx={{
        minWidth: { xs: "100%", md: "25rem" },
        height: { xs: "100%", md: "30rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "3px 1rem",
          maxWidth: { md: "44rem" },
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <Typography
          sx={{ cursor: "pointer", fontSize: "13px", fontWeight: "700" }}
        >
          {next ? "Back" : "Cancel"}
        </Typography>
        <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
          Create Post
        </Typography>
        <Typography
          sx={{
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "700",
            color: "#1976d2",
          }}
          onClick={handleNext}
        >
          {next ? "Post" : "Next"}
        </Typography>
      </Box>
    </Card>
  );
};

export default EditPost;