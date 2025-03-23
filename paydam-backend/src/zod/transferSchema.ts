import {z} from 'zod';

export const transferSchema = z.object({
    myaccount : z.number().max(20),
    transferee : z.number().max(20),
    balance : z.number().max(10)
})