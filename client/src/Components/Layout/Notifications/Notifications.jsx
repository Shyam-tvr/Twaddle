import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import IconButton from "@mui/material/IconButton";
import { Card, Divider, ListSubheader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { NavigateBeforeOutlined } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { menuContext } from "../../../Pages/Layout/Layout";
import { notifyApi } from "../../../API/Notify";
import { useSelector } from "react-redux";

const Notifications = () => {
  const { menu, setMenu } = useContext(menuContext);
  const token = useSelector((state) => state.user.accessToken);
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { notifies } = await notifyApi.getNotifies(token);
        setNotifications(notifies);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Card
      sx={{
        minWidth: { xs: "100%", md: "20rem" },
        height: { xs: "100%", md: "25rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          padding: { xs: "8px", md: "3px" },
          maxWidth: { md: "44rem" },
          borderBottom: "1px solid #dbdbdb",
        }}
      >
        <IconButton
          sx={{
            marginRight: "10px",
            color: "black",
            padding: 0,
          }}
          onClick={() => setMenu({ ...menu, notification: false })}
        >
          <NavigateBeforeOutlined />
        </IconButton>
        <Typography
          sx={{ fontWeight: "600", fontSize: { xs: "16px", md: "13px" } }}
        >
          Notifications
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            right: "1rem",
            fontWeight: "600",
            fontSize: { xs: "16px", md: "13px" },
            color: "#1976d2",
            cursor: "pointer",
          }}
        >
          clear
        </Typography>
      </Box>
      <List
        sx={{
          width: "100%",
          minWidth: 250,
          maxWidth: 300,
          bgcolor: "background.paper",
        }}
      >
        {notifications.length ? (
          notifications.map((notification) => (
            <ListItem
              key={notification._id}
              secondaryAction={
                <IconButton aria-label="comment">
                  {notification.followedBy && <PersonAddAltIcon />}
                </IconButton>
              }
              sx={{position:"relative",width:"100%"}}
            >
              <img
                src={notification.user.avatar}
                alt=""
                style={{
                  height: "1.5rem",
                  width: "1.5rem",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              />
              <Box
                sx={{
                  display: "flex",
                  width: "calc(100%-4rem)",
                  position: "relative",
                }}
              >
                <Typography sx={{ fontSize: { xs: "15px", md: "13px" } }}>
                  {notification.isLiked
                    ? `${notification.user.username} liked your post.`
                    : `${notification.user.username} started followed you.`}
                </Typography>
              </Box>
              {notification.isLiked && (
                <img
                  src={notification.isLiked.files[0].url}
                  alt=""
                  height="30px"
                  width="30px"
                  style={{
                    objectFit: "cover",
                    position: "absolute",
                    right: "1rem",
                  }}
                />
              )}
            </ListItem>
          ))
        ) : (
          <ListSubheader component="div" id="nested-list-subheader">
            No Notifications
          </ListSubheader>
        )}
      </List>
    </Card>
  );
};

export default Notifications;
