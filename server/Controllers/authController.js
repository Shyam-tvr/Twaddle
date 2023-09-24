import { config } from "dotenv";
config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Twilio from "twilio";
import { Users } from "../Models/userModel.js";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
let client = new Twilio(accountSid, authToken);

export const authCtrl = {
  verifyUser: async (req, res) => {
    try {
      const { email, mobile } = req.body;
      let userExist = await Users.findOne({
        $or: [{ email: email }, { phone: mobile }],
      });
      if (userExist) {
        return res.status(409).json({ msg: "User already exist" });
      } else {
        return res.status(200).json({ msg: "username not exist" });
      }
    } catch {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },
  getOTP: (req, res) => {
    const { mobile } = req.body;
    try {
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({ to: `+91${mobile}`, channel: "sms" })
        .then((verification) => console.log(verification.status));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  },

  verifyOTP: async (req, res) => {
    try {
      const { mobile, otp } = req.body;
      client.verify.v2
        .services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: `+91${mobile}`, code: otp })
        .then(async (verification_check) => {
          if (verification_check.status === "approved") {
            return res.status(200).json({ msg: "success" });
          } else {
            return res.status(401).json({ msg: "Failed to verify OTP" });
          }
        });
    } catch {
      return res.status(500).json({ msg: "Internal Server Error" });
    }
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

      res.status(201).json({
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
        return res.status(401).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ msg: "Password is incorrect." });

      const access_token = createAccessToken({ id: user._id });
      const refresh_token = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30days
      });

      res.status(200).json({
        msg: "Login Success!",
        access_token,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/auth/refresh_token" });
      return res.status(200).json({ msg: "Logged out!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { formData } = req.body;
      const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/;
      const phoneRegex = /^\d{10}$/;
      const usernameRegex = /^[a-z0-9_-]{3,16}$/;
      let user;

      //checking the formData
      if (emailRegex.test(formData)) {
        user = await Users.findOne({ email: formData }).select(
          "email fullName"
        );
      } else if (phoneRegex.test(parseInt(formData))) {
        user = await Users.findOne({ mobile: formData }).select(
          "email fullName"
        );
      } else if (usernameRegex.test(formData)) {
        user = await Users.findOne({ username: formData }).select(
          "email fullName"
        );
      }

      const payload = {
        id: user._id,
        exp: Math.floor(Date.now() / 1000) + 300,
      };

      const resetToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
      });

      if (user) {
        try {
          let config = {
            service: "gmail",
            auth: {
              user: process.env.NODE_MAILER_ID,
              pass: process.env.NODE_MAILER_KEY,
            },
          };

          let transporter = nodemailer.createTransport(config);

          let MailGenerator = new Mailgen({
            theme: "default",
            product: {
              name: "Twaddle",
              link: "https://mailgen.js/",
            },
          });

          let response = {
            body: {
              name: user.fullName,
              intro:
                "We're sorry to hear that you're having trouble with logging in to Twaddle. We've received a message that you've forgotten your password. If this was you, you can reset your password now.",
              action: {
                button: {
                  color: "#5690ed",
                  text: "Reset your Password",
                  link: `http://localhost:3000/resetpassword/${resetToken}`,
                },
              },
              outro:
                "This link expires in 5 minutes, If you didn't request a login link or password reset, you can ignore this message.",
            },
          };

          let mail = MailGenerator.generate(response);

          let message = {
            from: process.env.NODE_MAILER_ID,
            to: "shyammtvr@gmail.com",
            subject: `${user.fullName}, we've made it easy to get back to Twaddle`,
            html: mail,
          };

          const sendMail = await transporter.sendMail(message);
          return res.status(201).json({
            msg: "you should receive an email",
          });
        } catch (error) {
          console.log("error founded", error);
          return res.status(500).json({ error });
        }
      } else {
        console.log("user not found");
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
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
            return res.status(400).json({ msg: "This user does not exist." });

          const access_token = createAccessToken({ id: result.id });

          res.status(200).json({ access_token, user });
        }
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  verifyToken: async (req, res) => {
    try {
      const { token } = req.body;

      if (!token)
        return res.status(400).json({ msg: "Invalid Authentication." });

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (decoded)
        return res.status(200).json({ msg: "token is valid", user: decoded.id });
    } catch (error) {
      if (error.message === "jwt expired")
        return res.status(401).json({ msg: "Invalid Authentication." });

      return res.status(500).json({ msg: error.message });
    }
  },

  resetPassword: async (req,res) => {
    try {
      const { id } = req.params
      const { password } = req.body
      const passwordHash = await bcrypt.hash(password, 12);
      
      const response = await Users.updateOne({_id:id}, {
        $set : {
          password: passwordHash
        }
      })

      if(response.modifiedCount > 0)
        return res.status(200).json({msg:"password updated"})

      return res.status(500).json({msg:"something went wrong"})
    } catch (error) {
      return res.status(500).json(error.message)
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
