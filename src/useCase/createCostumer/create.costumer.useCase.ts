import { Costumer } from "../../entities/costumer";
import { costumerRepository } from "../../repositories/costumer.repository";
import { createCostumerDto } from "./create.costumer.dto";

export class costumerUseCase {
    constructor(
        private costumerRepository: costumerRepository
    ) { }

    async execute(data: createCostumerDto) {
        const costumerExist = await this.costumerRepository.findByEmail(data.email)
        
        if (costumerExist) {
            throw new Error('Costumer exists')
        }

        const costumer = new Costumer(data)

        await this.costumerRepository.save(costumer)
    }
}