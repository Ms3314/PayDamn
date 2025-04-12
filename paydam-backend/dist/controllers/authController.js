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
exports.AuthController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const authModel_1 = require("../models/authModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.AuthController = {
    // the plan is make the user signin using his email and pasword then it will get a 2FA 
    LoginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, phoneNumber, password } = req.body;
        let emailOfUser;
        // while verifying the phone number 
        if (phoneNumber != undefined && phoneNumber != null && phoneNumber != '') {
            const account = yield (0, authModel_1.findAccountWithPhoneNumber)(phoneNumber);
            if (account === null || account === void 0 ? void 0 : account.password) {
                const isPasswordMatch = yield bcryptjs_1.default.compare(password, account === null || account === void 0 ? void 0 : account.password); // true
                // email aur password sahi hai , abh bas dalna hai 
                if (isPasswordMatch) {
                    emailOfUser = account.email;
                }
                else {
                    res.status(402).json({
                        success: false,
                        message: "Invalid Crendetials"
                    });
                    return;
                }
            }
            else {
                res.status(402).json({
                    success: false,
                    message: "Invalid Credentials"
                });
                return;
            }
        }
        // while veriying the email 
        if (email && undefined || email && null || email && '') {
            const account = yield (0, authModel_1.findAccountWithEmail)(email);
            if (account === null || account === void 0 ? void 0 : account.password) {
                const isPasswordMatch = yield bcryptjs_1.default.compare(password, account === null || account === void 0 ? void 0 : account.password); // true
                // email aur password sahi hai , abh bas dalna hai 
                if (isPasswordMatch) {
                    emailOfUser = account.email;
                }
                else {
                    res.status(402).json({
                        success: false,
                        message: "Invalid Crendetials"
                    });
                    return;
                }
            }
            else {
                res.status(402).json({
                    success: false,
                    message: "Invalid Credentials"
                });
                return;
            }
        }
        var token = jsonwebtoken_1.default.sign({ email: emailOfUser }, process.env.JWT_SECRET || 'CREAMSTONE');
        res.status(200).json({
            success: true,
            message: "User has been logged in",
            accesstoken: token,
        });
    }),
    RegisterUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullName, email, password, phoneNumber } = req.body;
            // Hash the user's password
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const accountWithEmail = yield (0, authModel_1.findAccountWithEmail)(email);
            const accountWithPn = yield (0, authModel_1.findAccountWithPhoneNumber)(phoneNumber);
            if ((accountWithEmail === null || accountWithEmail === void 0 ? void 0 : accountWithEmail.id) || (accountWithPn === null || accountWithPn === void 0 ? void 0 : accountWithPn.id)) {
                res.status(409).json({
                    success: false,
                    message: "User with email or phone number already exists"
                });
                return;
            }
            // Generate a random 10-digit account number
            const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            // Save user to database
            const response = yield (0, authModel_1.registerModel)(fullName, email, hashedPassword, phoneNumber, accountNumber);
            if (response) {
                res.status(201).json({
                    success: true,
                    message: "User registered successfully",
                });
                return;
            }
        }
        catch (error) {
            res.status(500).json({ error: "Internal error occured" });
        }
    }),
    isValidToken: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // @ts-ignore
            const { user } = req.user;
            if (user) {
                res.status(200).json({
                    success: true,
                    message: "Token is valid"
                });
                return;
            }
        }
        catch (error) {
            res.status(404).json({
                success: false,
                message: "Token is invalid"
            });
            return;
        }
    })
};
