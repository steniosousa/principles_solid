import axios from "axios";
import { FindById } from "../../contracts/customer/customer.FindById";
import { prisma } from "../../prisma/prisma.service";

export class CustomerDeletion implements FindById {
  async Find(customerId: string): Promise<void> {
    try {
      await prisma.customers.delete({
        where: {
          id: customerId
        }
      })
    } catch (error) {
      let message
      if (error instanceof Error) {
        message = error.message
      }
      throw new Error(message)
    }
  }
}