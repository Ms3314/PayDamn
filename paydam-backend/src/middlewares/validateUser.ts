import { NextFunction , Response , Request, response } from "express";
import { loginSchema } from "../zod/authLogin"


export const loginValidate = (req : Request , res : Response , next : NextFunction) : void  => {
    const result = loginSchema.safeParse(req.body);
         // is this is not a success 
        if (!result.success) {
            res.status(400).json({errors : result.error.format() });
            return  ;
        }
        next();
   
}

export const RegisterValidate = (req : Request , res : Response , next : NextFunction) : void  => {
    const result = loginSchema.safeParse(req.body);
         // is this is not a success 
        if (!result.success) {
            res.status(400).json({errors : result.error.format() });
            return  ;
        }
        next();
   
}