import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { createContext, useState } from "react";
import Appbar from "../../Components/Layout/Appbar/Appbar";
import BottomNav from "../../Components/Layout/BottomNav/BottomNav";

export const menuContext = createContext()

const Layout = () => {
  const [menu, setMenu] = useState({
    addPost: false,
    notification: false
  })
  return (
    <>
      <menuContext.Provider value={{menu,setMenu}} >
        <Appbar />
        <Outlet />
        <Box display={{ xs: "flex", md: "none" }}>
          <BottomNav />
        </Box>
      </menuContext.Provider>
    </>
  );
};

export default Layout;
