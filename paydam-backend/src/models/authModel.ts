import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function registerModel (fullName:string,email:string , password:string , phoneNumber:string , accountNumber:string)  {
    try {
        const response = await prisma.user.create({
            data: {
                fullName ,
                email ,
                password , 
                phoneNumber : phoneNumber ,
                accountNumber,
            }
        });
        if(response) {
            return response 
        }
    } catch (error:any) {
         throw new Error("Failed to add register detail onto the database " + error.message)
    }
    
}

export async function findAccountWithPhoneNumber (phoneNumber : string) {
    try {
        const data = await prisma.user.findFirst({
            where : {
                phoneNumber : phoneNumber 
            }
        })
        return data
    } catch (error) {
        throw new Error("Error while finding phone number" + error)
    }
}
export async function findAccountWithEmail (email : string) {
    try {
        const data = await prisma.user.findFirst({
            where : {
                email
            }
        })
        return data
    } catch (error) {
        throw new Error("Error while finding phone number")
    }
}
