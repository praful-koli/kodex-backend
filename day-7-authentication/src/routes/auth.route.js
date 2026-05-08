import express from "express";

import * as authController from "../controllers/auth.controller.js";

const authRoute = express.Router();

// register
authRoute.post("/register", authController.registerController);


// login 

authRoute.post('/login' , authController.loginController)

// get user
authRoute.get("/get-me", authController.getMeController);

//  refreshToken routaed
authRoute.get("/refresh-token", authController.refreshTokenController);

// logout
authRoute.get("/logout", authController.logoutController);


// logout-all


authRoute.get('/logout-all', authController.logoutAllDeviceController)

export default authRoute;
