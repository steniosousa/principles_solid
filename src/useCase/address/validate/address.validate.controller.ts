import { Request, Response } from "express";
import { addressValidateUseCase } from "./address.validate.useCase";

export class addressValidadeController {
    constructor(private readonly iUseCase:addressValidateUseCase){}

    async execute(req:Request,res:Response){
        try{
            const cep = await this.iUseCase.execute(req.body.cep)
            res.status(200).send(cep)
        }catch{
            res.status(400).send('CEP not found')
        }

    }
}