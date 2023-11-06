import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import { Stepper, Step, StepLabel, Stack } from "@mui/material";
import { Person, Key, ImageOutlined, Password, Badge } from "@mui/icons-material";
import ColorlibConnector from "./StepConnector";

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "blue",
  padding: 2,
  width: 25,
  height: 25,
  display: "flex",
  borderRadius: "50%",
  transition: "all  ease-in 0.2s 0.5s",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "white",
    border: "1px solid blue",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    color: "white",
    border: "1px solid white",
    backgroundColor: "blue",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = React.useMemo(
    () => [
      <Person />,
      <Password />,
      <ImageOutlined />,
      <Badge fontSize="16px" />,
      <Key />,
    ],
    []
  );

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[icon - 1]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = [
  "Tell us more about you",
  "OTP",
  "Upload profile image",
  "Secure your Account",
  "Finish",
];

export default function CustomizedStepper({ step }) {
  if (step < 0 || step >= steps.length) {
    console.warn("Step prop is out of range.");
  }

  return (
    <Stack sx={{ width: "100%", marginTop: "2rem" }} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={step}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon} icon={index + 1} />
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

CustomizedStepper.propTypes = {
  step: PropTypes.number.isRequired,
};
