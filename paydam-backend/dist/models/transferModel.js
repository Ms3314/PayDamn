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
exports.createTransaction = createTransaction;
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
            else {
                throw new Error("Error while finding Balance money");
            }
        }
        catch (error) {
            throw new Error("Error finding Balance money" + error);
        }
    });
}
function createTransaction(accountNumber, amount, transferee) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (accountNumber == "") {
                throw new Error("Account Number does not exist");
            }
            const transaction = yield prisma.transaction.create({
                data: {
                    senderId: accountNumber,
                    amount: parseFloat(amount.toString()),
                    receiverId: transferee,
                    progress: false,
                }
            });
            if (!transaction.id) {
                throw new Error("the transaction does not exist");
            }
            // now we will transfer the money 
            const data = yield transferMoney(accountNumber, transferee, amount);
            if ((data === null || data === void 0 ? void 0 : data.success) == true) {
                // if the monmey has been send successfully then th progress is true means done 
                yield prisma.transaction.update({
                    where: { id: transaction.id },
                    data: { progress: true }
                });
                return data;
            }
            else {
                // if the trasaction failed it still checks the balance and then this is a whole spectrum of error need to be thouh of in this case 
                const userBalance = yield BalanceMoney(parseInt(accountNumber));
                return {
                    success: false,
                    message: "Trasaction failed",
                    balance: userBalance === null || userBalance === void 0 ? void 0 : userBalance.balance,
                };
            }
        }
        catch (error) {
            throw new Error("Error while creating transaction" + error);
        }
    });
}
function transferMoney(accountNumber, transferee, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const transaction = yield prisma.$transaction([
                prisma.user.update({
                    where: { accountNumber },
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
                    balance: transaction[0].balance.toString(), // MY BALANCE 
                };
            }
        }
        catch (error) {
            throw new Error("Error while transfering money" + error);
        }
    });
}
