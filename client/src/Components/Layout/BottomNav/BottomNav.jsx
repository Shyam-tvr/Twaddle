import {
  AddCircleOutline,
  HomeOutlined,
  LocalFireDepartmentOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { menuContext } from "../../../Pages/Layout/Layout";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Search from "../../Home/Search/Search";

const BottomNav = () => {
  const navigate = useNavigate();
  const { menu, setMenu } = useContext(menuContext);
  const [value, setValue] = useState(0);
  const [search, setSearch] = useState(false);
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            icon={<HomeOutlined sx={{ fontSize: "30px" }} />}
            onClick={() => navigate("/")}
          />

          <BottomNavigationAction
            icon={<SearchOutlined sx={{ fontSize: "25px" }} />}
            onClick={() => {
              setSearch(true);
            }}
          />

          <BottomNavigationAction
            icon={<AddCircleOutline sx={{ fontSize: "25px" }} />}
            onClick={() => setMenu({ ...menu, addPost: true })}
          />

          <BottomNavigationAction
            icon={<LocalFireDepartmentOutlined sx={{ fontSize: "25px" }} />}
          />

          <BottomNavigationAction
            icon={
              <Avatar
                src={user.avatar}
                sx={{ width: "28px", height: "28px", borderRadius: "50%" }}
              />
            }
            onClick={() => navigate(`/user/${user._id}`)}
          />
        </BottomNavigation>
      </Paper>
      <Drawer open={search} setOpen={setSearch} />
    </>
  );
};

export default BottomNav;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const Drawer = (props) => {
  const { window, open, setOpen } = props;

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: "75%",
            overflow: "visible",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 1,
            pt: 3,
            height: "100%",
            overflow: "auto",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        >
          <Search search = {setOpen}/>
        </StyledBox>
      </SwipeableDrawer>
    </>
  );
};

Drawer.propTypes = {
  window: PropTypes.func,
};
