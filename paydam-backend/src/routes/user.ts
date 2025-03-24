import express from "express";
import { CheckTokenExist } from "../middlewares/validateUser";
import { transcationController } from "../controllers/transcationController";
import { userController } from "../controllers/userController";
export const userRouter = express.Router();

//@ts-expect-error
userRouter.route("/transfer").post( CheckTokenExist , transcationController.TransferAmount);
userRouter.route("/").get(CheckTokenExist , userController.displayUser)
// making a vistual card for the user 
// .. so we can use this thing same route then the details will be send to the frontend and saved in the zustand 
//@ts-expect-error
userRouter.route("/balance").post(CheckTokenExist , transcationController.BalanceAmount);