import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  Dialog,
  useMediaQuery,
  DialogTitle,
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Container } from "@mui/system";
import React, { useRef, useState, useEffect } from "react";
import { CameraAlt } from "@mui/icons-material";
import "./Profile.css";
import Posts from "../../Components/Home/Post/Post";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfile from "../../Components/Profile/EditProfile/EditProfile";
import { userApi } from "../../API/User";

const Profile = () => {
  const params = useParams();
  const currentUser = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.accessToken);
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [followed, setFollowed] = useState();
  const coverRef = useRef(null);
  const profileRef = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
  useEffect(() => {
    if (currentUser._id === params.id) {
      setUser(currentUser);
    } else {
      userApi.getUser(params.id, token).then((res) => {
        setUser(res.user);
      });
    }
  }, []);

  useEffect(() => {
    user?.followers?.filter((id) => setFollowed(id === currentUser._id));
  }, [user]);

  const editCover = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "u7lj9tra");
    axios.post(
      "https://api.cloudinary.com/v1_1/djkop1xi1/image/upload",
      formData
    );
    //   .then((response) => {
    //     userApi.editUser(user._id, {
    //       coverPicture: response.data.secure_url,
    //     });
    //   });
  };
  const editprofile = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "u7lj9tra");
    formData.append("public_id", `${currentUser._id}`);
    axios.post(
      "https://api.cloudinary.com/v1_1/djkop1xi1/image/upload",
      formData
    );
    //   .then((response) => {
    //     userApi.editUser(user._id, { profile: response.data.secure_url });
    //   });
  };

  const followUser = () => {
    // userApi.followUser(user._id, currentUser._id).then(() => {
    //   setFollowed(!followed);
    // });
  };

  return (
    <>
      <Container>
        <Box
          className="cover_img"
          onClick={() => {
            if (currentUser._id === params.id) {
              profileRef.current.click();
            }
          }}
          sx={{ height: "17rem", position: "relative" }}
        >
          <img
            src={user.coverPicture}
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            alt=""
          />
          {currentUser._id === params.id && (
            <Box
              className="cover-overlay"
              sx={{
                top: 0,
                height: "17rem",
                width: "100%",
                opacity: 0,
                backgroundColor: "rgba(0,0,0,0)",
                transition: "300ms ease-in",
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CameraAlt sx={{ color: "white" }} />
            </Box>
          )}
          <input
            style={{ display: "none" }}
            ref={coverRef}
            type="file"
            name="profile"
            onChange={editCover}
          />
        </Box>

        <Box>
          <Container sx={{ marginBottom: "3rem" }}>
            <Grid container>
              <Grid item xs={12} md={3}>
                <Box>
                  <Box
                    display="flex"
                    sx={{ flexFlow: "column" }}
                    justifyContent="center"
                    position="relative"
                  >
                    <Box sx={{ height: "6rem", width: "100%" }}>
                      <Box
                        onClick={() => {
                          if (currentUser._id === params.id) {
                            profileRef.current.click();
                          }
                        }}
                        className="test"
                        sx={{
                          height: "10rem",
                          width: "10rem",
                          borderRadius: "50%",
                          position: "absolute",
                          zIndex: 3,
                          top: { xs: "-5rem", md: "-4rem" },
                          objectFit: "cover",
                          left: "50%",
                          transform: "translate(-50%)",
                        }}
                      >
                        <img
                          className="profile_img"
                          src={user.avatar}
                          style={{
                            height: "10rem",
                            width: "10rem",
                            borderRadius: "50%",
                            position: "absolute",
                            zIndex: 3,
                            objectFit: "cover",
                            left: "50%",
                            transform: "translate(-50%)",
                          }}
                          alt=""
                        />
                        <input
                          style={{ display: "none" }}
                          ref={profileRef}
                          type="file"
                          name="profile"
                          onChange={editprofile}
                        />

                        {currentUser._id === params.id && (
                          <Box
                            className="overlay"
                            sx={{
                              height: "10rem",
                              width: "10rem",
                              borderRadius: "50%",
                              backgroundColor: "rgba(0,0,0,0)",
                              position: "absolute",
                              boxSizing: "border-box",
                              transition: "300ms ease-in",
                              objectFit: "cover",
                              left: "50%",
                              transform: "translate(-50%)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CameraAlt sx={{ color: "white" }} />
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box
                      textAlign="center"
                      sx={{ display: { xs: "none", md: "block" } }}
                    ></Box>
                  </Box>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                md={9}
                textAlign={{ xs: "center", md: "left" }}
              >
                <Box
                  display={{ xs: "block", md: "flex" }}
                  mt={{ xs: 0, md: 4 }}
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Box>
                    <Typography variant="h4" mt={1}>
                      {user.fullName}
                    </Typography>
                    <Typography variant="body1" color="text.disabled">
                      {user.about}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-evenly"
                    mt={{ xs: 2, md: 0 }}
                    width={{ xs: "100%", md: "15rem" }}
                  >
                    <Box>
                      <Typography variant="h6" textAlign="center">
                        {user?.posts?.length}
                      </Typography>
                      <Typography variant="caption">Posts</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" textAlign="center">
                        {user?.following?.length || "0"}
                      </Typography>
                      <Typography variant="caption">Following</Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6" textAlign="center">
                        {user?.followers?.length || "0"}
                      </Typography>
                      <Typography variant="caption">Followers</Typography>
                    </Box>
                  </Box>
                  <Box>
                    {currentUser._id === params.id ? (
                      <Button
                        variant="outlined"
                        sx={{
                          width: { xs: "100%", md: "fitContent" },
                          marginTop: { xs: "2rem", md: 0 },
                        }}
                        onClick={() => {
                          setOpen(true);
                        }}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        sx={{
                          width: { xs: "100%", md: "fitContent" },
                          marginTop: { xs: "2rem", md: 0 },
                        }}
                        onClick={followUser}
                      >
                        {followed ? "Unfollow" : "Follow"}
                      </Button>
                    )}
                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={() => {
                        setOpen(false);
                      }}
                      maxWidth="sm"
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle>Edit Profile</DialogTitle>
                      <EditProfile setOpen={setOpen} />
                    </Dialog>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
          <Divider />
          <Box mt={5} display={{ xs: "block", md: "none" }}>
            {posts.map((post, index) => {
              return <Posts key={index} {...post} />;
            })}
          </Box>
          <Grid
            container
            mt={5}
            spacing={2}
            display={{ xs: "none", md: "flex" }}
          >
            {posts.map((post, index) => {
              return (
                <Grid item md={3}>
                  <Box
                    height="15rem"
                    width="100%"
                    onClick={() => setDialog(true)}
                  >
                    <img
                      src={post.image}
                      alt=""
                      height="100%"
                      width="100%"
                    ></img>
                  </Box>
                  <Dialog
                    fullScreen={fullScreen}
                    open={dialog}
                    onClose={() => {
                      setDialog(false);
                    }}
                    maxWidth="sm"
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle>Edit Profile</DialogTitle>
                    <Posts post={post} />
                  </Dialog>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Profile;
