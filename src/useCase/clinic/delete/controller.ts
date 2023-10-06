import { Request, Response } from "express";
import { useCase } from "./useCase";

export class Controller {
    constructor(private readonly iUseCase: useCase) { }

    async execute(req:Request,res:Response) {
        try{
            await this.iUseCase.execute(req.body.id)
            res.status(200).send('')
        }catch{
            res.status(400).send('Failure to delete clinic ')
        }
    }
}