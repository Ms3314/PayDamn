import { BalanceMoney, transferMoney } from "../models/transferModel";
import { Response , Request } from "express";
import { transferSchema } from "../zod/transferSchema";
import { userAccountbyId } from "../models/userModels";

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
            const transfer = await transferMoney(Number(userid), transferee, amount);
            if (transfer?.success) {
                res.status(200).json({
                    success: true,
                    message: `Transfer successful to AC: ${transferee}`,
                    balance: transfer.balance.toString(), // Return transaction details
                });
                return ;
            }

            res.status(400).json({
                success: false,
                message: transfer?.message || "Transfer failed",
            });
            return 
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error,
            });
            return 
        }
    } , 
    BalanceAmount : async (req :CostumRequest , res : Response) => {
        try {
            const userid = req.user;
            const data = await BalanceMoney(Number(userid))
            if (data == false) {
                res.status(402).json({
                    success : false ,
                    message : "Error finding data"
                })
                return ;
            } else if (data.balance) {
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
