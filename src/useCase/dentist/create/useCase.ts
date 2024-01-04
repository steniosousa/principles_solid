import { findByEmail } from "../../../respositories/contracts/dentist/findByEmail";
import { createDentist } from "../../../respositories/contracts/dentist/create";
import { findClinicById } from "../../../respositories/contracts/clinic/findById";
import { findRoom } from "../../../respositories/contracts/clinic/findRoom";

export class useCase {
    constructor(
        private readonly findByEmailDentist: findByEmail,
        private readonly createDentist: createDentist,
        private readonly findClinicById: findClinicById,
        private readonly ifindRoom: findRoom
    ) { }

    async execute(email: string, room: number, req: any) {
        try {
            const dentistAlreadyExist = await this.findByEmailDentist.findDentis(email)
            if (dentistAlreadyExist) throw new Error('Profissional já registrado')

            const foundClinic = await this.findClinicById.find(req.user.id)
            if (!foundClinic) throw new Error('Clinica não existe')

            const findRoomInUse = await this.ifindRoom.findRoom(room, req.user.id)
            if (findRoomInUse) throw new Error("Sala já preenchida")
            const numberRandom = Math.random() * 1000
            const createDentist = await this.createDentist.create({
                clinicId: req.user.id,
                email,
                room,
                password: foundClinic.cnpj,
                name: `Usuário ${numberRandom.toFixed(0)} `,
                firstAccess: true
            })

            return createDentist

        } catch (error: unknown) {

            let message = "Unable to create professional"
            if (error instanceof Error) {
                message = error.message
            }
            throw new Error(message)
        }
    }
}