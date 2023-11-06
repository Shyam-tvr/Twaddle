import { Check, LockOutlined, VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Box,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify"
import { passwordValidation } from "../../Utils/Validation/Register";
import { AuthApi } from "../../API/Auth";
import "./ResetPassword.css"

const ResetPassword = () => {
  const { token } = useParams() ;
  const navigate = useNavigate()
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [valid, setValid] = useState({});
  const [showPassword,setShowPassword] = useState(false)
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");
  const [error, setError] = useState (false)
  const [id, setId] = useState ("")
  
  useEffect(()=>{
    (async () => {
      try {
        const { user } = await AuthApi.verifyToken(token)
        setId(user)
      } catch (error) {
        setError(true)
      }
    })();
  },[])

  const handleChange = (e) => {
    setValid(passwordValidation(e.target.value));
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (Object.keys(valid).length === 4) {
      if ( password === c_password) {
        console.log({password,id})
        AuthApi.resetPassword(id,password).then(()=>{
          navigate('/login')
        })
      }else{
        toast.warning("Password should be match")
      }
    }
  }
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="responsive-dialog-title"
        maxWidth="sm"
      >
        <Box sx={{ margin: "auto", width: "20rem", padding: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "1rem",
            }}
          >
            <IconButton>
              <LockOutlined sx={{ fontSize: "50px" }} />
            </IconButton>
            <Typography sx={{ fontWeight: "bold", fontSize: "larger" }}>
              Create A Strong Password
            </Typography>
            <Typography
              variant="caption"
              textAlign="center"
              marginY="5px"
              color="GrayText"
            >
              Your password must be at least 8 characters and should include a
              combination of numbers, letters and special characters (!$@%).
            </Typography>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems=""
              marginY="1rem"
              gap="10px"
              width="100%"
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="New password"
                name="password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined sx={{width:"24px",color:"GrayText"}} />
                        ) : (
                          <VisibilityOutlined sx={{width:"24px",color:"GrayText"}} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="Confirm new password"
                name="c_password"
                type="password"
                onChange={(e)=>setC_Password(e.target.value)}
              />
              <Box
                sx={{
                  color: "grey",
                  marginY: "1rem",
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
                  {valid.case2 && (
                    <Check sx={{ color: "green", height: "12px" }} />
                  )}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "10px" }}>
                  Atleast one number
                  {valid.case3 && (
                    <Check sx={{ color: "green", height: "12px" }} />
                  )}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: "10px" }}>
                  Atleast one special character
                  {valid.case4 && (
                    <Check sx={{ color: "green", height: "12px" }} />
                  )}
                </Typography>
              </Box>
              <button
                style={{
                  backgroundColor: "#1976d2",
                  border: "none",
                  color: "white",
                  width: "100%",
                  padding: "10px 1rem",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={handleSubmit}
              >
                Reset Password
              </button>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ResetPassword;
