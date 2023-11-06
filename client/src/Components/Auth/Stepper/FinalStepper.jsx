import React, { useContext } from 'react'
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { AuthApi } from "../../../API/Auth";
import { signupContext } from "../Register/Register";
import { signupToggle } from "../../../Pages/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import svg from "../../../assets/Followers-rafiki.png";
const FinalStepper = () => {
  const navigate = useNavigate();
  const { setToggle } = useContext(signupToggle);
  const { signupData } = useContext(signupContext);
  const handleSubmit = () => {
    AuthApi.register(signupData)
      .then(() => {
        toast.success("Signed up Successfully");
        navigate("/login");
        setToggle(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h6">
        You're all set. Ready?
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
        <img src={svg} alt="" style={{ height: "150px", width: "100%" }} />
      </Box>
      <Button variant="outlined" onClick={handleSubmit}>
        Let me in!
      </Button>
    </Box>
  );
}

export default FinalStepper