import React, { useContext, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import { Check } from '@mui/icons-material';
import { passwordValidation } from '../../../Utils/Validation/Register';
import { signupContext } from '../Register/Register';

const PasswordStepper = () => {
  const {signupData,setsignupData, stepIncrement} = useContext(signupContext);
  const [valid, setValid] = useState({});
  const [password, setPassword] = useState("")
  const [confirmPassword,SetConfirmPassword] = useState("")
  const [error,setError] = useState(false)
  const handleChange = (e) => {
    setValid(passwordValidation(e.target.value));
    setPassword(e.target.value)
  };
  const handleSubmit = () => {
    if (Object.keys(valid).length === 4) {
      if ( password === confirmPassword) {
        setsignupData({...signupData,password:password})
        stepIncrement();
      }else{
        setError(true)
      }
    }
  };
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      alignItems="center"
      justifyContent="center"
      height="100%"
    >
      <Typography sx={{ marginTop: "2rem" }} variant="h6">
        Secure your Account
      </Typography>
      <Box
        component="form"
        sx={{
          width: { xs: "70%" },
          margin: { xs: 3 },
          alignItems: { xs: "center" },
        }}
      >
        <TextField
          id="standard-basic"
          type="password"
          name="password"
          margin="dense"
          label="Password"
          variant="standard"
          onChange={handleChange}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          id="standard-basic"
          margin="dense"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          error ={error ? true : false}
          helperText={error && 'Password must be equal'}
          onChange={(e)=>{SetConfirmPassword(e.target.value)}}
          variant="standard"
          sx={{ width: { xs: "100%" } }}
        />
      </Box>
      <Box
        sx={{
          width: { xs: "70%" },
          color: "grey",
        }}
      >
        <Typography variant="body1" sx={{ fontSize: "14px" }}>
          Password should contains
        </Typography>

        <Typography
          variant="body2"
          sx={{ fontSize: "10px", marginTop: "0.25rem" }}
        >
          Minimum 8 letters
          {valid.case1 ? (
            <Check sx={{ color: "green", height: "12px" }} />
          ) : (
            ""
          )}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Atleast 1 uppercase and lowercase letters
          {valid.case2 && <Check sx={{ color: "green", height: "12px" }} />}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Atleast one number
          {valid.case3 && <Check sx={{ color: "green", height: "12px" }} />}
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "10px" }}>
          Atleast one special character
          {valid.case4 && <Check sx={{ color: "green", height: "12px" }} />}
        </Typography>
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
}

export default PasswordStepper