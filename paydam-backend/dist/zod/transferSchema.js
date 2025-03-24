"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferSchema = void 0;
const zod_1 = require("zod");
exports.transferSchema = zod_1.z.object({
    transferee: zod_1.z.number().int().positive().max(9999999999, "Transferee must be at most 10 digits"),
    amount: zod_1.z.number().positive().max(100000, "Amount must be reasonable")
});
