import { Request, Response } from "express";
import { getUsersModel } from "../models/userModels";


export const userController = {
    displayUser: async (req: Request, res: Response) => {
        try {
            const data = await getUsersModel();

            if (!data || data.length === 0) {
                res.status(400).json({
                    success: false,
                    message: "Error while finding the users or no users found",
                });
                return 
            }

            res.status(200).json({
                success: true,
                message: "The following are the users",
                users: data,
            });
            return 
        } catch (error) {
            console.error("Error fetching users:", error);

            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: (error as Error).message, 
            });
            return 
        }
    },
};