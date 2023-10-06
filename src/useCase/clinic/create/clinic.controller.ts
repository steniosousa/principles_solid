import { Request, Response } from "express";
import { ClinicUseCase } from "./clinic.useCase";

export class clinicController {
    constructor(private readonly iClinicUseCase:ClinicUseCase){}
    
    async execute(req:Request,res:Response){
        try{
            const sucess = await this.iClinicUseCase.execute(req)
            res.status(200).send(sucess)
        }catch{
            res.status(400).send('Unable to register the clinic')
        }

    }
}