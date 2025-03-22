import express from "express"
import { RegisterValidate, loginValidate } from "../middlewares/validateUser"
import { AuthController } from "../controllers/authController"
export const authRouter = express.Router()

authRouter.route('/login').post(loginValidate , AuthController.LoginUser)
authRouter.route('/signup').post(RegisterValidate , AuthController.RegisterUser);
// iske baare mein badme sochinge 
authRouter.route('/CardPasswordVerify')
authRouter.route('/ResetPassword')
