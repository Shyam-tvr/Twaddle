import { config } from 'dotenv'
config()
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Twilio  from "twilio"
import { Users } from "../Models/userModel.js";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let client = new Twilio(accountSid,authToken)


export const authCtrl = {
  getOTP: (req, res) => {
    const mobile = req.body.mobile;
    try {
      client.verify
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({ to: `+91${mobile}`, channel: "sms" })
        .then((verification) => res.status(200).json(verification.status));
    } catch (error) {
      res.status(500).json(error);
    }
  },

  verifyOTP: async (req, res) => {
    const {mobile,otp} = req.body;
    client.verify.v2
      .services(process.env.TWILIO_SERVICE_ID)
      .verificationChecks.create({ to: `+91${mobile}`, code: otp })
      .then((verification_check) => {
        if (verification_check.status === "approved") {
          return res.status(200).json("success");
        } else {
          return res.status(400);
        }
      });
  },
  
  usernameValid: async (req, res) => {
    try {
      const { username } = req.body;
      let usernameExist = await Users.findOne({ username });
      if (usernameExist) {
        return res.status(400).json({ msg: "Username already taken" });
      } else {
        return res.status(200).json({ msg: "Username is available" });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Internal server error" });
    }
  },

  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user_email = await Users.findOne({ email: email });
      if (user_email)
        return res.status(400).json({ msg: "This email already exists." });

      const passwordHash = await bcrypt.hash(password, 12);
      const newUser = new Users({
        ...req.body,
        password: passwordHash,
      });

      const access_token = createAccessToken({ id: newUser._id });
      const refresh_token = createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      await newUser.save();

      res.json({
        msg: "Register Success!",
        access_token,
        user: {
          ...newUser._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email }).populate(
        "followers following",
        "avatar username fullname followers following"
      );

      if (!user)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.json({
        msg: "Login Success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/auth/refresh_token" });
      return res.json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  generateAccessToken: async (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now." });

      jwt.verify(
        rf_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err) return res.status(400).json({ msg: "Please login now." });
          
          const user = await Users.findById(result.id)
          .select("-password")
          .populate(
            "followers following",
            "avatar username fullname followers following"
            );

          if (!user)
            return res.status(400).json({ msg: "This does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.status(200).json({access_token,user,});
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
