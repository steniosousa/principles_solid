import { Customer } from "../../../entities/costumer"
import { FindByEmailRepositories } from "../../contracts/costumer/FindByEmail.repository"
import { SaveCustomer } from "../../contracts/costumer/SaveCustomer.repository"

export class InMemoryCustomerRepository implements FindByEmailRepositories, SaveCustomer {
  private customers: Customer[]
  constructor() {
    this.customers = []
  }

  async findByEmail(email: string): Promise<Customer> {
    const customer = this.customers.find((item) => item.email == email)
  
    return customer ?? null
  }

  async save(data: Customer): Promise<void> {
    this.customers.push(data)
  }
}