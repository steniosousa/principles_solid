import { Request } from "express";
import { findById } from "../../../respositories/contracts/clinic/findById";
import { updateClinic } from "../../../respositories/contracts/clinic/update";
import { Clinic } from "../../../entities/clinic";

export class useCase {
    constructor(
        private readonly iFindById: findById,
        private readonly iupdateClinic: updateClinic
    ) { }

    async execute(req: Request) {
        const { id } = req.body
        try {
            const clinicFound = await this.iFindById.find(id)
            if (!clinicFound) throw new Error("Clinic not found")
           
            await this.iupdateClinic.update(req.body)

        } catch (error: unknown) {
            let message = 'Failed to update clinic'
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}