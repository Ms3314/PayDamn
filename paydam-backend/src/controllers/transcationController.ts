import { BalanceMoney, createTransaction, transferMoney } from "../models/transferModel";
import { Response , Request } from "express";
import { transferSchema } from "../zod/transferSchema";
import { userAccountbyId } from "../models/userModels";
import { create } from "domain";

interface CostumRequest extends Request {
    user : String ;
}

interface userAccount {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    accountNumber: string;
    balance: bigint;

}

export const transcationController = {
    TransferAmount : async (req : CostumRequest  , res : Response) => {
        try {
            const userid = req.user;
            const { transferee, amount } = req.body;
            const result = transferSchema.safeParse(req.body);
            
            if (!result.success) {
                 res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                    error : result.error
                });
                return ;
            }
            const userSendee  = await userAccountbyId(Number(userid))
            if (userSendee) {
                if (userSendee?.balance < amount) {
                    res.status(400).json({
                        success: false,
                        message: "Insufficient balance",
                    });
                    return ;
                } else if (userSendee?.accountNumber == transferee){
                    res.status(403).json({
                        success : false ,
                        message : "You cannot send money to yourself"
                    })
                    return ;
                }
            }
            // creates a trasaction in the schema
            const createReciept = await createTransaction(userSendee?.accountNumber || "" , amount , transferee )
            
            if (createReciept?.success) {
                res.status(200).json({
                    success: true,
                    message: `Transfer successful to AC: ${transferee}`,
                    balance: createReciept.balance.toString(), // Return transaction details
                });
                return ;
            }

            res.status(400).json({
                success: false,
                message: createReciept?.message || "Transfer failed",
            });
            return 
        } catch (error:any) {
            res.status(500).json({
                success: false,
                message: "Internal server error while transfering amount ",
                error : error.message,
            });
            return 
        }
    } , 
    BalanceAmount : async (req :CostumRequest , res : Response) => {
        try {
            const userid = req.user;
            const data = await BalanceMoney(Number(userid))
            if (data.balance) {
                res.status(200).json({
                    success : true ,
                    balance : (data.balance).toString() ,
                    message : "Successfully found the balance"
                })
                return ;
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
            return 
        }
    }
}
