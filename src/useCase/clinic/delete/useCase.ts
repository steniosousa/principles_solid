import { deleteClinic } from "../../../respositories/contracts/clinic/delete";
import { findById } from "../../../respositories/contracts/clinic/findById";

export class useCase {
    constructor(
        private readonly ifindById: findById,
        private readonly ideleteClinic:deleteClinic
        ) { }

    async execute(req: any) {
        try {
            const { id } = req.body
            const findClinic = await this.ifindById.find(id)
            if (!findClinic) throw new Error('Clinic not found')
           
            await this.ideleteClinic.delete(id)
        }
        catch (error) {
            console.log(error)
        }
    }
}