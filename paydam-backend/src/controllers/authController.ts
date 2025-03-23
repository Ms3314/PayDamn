import { Express } from "express";
import { Request , Response } from "express";
import bcrypt from "bcryptjs"
import { findAccountWithEmail, findAccountWithPhoneNumber, registerModel } from "../models/authModel";
export const AuthController = {
    // the plan is make the user signin using his email and pasword then it will get a 2FA 
    LoginUser : async (req:Request , res:Response) => {
        const {email , phoneNumber , password} = req.body ;
        if (phoneNumber != '') {
            const account_pn =  await findAccountWithPhoneNumber(parseInt(phoneNumber))
            if (!account_pn) {
                return res.status(401).json({
                    message : "User is unauthorized or does not exist",
                })
            }
            const isPasswordMatch = await bcrypt.compare(password, account_pn?.password || "randomPassword"); // true
            if (!isPasswordMatch) {
                return res.status(401).json({
                    message : "User is unauthorized or does not exist",
                })
            }
        }
        if (email != '') {
            const account_pn =  await findAccountWithEmail(email)
            if (!account_pn) {
                return res.status(401).json({
                    message : "User is unauthorized or does not exist",
                })
            }
            const isPasswordMatch = await bcrypt.compare(password, account_pn?.password || "randomPassword"); // true
            if (!isPasswordMatch) {
                return res.status(401).json({
                    message : "User is unauthorized or does not exist",
                })
            }
        }
    },
    RegisterUser: async (req: Request, res: Response) => {
        try {
            const { fullName, email, password, phoneNumber } = req.body;
            // Hash the user's password
            const hashedPassword = await bcrypt.hash(password, 10);
   
            // Generate a random 10-digit account number
            const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    
            // Save user to database
            const response = await registerModel(fullName, email, hashedPassword, phoneNumber, accountNumber);
            if (response) {
                res.status(201).json({
                    message : "User registered successfully",
                    user : {fullName , email , phoneNumber , accountNumber}
                })
            }
        } catch (error) {
            console.error("Error in RegisterUser:" , error);
            res.status(500).json({error : "Internal error occured"})
        }
    }
    
}