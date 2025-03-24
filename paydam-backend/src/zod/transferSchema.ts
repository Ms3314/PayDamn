import {z} from 'zod';

export const transferSchema = z.object({
    transferee: z.number().int().positive().max(9999999999, "Transferee must be at most 10 digits"),
    amount: z.number().positive().max(100000, "Amount must be reasonable")
});
