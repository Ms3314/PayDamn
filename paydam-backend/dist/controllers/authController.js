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
const AuthController = {
    // the plan is make the user signin using his email and pasword then it will get a 2FA 
    LoginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
    }),
    RegisterUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password, phone_number } = req.body;
        // lets make it as when the user logs for the first time when he created his account we give him a random accountnumber
    })
};
