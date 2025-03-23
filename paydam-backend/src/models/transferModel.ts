import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function BalanceMoney (myaccount : number) {
    try {
        const data = await prisma.user.findUnique({
            where : {
                accountNumber : myaccount ,
            }
        })
        if(data) {
        return {
            balance : data?.balance ,
            data , 
        } 
        }
        else return false 
    }
    catch (error) {
        throw new Error("Error finding Balance money" + error);    
    }
}

export async function transferMoney (myaccount:number , transferee:number , amount:number) {
    try {
        const transaction = await prisma.$transaction([
            prisma.user.update({
                where : {accountNumber : myaccount},
                data : {balance : {decrement : amount }} ,
            }) ,
            prisma.user.update({
                where : {accountNumber : transferee} ,
                data : {balance : {increment : amount}}
            })
        ])

        if (transaction) {
            return {
                success : true ,
                message : "Transfer successfull",
                transaction ,
            }
        }
    } catch (error) {
        throw new Error("Error while transfering money" + error)
    }
}