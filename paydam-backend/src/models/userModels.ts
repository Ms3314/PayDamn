import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getUsersModel () {
    try {
        const allusers = await prisma.user.findMany()
        if (allusers.length) {
            return allusers ;
        }else {
            return false 
        }
    } catch (error) {
        throw new Error("Error whiile getting all the Users")
    }
}


export async function userAccountbyId (userid : number) {
    try {
        const userbyId = await prisma.user.findUnique({
            where : {
                id : userid
            }
        })
        if (userbyId) {
            return userbyId 
        }
        
    } catch (error) {
        throw new Error("Error finding the user" + error);
    }
}
