import { Express } from "express";
import { Request , Response } from "express";
export const AuthController = {
    // the plan is make the user signin using his email and pasword then it will get a 2FA 
    LoginUser : async (req:Request , res:Response) => {
        const {email , password} = req.body ;
        

    },
    RegisterUser : async (req : Request , res:Response) => {
        const {full_name ,email , password , phone_number } = req.body ;
        

        // lets make it as when the user logs for the first time when he created his account we give him a random accountnumber

     }
    
}