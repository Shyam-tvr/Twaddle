import { postDataAPI } from "./axiosClient";

export const AuthApi = {

    getOtp: (phone) => {
      postDataAPI("auth/getotp", { phone: phone })
        .then(() => {
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  
    userExist: async (phone, email) => {
      postDataAPI("auth/user", { phone: phone, email: email })
        .then(() => {
          return;
        })
        .catch((error) => {
          throw error;
        });
    },
  
    verifyOtp: async (phone, otp) => {
      postDataAPI("auth/verifyotp", { phone: phone, otp: otp }).then((response) => {
        if (response.status === 200) {
          return;
        }
      });
    },
  
    signup: async (data) => {
      postDataAPI("auth/signup", { ...data }).then(()=>{
        return
      }).catch((error)=>{
        throw error
      })
    },
  
    usernameValid: async (username) =>{
      postDataAPI("auth/usernamevalid",{username : username}).then(()=>{
        return
      }).catch((error)=>{
        throw error
      })
    },
    
    login : async (data) => {
      const res = await postDataAPI("auth/login",{...data})
      return res.data
    },
  
    forgotPassword : async (email) => {
      postDataAPI("auth/forgotpassword", { email: email })
    },

    refreshToken : async () =>{
      const res = await postDataAPI("auth/refresh_token")
      return res.data
    }
  };