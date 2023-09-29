import { Router } from 'express'
import { makeCreateCustomerController } from './factories/customer/makeCreateCustomerController'

const routes = Router()

const customerController = makeCreateCustomerController()
routes.post('/customer', (req, res) => customerController.execute(req, res))

export { routes }