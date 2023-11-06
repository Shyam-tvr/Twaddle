import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";

const Carousel = ({ files, width, height }) => {
  const [active, setActive] = useState(0);
  const [forwordIcon, setForwordIcon] = useState(files.length > 1 && true);
  const [backwordIcon, setBackwordIcon] = useState(false);
  const handleBackword = () => {
    if (active === 1) {
      setBackwordIcon(false);
    }
    if (active === files.length - 1) {
      setForwordIcon(true);
    }
    setActive(active - 1);
  };

  const handleForword = () => {
    if (active === 0) {
      setBackwordIcon(true);
    }
    if (active === files.length - 2) {
      setForwordIcon(false);
    }
    setActive(active + 1);
  };

  return (
    <Box
      width={width}
      height={"calc(100%-1rem)"}
      sx={{
        position: "relative",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems:"center"
      }}
    >
      {files.length > 0 && (
        <>
          {files[active].url ? (
            <>
              {files[active].url.match(/video/i) ? (
                <video
                  autoPlay
                  loop
                  src={files[active].url}
                  style={{ height: height, width: width }}
                  alt=""
                />
              ) : (
                <img
                  src={files[active].url}
                  alt=""
                  style={{ height: height, objectFit: "cover" }}
                />
              )}
            </>
          ) : (
            <>
              {files[active].type.match(/video/i) ? (
                <video
                  autoPlay
                  loop
                  src={URL.createObjectURL(files[active])}
                  style={{ height: height, width: width }}
                  alt=""
                />
              ) : (
                <img
                  src={URL.createObjectURL(files[active])}
                  alt=""
                  style={{ height: height, objectFit: "cover", maxWidth:"22.5rem" }}
                />
              )}
            </>
          )}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 5,
              height: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            {backwordIcon && (
              <IconButton sx={{backgroundColor:"whitesmoke",border:"1px solid #dbdbdb"}} onClick={handleBackword}>
                <ArrowBackIosNew />
              </IconButton>
            )}
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 5,
              height: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: 2,
            }}
          >
            {forwordIcon && (
              <IconButton sx={{backgroundColor:"whitesmoke",border:"1px solid #dbdbdb"}} onClick={handleForword}>
                <ArrowForwardIos />
              </IconButton>
            )}
          </Box>
        </>
      )}
    </Box>
  )};

export default Carousel;
