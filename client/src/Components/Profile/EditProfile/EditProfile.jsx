import React, { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import "./EditProfile.css";
import { userApi } from "../../../API/User";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../../redux/slices/userSlice";

const EditProfile = ({ setOpen }) => {
  const { user, accessToken } = useSelector(state => state.user)
  const [data, setData] = useState({});
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    userApi.editUser(data, accessToken).then((res) => {
      dispatch(setAuth({user: res.user}))
      setOpen(false);
    });
  };

  return (
    <>
      <Box sx={{ maxWidth: "600px", textAlign: "center", margin: "10px" }}>
        <TextField
          id="outlined-helperText"
          label="Full Name"
          name="fullName"
          defaultValue={user?.fullName}
          sx={{ margin: "0.5rem", padding: "0" }}
          onChange={handleChange}
        />
          <TextField
            id="outlined-helperText"
            label="About"
            name="about"
            defaultValue={user?.about}
            sx={{ margin: "0.5rem", padding: "0" }}
            onChange={handleChange}
          />
        <TextField
          id="outlined-helperText"
          label="Email"
          name="email"
          defaultValue={user?.email}
          sx={{ margin: "0.5rem", padding: "0" }}
          onChange={handleChange}
        />
        <TextField
          id="outlined-helperText"
          label="Mobile"
          name="mobile"
          defaultValue={user?.mobile}
          sx={{ margin: "0.5rem", padding: "0" }}
          onChange={handleChange}
        />
        <TextField
          id="filled-multiline-static"
          label="Address"
          name="address"
          defaultValue={user?.address}
          multiline
          rows={3}
          sx={{ margin: "0.5rem", padding: "0" }}
          variant="filled"
          onChange={handleChange}
        />
        <TextField
          id="outlined-helperText"
          label="Website"
          name="website"
          defaultValue={user?.website}
          sx={{ margin: "0.5rem", padding: "0" }}
          onChange={handleChange}
        />
        <Button
          sx={{ margin: "1rem" }}
          variant="contained"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default EditProfile;
