"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateUser_1 = require("../middlewares/validateUser");
const authController_1 = require("../controllers/authController");
exports.authRouter = express_1.default.Router();
exports.authRouter.route('/login').post(validateUser_1.loginValidate, authController_1.AuthController.LoginUser);
exports.authRouter.route('/signup').post(validateUser_1.RegisterValidate, authController_1.AuthController.RegisterUser);
exports.authRouter.route('/isValidToken').get(validateUser_1.CheckTokenExist, authController_1.AuthController.isValidToken);
// iske baare mein badme sochinge 
// authRouter.route('/CardPasswordVerify')
// authRouter.route('/ResetPassword')
