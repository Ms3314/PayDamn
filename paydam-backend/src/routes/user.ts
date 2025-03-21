import express from "express";
export const userRouter = express.Router();


userRouter.route("/transfer");

// making a vistual card for the user 
// .. so we can use this thing same route then the details will be send to the frontend and saved in the zustand 
userRouter.route("/balance");