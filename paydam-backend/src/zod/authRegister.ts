import { z } from "zod";

// Define a schema for user signup/login
export const RegisterSchema = z.object({
    fullName : z.string().max(20),
    email: z.string().email({ message: "Invalid email format" }),
    phone: z.string()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number (must be 10 digits, India format)"),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(32, { message: "Password must not exceed 32 characters" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
})


