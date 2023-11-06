import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { AuthApi } from '../../../API/Auth';
import { usernameValidation } from '../../../Utils/Validation/Register';
import { signupContext } from '../Register/Register';

const UsernameStepper = () => {
  const {signupData,setsignupData,stepIncrement} = useContext(signupContext)
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState("")
  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const handleSubmit = () => {
    setError(usernameValidation(username));
    AuthApi.usernameValid(username)
    .then(()=>{
      setSubmit(true);
    })
    .catch(()=>{
      toast.warning("username already taken")
    })
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      setsignupData({...signupData,username:username})
      stepIncrement()
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error,submit]);
    return (
        <Box 
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        >
          <Typography sx={{marginTop : '2rem'}} variant='h6'>Set a unique username</Typography>
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
            type='text'
            margin="dense"
            label="username"
            variant="standard"
            error ={error.username ? true : false}
            helperText={error.username && `${error.username}`}
            onChange={handleChange}
            sx={{ width: { xs: "100%" } }}
          />
        </Box>
        <Box>
          <Button variant='outlined' sx={{margin:'2rem'}} onClick={handleSubmit}>Next</Button>
        </Box>
        </Box>
    )
}

export default UsernameStepper