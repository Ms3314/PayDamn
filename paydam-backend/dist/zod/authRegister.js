"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = void 0;
const zod_1 = require("zod");
// Define a schema for user signup/login
exports.RegisterSchema = zod_1.z.object({
    fullName: zod_1.z.string().max(20),
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    phone: zod_1.z.string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number (must be 10 digits, India format)"),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must not exceed 32 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
});
