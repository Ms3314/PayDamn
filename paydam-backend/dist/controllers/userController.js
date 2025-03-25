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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userModels_1 = require("../models/userModels");
exports.userController = {
    displayUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield (0, userModels_1.getUsersModel)();
            if (!data || data.length === 0) {
                res.status(400).json({
                    success: false,
                    message: "Error while finding the users or no users found",
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: "The following are the users",
                users: data,
            });
            return;
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
            return;
        }
    }),
};
