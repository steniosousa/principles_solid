import { Router } from 'express'
import { CreateCustomerController } from './useCase/costumer/create/create.costumer.controller'

const routes = Router()

const createCustomer = new CreateCustomerController()
routes.post('/customer',createCustomer.execute)

export { routes }