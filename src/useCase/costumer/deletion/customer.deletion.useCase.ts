import { Request, Response } from "express";
import { FindById } from "../../../respositories/contracts/costumer/customer.FindById";

export class CustomerDeletionUseCase {
    constructor(private readonly findById:FindById){}

    async execute(userId:String){
        try{
            await this.findById.Find(userId as string)

        }catch(error){
            console.log(userId)
        }
    }
}