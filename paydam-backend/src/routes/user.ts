import express from "express";
import { CheckTokenExist } from "../middlewares/validateUser";
import { transcationController } from "../controllers/transcationController";
export const userRouter = express.Router();


userRouter.route("/transfer").post( CheckTokenExist , transcationController.TransferAmount);

// making a vistual card for the user 
// .. so we can use this thing same route then the details will be send to the frontend and saved in the zustand 
userRouter.route("/balance").post(CheckTokenExist , transcationController.BalanceAmount);