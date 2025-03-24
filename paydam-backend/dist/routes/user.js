"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = require("../middlewares/validateUser");
const transcationController_1 = require("../controllers/transcationController");
const userController_1 = require("../controllers/userController");
exports.userRouter = express_1.default.Router();
//@ts-expect-error
exports.userRouter.route("/transfer").post(validateUser_1.CheckTokenExist, transcationController_1.transcationController.TransferAmount);
exports.userRouter.route("/").get(validateUser_1.CheckTokenExist, userController_1.userController.displayUser);
// making a vistual card for the user 
// .. so we can use this thing same route then the details will be send to the frontend and saved in the zustand 
//@ts-expect-error
exports.userRouter.route("/balance").post(validateUser_1.CheckTokenExist, transcationController_1.transcationController.BalanceAmount);
