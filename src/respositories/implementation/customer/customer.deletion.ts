import axios from "axios";
import { FindById } from "../../contracts/customer/customer.FindById";

export class CustomerDeletion implements FindById  {
  async Find(customerId: string): Promise<void> {
    await axios.delete(`${process.env.DATABASE_JSON_SERVER}/Customers/${customerId}`)
  }
}