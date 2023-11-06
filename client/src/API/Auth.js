import { postDataAPI } from "./axiosClient";

export const AuthApi = {
  getOtp: async (mobile) => {
    try {
      const response = await postDataAPI("auth/getotp", { mobile });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to get OTP");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },

  userExist: async ({ mobile, email }) => {
    try {
      const response = await postDataAPI("auth/user", { mobile, email });
      if (response.status === 200){
        return response.data
      }else {
        throw new Error(response.data.msg);
      }
    }  catch (error) {
      if (error.response) {
        // If a response was received, but with an error status code (e.g., 4xx or 5xx)
        if (error.response.status === 500) {
          console.log("Internal Server Error");
        } else {
          console.log("Error:", error.response.data.msg);
        }
      } else if (error.request) {
        // If no response was received, it indicates a network error or server downtime
        console.log("Network Error or Server Down");
      } else {
        // For any other type of error
        throw error;
      }
    }
  },

  verifyOtp: async (mobile, otp) => {
    try {
      const response = await postDataAPI("auth/verifyotp", { mobile, otp });
      if (response.status === 200) {
        return;
      } else {
        throw new Error("Failed to verify OTP");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },

  register: async (data) => {
    try {
      const response = await postDataAPI("auth/register", { ...data });
      if (response.status === 200) {
        // Successful response
        return;
      } else {
        // Handle other status codes if needed
        throw new Error("Failed to register");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        throw error;
      }
    }
  },

  usernameValid: async (username) => {
    try {
      const response = await postDataAPI("auth/usernamevalid", { username });
      if (response.status === 200) {
        // Successful response
        return;
      } else {
        // Handle other status codes if needed
        throw new Error("Invalid username");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        throw error;
      }
    }
  },

  login: async (data) => {
    try {
      const response = await postDataAPI("auth/login", { ...data });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("invalid Credentials");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error.response.data);
      } else {
        throw error;
      }
    }
  },

  forgotPassword: async (formData) => {
    try {
      const response = await postDataAPI("auth/forgotpassword", { formData });
      if (response.status === 201) {
        // Successful response
        return response.data.msg;
      } else {
        // Handle other status codes if needed
        console.log(response)
        throw new Error("Failed to request password reset");
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        console.log(error);
      }
    }
  },

  logout: async () => {
    try {
      const response = await postDataAPI("auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("loggedin")
        return 
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        throw error;
      }
    }
  },

  refreshToken: async () => {
    try {
      const response = await postDataAPI("auth/refresh_token");
      if (response.status === 200) {
        // Successful response
        return response.data;
      } else if(response.status === 401){
        // Handle other status codes if needed
        throw new Error(response.data?.msg);
      } else {
        throw new Error("something went wrong")
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.log("Internal Server Error");
      } else {
        throw error;
      }
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await postDataAPI("auth/verify_token",{ token });
      console.log(response)
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      } else {
        console.log("something went wrong")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data)
      } else {
        console.log("internal server error");
      }
    }
  },

  resetPassword: async (id, password) => {
    try {
      const response = await postDataAPI(`auth/resetpassword/${id}`,{ password });
      console.log(response)
      if (response.status === 200) {
        console.log(response.data)
        return response.data;
      } else {
        console.log("something went wrong")
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data)
      } else {
        console.log("internal server error");
      }
    }
  }
};