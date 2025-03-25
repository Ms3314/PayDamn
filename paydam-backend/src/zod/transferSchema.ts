import { z } from "zod";

export const transferSchema = z.object({
    transferee: z.string().max(10, "Transferee must be at most 10 characters"),
    amount: z.number().positive().min(10 , "Amount must be greater than 10").max(100000, "Amount must be reasonable")
});
