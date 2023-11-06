import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  Box, Divider, IconButton, ListSubheader, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import "./suggetion.css";
import { userApi } from "../../../API/User";

export default function Suggetion() {
  const navigate = useNavigate();
  const { accessToken } = useSelector(state => state.user)
  const [suggetion, setSuggetion] = useState([]);
  const getSuggetion = () => {
    userApi.suggestions(accessToken).then((data) => {
      setSuggetion(data);
    });
  };
  const followUser = (id) => {
    // userApi.followUser(id, user._id).then(() => {
    //   setFollowed(!followed);
    // });
  };
  useEffect(() => {
    getSuggetion();
  }, []);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Suggested Friends
        </ListSubheader>
      }
    >
      <Divider />
      {suggetion?.length ? (
        suggetion.map((user, index) => (
          <ListItem
            key={index}
            sx={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/${user._id}`);
            }}
            secondaryAction={
              <IconButton
                aria-label="comment"
                onClick={() => followUser(user._id)}
              >
                <PersonAddAltIcon />
              </IconButton>
            }
          >
            <ListItemAvatar> 
              <Avatar src={user?.avatar} />  
            </ListItemAvatar>
            <ListItemText sx={{ fontSize: "1px" }} primary={user.username} />
          </ListItem>
        ))
      ) : (
        <Box>
          <ListSubheader component="div" id="nested-list-subheader">
            No Suggetions
          </ListSubheader>
        </Box>
      )}
    </List>
  );
}
