import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
let socket;
const ENDPOINT = "http://localhost:8000";

export const SocketClient = () => {
  const { user } = useSelector(state => state.user)
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
  }, []);

  return 
};


