import React, { createContext, useEffect, useState } from 'react'
import { Box } from '@mui/material'
import UserStepper from '../Stepper/UserStepper';
import OtpStepper from '../Stepper/OtpStepper';
import ProfileStepper from '../Stepper/ProfileStepper';
import UsernameStepper from '../Stepper/UsernameStepper';
import PasswordStepper from '../Stepper/PasswordStepper';
import FinalStepper from '../Stepper/FinalStepper';
import CustomizedSteppers from '../Stepper/Stepper';
export const signupContext = createContext();

const Register = () => {
  const [signupData,setsignupData]=useState({
    fullName: "",
    email: "",
    phone: "",
    profile : "",
    username : "",
    password : ""
  })
  const [step, setStep] = useState(0);
  const currentStep = (param) => {
    switch (param) {
      case 0:
        return <UserStepper />
      case 1:
        return <OtpStepper />
      case 2:
        return <ProfileStepper />
      case 3:
        return <UsernameStepper />
      case 4:
        return <PasswordStepper />
      case 5: 
        return <FinalStepper />
      default : 
        return <UserStepper />
    }
  };
  const stepIncrement = () => {
    setStep(step + 1);
  };
  const stepDecrement = () => {
    setStep(step - 1);
  }
  return (
      <>
        <Box xs={12} width='100%'>
          <CustomizedSteppers step={step} />
        </Box>
        <Box width='100%' height="80%" sx={{display: "flex",flexDirection: "column",alignItems: "center",}}>
          <signupContext.Provider value={{ signupData,setsignupData,stepIncrement,stepDecrement, step }}>
            {currentStep(step)}
          </signupContext.Provider>
        </Box>
      </>
  );
}

export default Register