import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { signupContext } from "../Register/Register";
import { Box, Button, Typography } from "@mui/material";
import { SensorOccupiedOutlined } from "@mui/icons-material"

const ProfileStepper = () => {
  const { stepIncrement, setsignupData, signupData } =
    useContext(signupContext);
  const [avatar, setAvatar] = useState("");
  const inputRef = useRef(null);
  const handleClick = () => {
    inputRef.current.click();
  };
  const handleFileChange = (event) => {
    setAvatar(event.target.files && event.target.files[0]);
  };
  const handleSubmit = () => {
    if(avatar){
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("upload_preset", "u7lj9tra");
      axios
        .post("https://api.cloudinary.com/v1_1/djkop1xi1/image/upload", formData)
        .then((response) => {
          setsignupData({ ...signupData, avatar: response.data.url });
        });
    }
    stepIncrement();
  };
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h5">
        Upload a Profile picture
      </Typography>
      <Box
        component="form"
        sx={{
          display: "flex",
          justifyContent: "center",
          width: { xs: "70%" },
          margin: { xs: 3 },
          alignItems: { xs: "center" },
        }}
      >
        <input
          style={{ display: "none" }}
          ref={inputRef}
          type="file"
          name="avatar"
          onChange={handleFileChange}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            height: "10rem",
            width: "10rem",
            borderRadius: "50%",
            backgroundColor: "white",
          }}
          onClick={handleClick}
        >
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              alt=""
              style={{ height: "9rem", width: "9rem", borderRadius: "50%" }}
            ></img>
          ) : (
            <SensorOccupiedOutlined sx={{ fontSize: "5rem" }} />
          )}
        </Box>
      </Box>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: "2rem" }}
          onClick={handleSubmit}
        >
          {avatar ? "Next" : "Skip"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileStepper;
