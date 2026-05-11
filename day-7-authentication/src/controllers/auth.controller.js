import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bycript from "bcrypt";
import sessionModel from "../models/session.model.js";
import crypto from "crypto";
import { userInfo } from "os";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Required all filed",
    });
  }

  let userAlreadExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (userAlreadExists) {
    return res.status(409).json({
      message: "User Already Exsist",
    });
  }

  let hashPassword = await bycript.hash(password, 10);

  let user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });


  

  let newRefreshToken = jwt.sign(
    {
      userID: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshTokenHash: refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  let accessToken = jwt.sign(
    {
      userID: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "10m" },
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    message: "User register sucessfully",
    user: {
      username: user.username,
      email: user.email,
    },
    accessToken,
    
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "All Feild Required",
    });
  }

  const user = await userModel.findOne({ email });
  console.log(user)
  if (!user) {
    return status(401).json({
      message: "Invalid email or password",
    });
  }

  // if (!user.verified) {
  //   return res.status(401).json({
  //     message: "Email not verified",
  //   });
  // }

  const isPasswordValid = await bycript.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password Is Invalid",
    });
  }

  const refreshToken = jwt.sign({ userID: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  const accessToken = jwt.sign(
    {
      userID: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "10m" },
  );

  const refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await sessionModel.create({
    user: user._id,
    refreshTokenHash: refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "Login Sucessfully",
    user : {
       username : user.username,
       email : user.email
    },
    accessToken,
  });
};

export const getMeController = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthrized access OR Token Not Found",
      });
    }

    let decode = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decode.userID);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    res.status(200).json({
      message: "User Fetch succesfully",
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error,
    });
  }
};

export const refreshTokenController = async (req, res) => {
  let refreshToken = req.cookies.refreshToken;
   console.log(refreshToken)
  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthrized access",
    });
  }

  const decode = jwt.verify(refreshToken, config.JWT_SECRET);

  let refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  let session = await sessionModel.findOne({
    refreshTokenHash: refreshTokenHash,
    revoked: false,
  });

  if (!session) {
    return res.status(401).json({
      message: "Invalid Refresh Token",
    });
  }

  const accessToken = jwt.sign(
    {
      userID: decode.userID,
    },
    config.JWT_SECRET,
    { expiresIn: "10m" },
  );

  let newRefreshToken = jwt.sign(
    {
      userID: decode.userID,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

   refreshTokenHash = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  session.refreshTokenHash = refreshTokenHash;
  session.save();

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "New token created ",
    accessToken,
  });
};

export const logoutController = async (req, res) => {
  let refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh Token Not Found",
    });
  }

  let refreshTokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

 

  let session = await sessionModel.findOne({
    refreshTokenHash: refreshTokenHash,
    revoked: false,
  });


  if (!session) {
    return res.status(400).json({
      message: "Refresh Token Invalid",
    });
  }

  session.revoked = true;
  session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logout successfully ...",
  });
};

export const logoutAllDeviceController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh Token Not Found",
    });
  }

  const decode = jwt.verify(refreshToken, config.JWT_SECRET);

  await sessionModel.updateMany(
    {
      user: decode.userID,
      revoked: false,
    },
    {
      revoked: true,
    },
  );

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logout From All Device Successflly ",
  });
};


