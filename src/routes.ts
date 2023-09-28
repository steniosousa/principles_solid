import { Router } from 'express'
import { CreateCustomerController } from './useCase/costumer/create/create.costumer.controller'

const routes = Router()

const createCustomer = new CreateCustomerController()
routes.get('/customer',createCustomer.execute)

export { routes }