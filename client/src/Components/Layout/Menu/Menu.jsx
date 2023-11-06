import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddToPhotos,
  Apps,
  ChatBubbleOutlineOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Card, Dialog, IconButton, Tooltip } from "@mui/material";
import ListGroup from "../Notifications/Notifications";
import Addpost from "../AddPost/Addpost";
import "./Menu.css";
import { menuContext } from "../../../Pages/Layout/Layout";
import Search from "../../Home/Search/Search";

const Menu = () => {
  const navigate = useNavigate();
  const { menu, setMenu } = useContext(menuContext);
  const [searchDialog, setSearchDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box display="flex" justifyContent="space-around" width="100%">
        <Tooltip title="Home">
          <IconButton>
            <Apps onClick={() => navigate("/")} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chats">
          <IconButton>
            <ChatBubbleOutlineOutlined
              sx={{ fontSize: "1.5rem", color: "#757575" }}
            />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add Post">
          <IconButton onClick={() => setMenu({ ...menu, addPost: true })}>
            <AddToPhotos sx={{ fontSize: "1.5rem", color: "#757575" }} />
          </IconButton>
        </Tooltip>
        <Dialog
          fullScreen={fullScreen}
          open={menu.addPost}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          <Addpost />
        </Dialog>
        <Tooltip title="Notifications">
          <IconButton onClick={() => setMenu({ ...menu, notification: true })}>
            <NotificationsNoneOutlined
              sx={{ fontSize: "1.5rem", color: "#757575" }}
            />
          </IconButton>
        </Tooltip>
        <Dialog
          fullScreen={fullScreen}
          open={menu.notification}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          <ListGroup />
        </Dialog>
        <Tooltip title="Search">
          <IconButton
            onClick={() => {
              setSearchDialog(true);
            }}
          >
            <SearchOutlined sx={{ fontSize: "1.5rem", color: "#757575" }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Dialog
        fullScreen={fullScreen}
        open={searchDialog}
        onClose={() => {
          setSearchDialog(false);
        }}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        <Card
          sx={{
            minWidth: { xs: "100%", md: "20rem" },
            padding:"1rem",
            height: { xs: "100%", md: "30rem" },
          }}
        >
          <Search search={setSearchDialog}/>
        </Card>
      </Dialog>
    </>
  );
};

export default Menu;
