import {  Response } from "express";
import { listUseCase } from './useCase'

export class listServicesController {
    constructor(private readonly service: listUseCase) { }
    async execute(req: any, res: Response) {
        try {
            const id = req.body.id ? req.body.id : req.user.id
            const list = await this.service.list(id)
            res.status(200).json(list)
        }
        catch (error) {
            let errorMessage = "Failed to do something exceptional";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            res.status(400).json(errorMessage)
        }
    }
}