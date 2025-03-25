"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTokenExist = exports.RegisterValidate = exports.loginValidate = void 0;
const authLogin_1 = require("../zod/authLogin");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authModel_1 = require("../models/authModel");
const loginValidate = (req, res, next) => {
    const result = authLogin_1.loginSchema.safeParse(req.body);
    // is this is not a success 
    if (!result.success) {
        res.status(400).json({ errors: result.error.format() });
        return;
    }
    next();
};
exports.loginValidate = loginValidate;
const RegisterValidate = (req, res, next) => {
    const result = authLogin_1.loginSchema.safeParse(req.body);
    // is this is not a success 
    if (!result.success) {
        res.status(400).json({ errors: result.error.format() });
        return;
    }
    next();
};
exports.RegisterValidate = RegisterValidate;
const CheckTokenExist = (req, res, next) => {
    const authHeader = req.headers.authorization;
    let token = null;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    if (!token) {
        res.status(401).json({
            success: false,
            message: "Token does not exist",
        });
        return;
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "pineapple", (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
        if (err || !decoded || typeof decoded !== "object") {
            return res.status(403).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
        try {
            const { email } = decoded;
            const account = yield (0, authModel_1.findAccountWithEmail)(email);
            if (!account) {
                return res.status(409).json({
                    success: false,
                    message: "Invalid token",
                });
            }
            req.user = account.id;
            next();
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong",
                error,
            });
        }
    }));
};
exports.CheckTokenExist = CheckTokenExist;
