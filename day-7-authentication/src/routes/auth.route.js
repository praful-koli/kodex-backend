import express from "express";

import * as authController from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/register", authController.registerController);


authRoute.get('/get-me', authController.getMeController )

authRoute.get('/refresh-token' , authController.refreshTokenController)

export default authRoute;
