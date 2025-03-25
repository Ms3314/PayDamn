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
exports.getUsersModel = getUsersModel;
exports.userAccountbyId = userAccountbyId;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getUsersModel() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allusers = yield prisma.user.findMany();
            if (allusers.length) {
                return allusers;
            }
            else {
                return false;
            }
        }
        catch (error) {
            throw new Error("Error whiile getting all the Users");
        }
    });
}
function userAccountbyId(userid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userbyId = yield prisma.user.findUnique({
                where: {
                    id: userid
                }
            });
            if (userbyId) {
                return userbyId;
            }
        }
        catch (error) {
            throw new Error("Error finding the user" + error);
        }
    });
}
