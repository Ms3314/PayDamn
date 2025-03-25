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
        else {
            throw new Error("Error while finding Balance money");
        }
    }
    catch (error) {
        throw new Error("Error finding Balance money" + error);    
    }
}

export async function createTransaction (accountNumber : string  , amount : number , transferee : string) {
    try {
        if (accountNumber == "") {
            throw new Error("Account Number does not exist") ;
        }
        const transaction = await prisma.transaction.create({
            data : {
                senderId : accountNumber ,
                amount : parseFloat(amount.toString())  ,
                receiverId : transferee ,
                progress : false ,
            }
        })
        if (!transaction.id) {
            throw new Error("the transaction does not exist");
        } 
        // now we will transfer the money 
        const data = await transferMoney(accountNumber , transferee , amount);
        if (data?.success == true) {
            // if the monmey has been send successfully then th progress is true means done 
            await prisma.transaction.update({
                where : {id : transaction.id} ,
                data : {progress : true}
            })
            return data ;
        } else {
            // if the trasaction failed it still checks the balance and then this is a whole spectrum of error need to be thouh of in this case 
            const userBalance = await BalanceMoney(parseInt(accountNumber));
            return {
                success : false ,
                message : "Trasaction failed",
                balance : userBalance?.balance ,
            }
        }
    } catch (error) {
        throw new Error("Error while creating transaction" + error);
    }
    
}  

export async function transferMoney (accountNumber:string , transferee:string , amount:number) {
    try {
        const transaction = await prisma.$transaction([
            prisma.user.update({
                where : {accountNumber },
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