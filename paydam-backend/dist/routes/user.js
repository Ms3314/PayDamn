"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userRouter = express_1.default.Router();
exports.userRouter.route("/transfer");
// making a vistual card for the user 
// .. so we can use this thing same route then the details will be send to the frontend and saved in the zustand 
exports.userRouter.route("/balance");
