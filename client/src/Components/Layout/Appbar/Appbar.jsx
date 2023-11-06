import { useContext, useState } from "react";
import {
  AssignmentLateOutlined,
  BookmarkOutlined,
  ChatBubbleOutlineOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Logout,
  NotificationsNoneOutlined,
  PersonAdd,
  Settings,
  SettingsOutlined,
  SlowMotionVideoOutlined,
  TurnedInNotOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from "@mui/material";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { userApi } from "../../../API/User";
import MenuList from "../../../Components/Layout/Menu/Menu";
import { AuthApi } from "../../../API/Auth";
import { setAuth } from "../../../redux/slices/userSlice";
import "./Appbar.css"
import { menuContext } from "../../../Pages/Layout/Layout";
import styled from "@emotion/styled";

const Appbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {menu, setMenu} = useContext(menuContext)
  const { user, accessToken } = useSelector((state) => state.user);
  const [searchResult, setSearchResult] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e, token) => {
    setSearchResult(null);
    if (e.target.value.length > 0) {
      userApi
        .search(e.target.value, token)
        .then((data) => {
          setSearchResult(data);
        })
        .catch(() => {
          setSearchResult(null);
        });
    } else {
      setSearchResult(null);
    }
  };

  const handleLogout = async () => {
    try {
      setAnchorEl(null);
      await AuthApi.logout();
      toast.info("Thank you for using our services! ");
      dispatch(
        setAuth({
          user: {},
          accessToken: "",
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box className="appbar">
      <Box className="menu">
        <Box sx={{ width: "30%" }}>
          <img className="logo" src={logo} alt="" />
        </Box>
        <Box className="profilsection" display={{ xs: "none", md: "flex" }}>
          <Box
            sx={{
              width: "40%",
              justifyContent: "space-around",
            }}
          >
            <MenuList />
          </Box>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar src={user.avatar} sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box display={{ xs: "flex", md:"none" }}>
          <IconButton onClick={()=>setMenu({...menu,notification:true})}>
            <NotificationsNoneOutlined
              sx={{ fontSize: "1.5rem", color: "#757575", marginRight:"1rem" }}
            />
          </IconButton>
          <IconButton>
            <ChatBubbleOutlineOutlined
              sx={{ fontSize: "1.4rem", color: "#757575" }}
            />
          </IconButton>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={() => {
              navigate(`/user/${user._id}`);
              handleClose();
            }}
          >
            <Avatar src={user.avatar} /> {user.username}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsOutlined fontSize="small" />
            </ListItemIcon>
            Settings and privacy
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SlowMotionVideoOutlined fontSize="small" />
            </ListItemIcon>
            Your Activity
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <TurnedInNotOutlined fontSize="small" />
            </ListItemIcon>
            Saved
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <AssignmentLateOutlined fontSize="small" />
            </ListItemIcon>
            Report a problem
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <LightModeOutlined fontSize="small" />
            </ListItemIcon>
            Switch Appearence
            {/* <changeTheme /> */}
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Appbar;

const changeTheme = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));