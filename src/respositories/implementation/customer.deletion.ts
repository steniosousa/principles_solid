import axios from "axios";
import { FindById } from "../contracts/costumer/customer.FindById";

export class CustomerDeletion implements FindById{
    async Find(customerId: string): Promise<void> {
      const chose = await axios.delete(`${process.env.DATABASE_JSON_SERVER}/Customers/${customerId}`)
    }
}