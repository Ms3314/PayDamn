import express from "express"
import { CheckTokenExist, RegisterValidate, loginValidate } from "../middlewares/validateUser"
import { AuthController } from "../controllers/authController"
export const authRouter = express.Router()

authRouter.route('/login').post(loginValidate , AuthController.LoginUser)
authRouter.route('/signup').post(RegisterValidate , AuthController.RegisterUser);
authRouter.route('/isValidToken').post(CheckTokenExist , AuthController.isValidToken)
// iske baare mein badme sochinge 
// authRouter.route('/CardPasswordVerify')
// authRouter.route('/ResetPassword')
