import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bycript from "bcrypt";


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

  let accessToken = jwt.sign(
    {
      userID: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  let refreshToken = jwt.sign(
    {
      userID: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("refreshToken", refreshToken, {
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
 
  if (!refreshToken) {
    return res.status(401).json({
      message: "anthorized access",
    });
  }

  const decode = jwt.verify(refreshToken, config.JWT_SECRET);

  const accessToken = jwt.sign(
    {
      userID: decode.userID,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

   refreshToken = jwt.sign(
    {
      userID: decode.userID,
    },
    config.JWT_SECRET,
    { expiresIn: "15m" },
  );

  res.cookie('refreshToken' ,refreshToken,{
     httpOnly : true,
     secure : true,
     sameSite : "strict",
     maxAge : 7 * 24 * 60 * 60 * 1000
  })

  res.status(200).json({
     message : 'New token created ',
     accessToken
  })

};
