import { Router } from 'express'
import { CreateCostumerController } from '../useCase/createCostumer/create.costumer.controller'

const routes = Router()

const createCostumer = new CreateCostumerController()

type errorProps = {
    message:string
}
routes.get('/costumer', async (req: any, res) => {
    const { clinicId, name, password, email, phone } = req
    try {
        await createCostumer.handle({
            clinicId,
            email,
            name, password, phone
        })
        res.status(200).send()
    } catch (err) {
        const typeError = err as Error
        res.status(400).send(typeError.message)

    }
})

export { routes }