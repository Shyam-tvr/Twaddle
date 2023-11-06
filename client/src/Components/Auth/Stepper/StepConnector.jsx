import { styled } from "@mui/material/styles";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 15,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient(90deg, rgba(0,122,250,1) 0%, rgba(166,166,250,1) 58%, rgba(0,125,255,1) 100%);",
        transition: "all 0.5s ease-in",
        width: "100%",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient(90deg, rgba(0,122,250,1) 0%, rgba(166,166,250,1) 58%, rgba(0,125,255,1) 100%);",
        width: "100%",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      width: 0,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

export default ColorlibConnector;