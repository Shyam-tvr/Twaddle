import { Close, LockOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, TextField, Typography } from "@mui/material";
import "./Forgotpassword.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { signupToggle } from "../../../Pages/Auth/Auth";
import { AuthApi } from "../../../API/Auth";
import { toast } from "react-toastify"

const Forgotpassword = ( {setOpen} ) => {
  const navigate = useNavigate()
  const { setToggle } = useContext(signupToggle);
  const [formData,setFormData] = useState("")
  const handleClose = () => setOpen(false)
  const register = async () => {
    setOpen(false)
    setToggle(true)
    navigate("/register")
  }
  const handleChange = (e) => {
    setFormData(e.target.value)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(formData.length > 3){
      try {
        const msg = await AuthApi.forgotPassword(formData)
        toast.info(msg)
      } catch (error) {
        
      }
    } else {
      toast.warning("Invalid Entry");
    }
  }
  return (
    <Box sx={{ margin: "auto", width: "20rem", padding: "1rem" }}>
      <IconButton sx={{ display:{xs:"none",sm:"block"},position:"absolute", top:"5px", right:"5px"}}  onClick={handleClose}>
        <Close />
      </IconButton>
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
          Trouble logging in?
        </Typography>
        <Typography
          variant="caption"
          textAlign="center"
          marginY="5px"
          color="GrayText"
        >
          Enter your email, phone, or username and we'll send you a link to get
          back into your account.
        </Typography>
        <Box component="form" display="flex" flexDirection="column" alignItems="center" marginY="1rem" gap="10px">
          <TextField
            id="outlined-basic"
            variant="outlined"
            placeholder="Email, Phone, or Username"
            name="recovery"
            onChange={handleChange}
          />
          <button
            style={{
              backgroundColor: "#1976d2",
              border: "none",
              color: "white",
              padding: "10px 1rem",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleSubmit}
          >
            Send Recovery Link
          </button>
        </Box>
        <Box sx={{display:"flex", alignItems:"center", marginY:"1rem"}}>
          <Divider sx={{width:"7rem"}}/>
          <Typography variant="caption" color="GrayText" marginX="1rem">OR</Typography>
          <Divider sx={{width:"7rem"}}/>
        </Box>
        <Typography variant="caption" onClick={register} sx={{ fontWeight: "bolder", cursor:"pointer" }}>
          Create new account
        </Typography>
      </Box>
      <Box display={{xs:"flex",sm:"none"}} justifyContent="center" position="absolute" bottom="0" paddingY="1rem" width="20rem" marginTop="2rem">
      <Typography variant="caption" sx={{ fontWeight: "bolder",cursor:"pointer" }} onClick={handleClose}>
          Back to Login
        </Typography>
      </Box>
    </Box>
  );
};

export default Forgotpassword;
