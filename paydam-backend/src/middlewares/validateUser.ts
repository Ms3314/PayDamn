import { NextFunction , Response , Request, response } from "express";
import { loginSchema } from "../zod/authLogin"
import jwt from "jsonwebtoken"
import { findAccountWithEmail } from "../models/authModel";

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

interface DecodedToken {
  email: string;
}

interface CustomRequest extends Request {
  user?: any; // Update this type if you have a proper User type
}

export const CheckTokenExist = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  let token: string | null = null;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Token does not exist",
    });
    return;
  }
  jwt.verify( token, process.env.JWT_SECRET || "pineapple",
    async (err, decoded) => {
      if (err || !decoded || typeof decoded !== "object") {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      try {
        const { email } = decoded as DecodedToken;
        const account = await findAccountWithEmail(email);

        if (!account) {
          return res.status(409).json({
            success: false,
            message: "Invalid token",
          });
        }
        
        req.user = account.id;
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong",
          error,
        });
      }
    }
  );
};
