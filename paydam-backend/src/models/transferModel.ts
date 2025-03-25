import { PrismaClient } from "@prisma/client";
import { getUsersModel } from "./userModels";
const prisma = new PrismaClient();


export async function BalanceMoney (userid : number) {
    try {
        const data = await prisma.user.findUnique({
            where : {
                id : userid ,
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

export async function transferMoney (userid:number , transferee:string , amount:number) {
    try {
        const transaction = await prisma.$transaction([
            prisma.user.update({
                where : {id : userid},
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
                balance : transaction[0].balance.toString() , // MY BALANCE 
            }
        }
    } catch (error) {
        throw new Error("Error while transfering money" + error)
    }
}