import { JsonServerCustomerRepository } from "../../respositories/implementations/jsonServer/JsonServerCustomerRepository";
import { CreateCustomerController } from "../../useCase/costumer/create/create.costumer.controller";
import { CustomerUseCase } from "../../useCase/costumer/create/create.costumer.useCase";

export function makeCreateCustomerController() {
  const customerRepository = new JsonServerCustomerRepository()
  const createCustomerUseCase = new CustomerUseCase(customerRepository, customerRepository)
  const controller = new CreateCustomerController(createCustomerUseCase);

  return controller
}