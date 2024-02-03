import { Request } from "express";
import { findClinicById } from "../../../respositories/contracts/clinic/findById";
import { updateClinic } from "../../../respositories/contracts/clinic/update";

export class useCase {
    constructor(
        private readonly iFindById: findClinicById,
        private readonly iupdateClinic: updateClinic
    ) { }

    async execute(req: Request) {
        const { id } = req.body
        try {
            for (const chave in req.body) {
                if (req.body[`${chave}`] == '') {
                    delete req.body[`${chave}`]
                }
            }
            const clinicFound = await this.iFindById.find(id)
            if (!clinicFound) throw new Error("Clínica não encontrada")

            await this.iupdateClinic.update(req.body)

        } catch (error: unknown) {
            let message = 'Falha ao atualizar clínica'
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}