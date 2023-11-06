import React, { useContext, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { userDetails } from "../../../Utils/Validation/Register";
import { AuthApi } from "../../../API/Auth";
import { useNavigate } from "react-router-dom";
import { signupContext } from "../Register/Register";
import { toast } from "react-toastify";
import { signupToggle } from "../../../Pages/Auth/Auth";

const UserStepper = () => {
  const navigate = useNavigate();
  const { stepIncrement, setsignupData, signupData } =
    useContext(signupContext);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    email: "",
    mobile: "",
  });

  const { setToggle } = useContext(signupToggle);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const getOtp = () => {
    AuthApi.getOtp(data.mobile);
  };

  const handleSubmit = () => {
    setError(userDetails(data));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      try {
        setsignupData({ ...signupData, ...data });
        AuthApi.userExist(data).then(()=>{
          getOtp();
          stepIncrement();
        })
        .catch((error) => {
        toast.info(error);
        navigate("/login");
        setToggle(false);
      });
      } catch (error) {
        console.log(error)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, submit]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h5">
        Tell us more about you!
      </Typography>

      <Box
        component="form"
        sx={{
          width: { xs: "70%" },
          margin: { xs: 1 },
          alignItems: { xs: "center" },
        }}
      >
        <TextField
          margin="dense"
          label="Full Name"
          variant="standard"
          name="fullName"
          onChange={handleChange}
          error={error.fullName ? true : false}
          helperText={error.fullName && `${error.fullName}`}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          margin="dense"
          label="E-mail"
          name="email"
          error={error.email ? true : false}
          helperText={error.email && `${error.email}`}
          variant="standard"
          onChange={handleChange}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          margin="dense"
          name="mobile"
          label="Mobile Number"
          variant="standard"
          error={error.mobile ? true : false}
          helperText={error.mobile && `${error.mobile}`}
          onChange={handleChange}
          sx={{ width: { xs: "100%" } }}
        />
      </Box>
      <Box>
        <Button
          variant="outlined"
          sx={{ margin: "2rem" }}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default UserStepper;
