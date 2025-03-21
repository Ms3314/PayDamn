"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.authRouter = express_1.default.Router();
exports.authRouter.route('/signin');
exports.authRouter.route('/signup');
// iske baare mein badme sochinge 
exports.authRouter.route('/CardPasswordVerify');
exports.authRouter.route('/ResetPassword');
