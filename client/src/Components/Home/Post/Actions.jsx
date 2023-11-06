import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Dialog, Divider, List, ListItem } from "@mui/material";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";

const Actions = ({ handleClose, id, author }) => {
  const user_id = useSelector((state) => state.user.user._id);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [component, setComponent] = useState("");

  const handleComponent = () => {
    switch (component) {
      case "edit":
        return <EditPost handleClose={handleClose} id={id}/>;
      default:
        break;
    }
  };

  const listStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0.5rem 0",
    cursor:"pointer"
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={true}
        aria-labelledby="responsive-dialog-title"
        maxWidth="lg"
      >
        {component.length > 0 ? (
          handleComponent()
        ) : (
          <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <List
              sx={{
                width: { xs: "100vw", md: "25rem" },
                border: "1px solid #dbdbdb",
              }}
            >
              {author === user_id ? (
                <>
                  <ListItem
                    sx={listStyle}
                    onClick={() => {
                      setComponent("edit");
                    }}
                  >
                    Edit
                  </ListItem>
                  <Divider />
                  <ListItem sx={listStyle}>Delete</ListItem>
                  <Divider />
                </>
              ) : (
                <>
                  <ListItem sx={listStyle}>Report</ListItem>
                  <Divider />
                  <ListItem sx={listStyle}>Unfollow</ListItem>
                  <Divider />
                </>
              )}

              <ListItem sx={listStyle}>Go to post</ListItem>
              <Divider />
              <ListItem sx={listStyle}>share to</ListItem>
              <Divider />
              <ListItem sx={listStyle}>copy link</ListItem>
              <Divider />
              <ListItem
                sx={listStyle}
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </ListItem>
            </List>
          </Box>
        )}
      </Dialog>
    </>
  );
};

export default Actions;
