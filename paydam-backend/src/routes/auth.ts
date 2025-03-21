import express from "express"
export const authRouter = express.Router()

authRouter.route('/signin')
authRouter.route('/signup')
// iske baare mein badme sochinge 
authRouter.route('/CardPasswordVerify')
authRouter.route('/ResetPassword')
