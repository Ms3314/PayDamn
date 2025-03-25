"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = void 0;
const zod_1 = require("zod");
// Define a schema for user signup/login
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }).optional(),
    phoneNumber: zod_1.z.string().regex(/^[6789]\d{9}$/, "Invalid phone number (must be 10 digits, start with 6-9, India format)").optional(),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must not exceed 32 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
}).refine((data) => data.email || data.phoneNumber, {
    message: "Either email or phone number is required",
    path: ["email", "phone"],
});
