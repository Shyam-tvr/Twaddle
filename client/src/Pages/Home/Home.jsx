import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ProfileCard from "../../Components/Home/ProfileCard/ProfileCard";
import Story from "../../Components/Home/Story/Story";
import Post from "../../Components/Home/Post/Post";
import Suggetion from "../../Components/Home/suggetion/suggetion";
import { useDispatch, useSelector } from "react-redux";
import UploadStatus from "../../Components/Home/Post/UploadStatus";
import { postApi } from "../../API/Post";
import { setMainLoader } from "../../redux/slices/alertSlice";
import { setPosts } from "../../redux/slices/postSlice";

const Home = () => {
  const { postUpload } = useSelector((state) => state.alert);
  const token = useSelector((state) => state.user.accessToken);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMainLoader(true));
    postApi.getPosts(token).then((response) => {
      dispatch(setPosts(response.posts));
      dispatch(setMainLoader(false));
    });// eslint-disable-next-line
  },[]);

  return (
    <Box sx={{ marginTop: "1.5rem", marginX: { xs: ".5rem", md: "5rem" } }}>
      <Grid container spacing={3}>
        <Grid
          item
          sx={{ display: { xs: "none", md: "block" }, position: "sticky" }}
          md={3}
        >
          <ProfileCard />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Story />
          {postUpload && <UploadStatus />}
          {posts ? (
            posts.length > 0 ? (
              posts.map((post, index) => {
                return <Post key={index} post={post} />;
              })
            ) : (
              <Box mt={3}>
                <Typography variant="h4" textAlign="center">
                  Welcome To Twaddle
                </Typography>
                <Typography variant="caption" textAlign="center">
                  Follow people to start seeing the photos and videos they
                  share.
                </Typography>
              </Box>
            )
          ) : (
            <></>
          )}
        </Grid>
        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={3}>
          <Suggetion />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
