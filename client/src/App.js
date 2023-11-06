import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box, LinearProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import RequireAuth from "./Utils/requireAuth";
import "./App.css";
import Forgotpassword from "./Components/Auth/Forgotpassword/Forgotpassword";
import Layout from "./Pages/Layout/Layout";
import Profile from "./Pages/Profile/Profile";
import io from 'socket.io-client'
import { useSelector } from "react-redux";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
try {
  const socket = io.connect("http://localhost:3001");
} catch (error) {
  console.log(error)
}

function App() {
  const { mainLoader } = useSelector(state=> state.alert)
  const { user } = useSelector(state => state.user)
  // useEffect(() => {
  //   socket.emit("setup", user);
  // }, []);
  return (
    <Box className="App">
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={"dark"}
      />
      {mainLoader && <LinearProgress />}
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/forgot" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<ResetPassword />} />
          
          {/* Private Routes */}
          <Route element={<RequireAuth />}>
            <Route element={<Layout />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/user/:id" element={<Profile />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;