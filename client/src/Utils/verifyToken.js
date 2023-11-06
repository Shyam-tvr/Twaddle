import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AuthApi } from "../API/Auth";
import { setAuth } from "../redux/slices/userSlice";

const RequireAuth = () => {
  const isLoggedin = localStorage.getItem("loggedin");
  const dispatch= useDispatch()
  if (accessToken) {
    return <Outlet />
  } else if (isLoggedin==="true") {
    AuthApi.refreshToken().then((data)=>{
      dispatch(setAuth(data))
      return <Outlet />
    })
  } else {
    return <Navigate to="/login"/>
  }
};

export default RequireAuth;
