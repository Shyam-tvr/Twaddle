import React from "react";
import {
  Box,
  Dialog,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "./Story.css";
import { useState } from "react";
// import { storyApi } from "../../../utils/axiosClient";
import { useEffect } from "react";
// import Addstory from "../AddStory/Addstory";
import { useSelector } from "react-redux";
const Story = () => {
  const user = useSelector((state)=>state.user.user)
  const [ stories, setStories] = useState([])
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  // useEffect(()=>{
  //     storyApi.getTimeline(user._id).then((response)=>{
  //       setStories(response)
  //     })
  // },[])

  const dialogClose = () => {
    setOpen(false);
  };

  const handleClick = (story) => {
    setOpen(true);
  };
  return (
    <>
      <Box className="stories">
        <Box className="story" onClick={handleClick}>
          <Box className="storyBorder">
            <span>
              <img
                className="span"
                src={user?.avatar}
                alt=""
              />
            </span>
            <Typography variant="caption">Your_story</Typography>
          </Box>
        </Box>
        {
        stories?.map((story,index)=>(
          <Box key={index} className="story" onClick={()=>handleClick(story)}>
          <Box className="storyBorder">
            <span>
              <img
                className="span"
                src={user.avatar}
                alt=""
              />
            </span>
            <Typography variant="caption">{story.userId.username}</Typography>
          </Box>
        </Box> 
        ))}
        {/* <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={dialogClose}
          maxWidth='xs'
          aria-labelledby="responsive-dialog-title"
        >
          <Addstory setOpen={setOpen}/>
        </Dialog> */}
      </Box>
    </>
  );
};

export default Story;