import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Box, Button, Dialog, IconButton, InputAdornment, Link, TextField, Typography, useMediaQuery } from '@mui/material';
import { AuthApi } from '../../../API/Auth';
import Forgotpassword from '../Forgotpassword/Forgotpassword';
import { loginValidation } from '../../../Utils/Validation/login';
import { setAuth } from '../../../redux/slices/userSlice';
import { signupToggle } from '../../../Pages/Auth/Auth';
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { useTheme } from "@mui/material/styles";

const Login = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({email: "", password: "",});
  const [showPassword,setShowPassword] = useState(false)
  let navigate = useNavigate();
  const { setToggle } = useContext(signupToggle);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setError(loginValidation(data));
    setSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && submit) {
      const promise = AuthApi.login(data)
      promise.then((response) => {
        dispatch(setAuth(response))
        toast.success("Logined succesfuly");
        localStorage.setItem("loggedin", "true");
        navigate("/")
      }).catch((err)=>{
        console.log(err)
        toast.error("Invalid credentials")
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, submit]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
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
          margin="dense"
          label="Email"
          variant="standard"
          value={data.email}
          onChange={handleChange}
          name="email"
          error={error.email ? true : false}
          helperText={error.email && `${error.email}`}
          sx={{ width: { xs: "100%" } }}
        />
        <TextField
          id="standard-basic"
          margin="dense"
          label="Password"
          variant="standard"
          name="password"
          value={data.password}
          error={error.password ? true : false}
          helperText={error.password && `${error.password}`}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>setShowPassword(!showPassword)} sx={{marginRight:"1rem"}}>
                  {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ width: { xs: "100%" } }}
        />
        <Link
          style={{
            textDecoration: "none",
            color: "#1976d2",
            fontSize: "0.8rem",
            marginTop: "0.7rem",
            cursor:"pointer"
          }}
          onClick={() => setOpen(true)}
        >
          Forgot Password
        </Link>
        <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
      >
        <Forgotpassword setOpen={setOpen}/>
      </Dialog>
        <Button
          variant="outlined"
          sx={{ marginTop: 4, marginBottom: 3 }}
          fullWidth
          onClick={handleSubmit}
        >
          Login
        </Button>
        <Typography variant="body2" fontSize="0.7rem">
          You don't have an account ?{" "}
          <Link
            to={"/register"}
            style={{ textDecoration: "none", color: "#1976d2",cursor:"pointer" }}
            onClick={()=>{setToggle(true); navigate('/register')}}
          >
            Signup
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}

export default Login