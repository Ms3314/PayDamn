import { Request , Response } from "express";
import bcrypt from "bcryptjs"
import { findAccountWithEmail, findAccountWithPhoneNumber, registerModel } from "../models/authModel";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken"; 
import { isValid } from "zod";
import path from "path";

interface DecodedToken {
    email: string;
  }
  

export const AuthController = {
    // the plan is make the user signin using his email and pasword then it will get a 2FA 
    LoginUser : async (req:Request , res:Response) => {
        const {email , phoneNumber , password} = req.body ;
        let emailOfUser ;
        // while verifying the phone number 
        if (phoneNumber != undefined && phoneNumber != null && phoneNumber != '') {
            const account =  await findAccountWithPhoneNumber(phoneNumber)
            if (account?.password) {
                const isPasswordMatch = await bcrypt.compare(password, account?.password); // true
                // email aur password sahi hai , abh bas dalna hai 
                if (isPasswordMatch) {
                    emailOfUser = account.email ;
                } else {
                     res.status(402).json({
                        success : false  ,
                        message : "Invalid Crendetials"
                    })
                    return 
                }
            } else {
                res.status(402).json({
                    success : false , 
                    message : "Invalid Credentials"
                })
                return 
            }
        }
        // while veriying the email 
        if (email && undefined || email && null || email && '') {
            const account =  await findAccountWithEmail(email)
            if (account?.password) {
                const isPasswordMatch = await bcrypt.compare(password, account?.password); // true
                // email aur password sahi hai , abh bas dalna hai 
                if (isPasswordMatch) {
                    emailOfUser = account.email ;
                } else {
                    res.status(402).json({
                        success : false  ,
                        message : "Invalid Crendetials"
                    })
                    return 
                }
            } else {
                res.status(402).json({
                    success : false , 
                    message : "Invalid Credentials"
                })
                return 
            }
        }
        var access_token = jwt.sign({ email : emailOfUser }, process.env.ACCESS_SECRET || 'CREAMSTONE' , { expiresIn : '15m'});
        var refresh_token = jwt.sign({ email : emailOfUser }, process.env.REFRESH_SECRET || 'CREAMSTONE' , { expiresIn : '15m'});
        res.cookie('refreshToken', refresh_token, {
            httpOnly: true,
            secure: true, // Use only over HTTPS
            sameSite: 'strict',
            path: '/refresh-token',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });
        res.status(200).json({
            success : true ,
            message : "User has been logged in",
            accesstoken : access_token ,
        })
    },
    RegisterUser: async (req: Request, res: Response) => {
        try {
            const { fullName, email, password, phoneNumber } = req.body;
            // Hash the user's password
            const hashedPassword = await bcrypt.hash(password, 10);
            const accountWithEmail = await findAccountWithEmail(email) 
            const  accountWithPn = await findAccountWithPhoneNumber(phoneNumber) 
            if (accountWithEmail?.id || accountWithPn?.id) {
                res.status(409).json({
                    success : false ,
                    message : "User with email or phone number already exists"
                })
                return ;
            }
            // Generate a random 10-digit account number
            const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
            
            // Save user to database
            const response = await registerModel(fullName, email, hashedPassword, phoneNumber, accountNumber);
            if (response) {
                res.status(201).json({
                    success : true ,
                    message : "User registered successfully",
                })
                return ;
            }
        } catch (error) {
            res.status(500).json({error : "Internal error occured"})
        }
    },
    isValidToken : async (req:Request , res:Response) => {
        try {
            // @ts-ignore
            const {user} = req.user ;
            if (user) {
                res.status(200).json({
                    success : true ,
                    message : "Token is valid"
                })
                return ;
            }
        }
        catch (error) {
            res.status(404).json({
                success : false ,
                message : "Token is invalid"
            })
            return ;
        }
    },
    refreshToken : async (req:Request , res:Response) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: 'Refresh token not found' });
            }
            jwt.verify(refreshToken, process.env.REFRESH_SECRET || 'GORILLA' , async (err : JsonWebTokenError | null , decoded : string | JwtPayload | undefined) => {
                    if (err) {
                        return res.status(401).json({
                            success : false ,
                            message : "Invalid refresh token "
                        })
                    }
                    const { email } = decoded as DecodedToken;
                    var newaccess_token = jwt.sign({ email  }, process.env.ACCESS_SECRET || 'CREAMSTONE' , { expiresIn : '15m'});
                    return res.status(200).json({
                        success : true ,
                        access_token : newaccess_token
                    })
            })
        }
        catch (error) {
            console.log(error)
            return res.status(500).json({
                success : false ,
                message : "refresh token authorization failed , internal server error"
            })
        }
    },
    LogoutUser : async (req:Request , res:Response) => {
        try {
            res.clearCookie('refreshToken' , {path : '/refresh-token'});
            return res.status(200).json({
                success : true ,
                message : "User has been logged out"
            })
        } catch (error) {
            res.status(500).json({
                success : false ,
                message : "Error while logging out",
                error
            })
        }
    }
}
    
