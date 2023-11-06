import { useContext, useEffect, useState } from 'react'
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { signupContext } from "../Register/Register";
import OtpInput from "react-otp-input";
import { toast } from 'react-toastify';
import { AuthApi } from '../../../API/Auth';
const OtpStepper = () => {
  const { stepIncrement, signupData } = useContext(signupContext);
  const [otp, setOtp] = useState("");
  const [submit, setSubmit] = useState(false)
  const handleChange = (otp) => {
    setOtp(otp);
  };
  const handleSubmit = () => {
    if(otp.length === 6){
      setSubmit(true)
    }else{
      toast.error("invalid otp")
    }
  };

  useEffect(()=>{
    if (submit) {
      AuthApi.verifyOtp(signupData.mobile,otp).then(() => {
        stepIncrement();
      });
    }
// eslint-disable-next-line react-hooks/exhaustive-deps  
  },[submit])

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h6">
        Enter OTP
      </Typography>
      <Typography variant="body1" sx={{ color: "GrayText", fontSize: "10px" }}>
        OTP is sended to{" "}
        <span style={{ fontWeight: "bold" }}>{signupData.mobile}</span>
      </Typography>
      <Box>
        <OtpInput
          value={otp}
          onChange={handleChange}
          numInputs={6}
          shouldAutoFocus
          inputStyle={{
            width: "1.5rem",
            border: "none",
            borderBottom: "2px solid blue",
            backgroundColor: "unset",
            margin: "2rem 0.5rem",
          }}
          isInputNum={true}
        />
      </Box>
      <Typography variant="caption">Didn't recieve the Code ?</Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "14px",
          fontWeight: 800,
          color: "#1976d2",
          cursor: "pointer",
        }}
      >
        Resend
      </Typography>
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
}

export default OtpStepper