
import axios from 'axios';
import { FindByEmailRepositories } from '../../contracts/costumer/FindByEmail.repository';
import { SaveCustomer } from '../../contracts/costumer/SaveCustomer.repository';
import { Customer } from '../../../entities/costumer';

export class JsonServerCustomerRepository implements FindByEmailRepositories, SaveCustomer {
  async findByEmail(email: string): Promise<Customer> {
    const response = await axios.get(`http://localhost:3000/Customers?email=${email}`)
    const customerJson = response.data[0]
    if(!customerJson) return null

    const customer = new Customer({
      email: customerJson.email,
      name: customerJson.name,
      password: customerJson.password,
      phone: customerJson.phone,
      clinicId: customerJson.clinicId,
    }, customerJson.id)

    return customer
  }

  async save(customer: Customer): Promise<void> {
    await axios.post('http://localhost:3000/Customers', {
      id: customer.id,
      clinicId: customer.clinicId,
      email: customer.email,
      name: customer.name,
      password: customer.password,
      phone: customer.phone,
    })
  }
}