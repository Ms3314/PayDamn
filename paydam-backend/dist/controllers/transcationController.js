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
exports.transcationController = void 0;
const transferModel_1 = require("../models/transferModel");
const transferSchema_1 = require("../zod/transferSchema");
exports.transcationController = {
    TransferAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userid = req.user;
            const { transferee, amount } = req.body;
            const result = transferSchema_1.transferSchema.safeParse(req.body);
            if (!result.success) {
                res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                    error: result.error
                });
                return;
            }
            const transfer = yield (0, transferModel_1.transferMoney)(Number(userid), transferee, amount);
            if (transfer === null || transfer === void 0 ? void 0 : transfer.success) {
                res.status(200).json({
                    success: true,
                    message: "Transfer successful",
                    transaction: transfer.transaction, // Return transaction details
                });
                return;
            }
            res.status(400).json({
                success: false,
                message: (transfer === null || transfer === void 0 ? void 0 : transfer.message) || "Transfer failed",
            });
            return;
        }
        catch (error) {
            console.error("Transaction error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
            return;
        }
    }),
    BalanceAmount: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userid = req.user;
            const data = yield (0, transferModel_1.BalanceMoney)(Number(userid));
            if (data == false) {
                res.status(402).json({
                    success: false,
                    message: "Error finding data"
                });
                return;
            }
            else if (data.balance) {
                console.log(data.balance);
                res.status(200).json({
                    success: true,
                    balance: (data.balance).toString(),
                    message: "Successfully found the balance"
                });
                return;
            }
        }
        catch (error) {
            console.error("Transaction error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
            return;
        }
    })
};
