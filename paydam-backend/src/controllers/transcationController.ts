import { BalanceMoney, transferMoney } from "../models/transferModel";
import { Request, Response } from "express";
import { transferSchema } from "../zod/transferSchema";


export const transcationController = {
    TransferAmount : async (req : Request , res : Response) => {
        try {
            const { myaccount, transferee, amount } = req.body;
            const result = transferSchema.safeParse(req.body);

            if (!result.success) {
                 res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
                return ;
            }

            const transfer = await transferMoney(myaccount, transferee, amount);

            if (transfer?.success) {
                res.status(200).json({
                    success: true,
                    message: "Transfer successful",
                    transaction: transfer.transaction, // Return transaction details
                });
                return ;
            }

            res.status(400).json({
                success: false,
                message: transfer?.message || "Transfer failed",
            });
            return 
        } catch (error) {
            console.error("Transaction error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
            return 
        }
    } , 
    BalanceAmount : async (req :Request , res : Response) => {
        try {
            const {myaccount} = req.body ;
            const data = await BalanceMoney(myaccount)
            if (data == false) {
                res.status(402).json({
                    success : false ,
                    message : "Error finding data"
                })
                return ;
            } else if (data.balance) {
                res.status(200).json({
                    success : true ,
                    balance : data.balance ,
                    message : "Successfully found the balance"
                })
                return ;
            }
        } catch (error) {
            console.error("Transaction error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
            return 
        }
    }
}