import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./Pages/Auth/Auth";
import Home from "./Pages/Home/Home";
import RequireAuth from "./Utils/requireAuth";
import "./App.css";
import Forgotpassword from "./Components/Forgotpassword/Forgotpassword";

function App() {
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
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/forgot" element={<Forgotpassword />} />
          {/* Private Routes */}
          <Route element={<RequireAuth />}>
            <Route exact path="/" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
