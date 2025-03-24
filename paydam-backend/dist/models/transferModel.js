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
exports.BalanceMoney = BalanceMoney;
exports.transferMoney = transferMoney;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function BalanceMoney(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.user.findUnique({
                where: {
                    id: userid,
                }
            });
            if (data) {
                return {
                    balance: data === null || data === void 0 ? void 0 : data.balance,
                    data,
                };
            }
            else
                return false;
        }
        catch (error) {
            throw new Error("Error finding Balance money" + error);
        }
    });
}
function transferMoney(userid, transferee, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma.$transaction([
                prisma.user.update({
                    where: { id: userid },
                    data: { balance: { decrement: amount } },
                }),
                prisma.user.update({
                    where: { accountNumber: transferee },
                    data: { balance: { increment: amount } }
                })
            ]);
            if (transaction) {
                return {
                    success: true,
                    message: "Transfer successfull",
                    transaction,
                };
            }
        }
        catch (error) {
            throw new Error("Error while transfering money" + error);
        }
    });
}
