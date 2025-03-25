"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferSchema = void 0;
const zod_1 = require("zod");
exports.transferSchema = zod_1.z.object({
    transferee: zod_1.z.string().max(10, "Transferee must be at most 10 characters"),
    amount: zod_1.z.number().positive().min(10, "Amount must be greater than 10").max(100000, "Amount must be reasonable")
});
