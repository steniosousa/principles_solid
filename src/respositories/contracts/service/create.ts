import { Service } from "../../../entities/service";

export interface CreateService {
    createService(service: Service, ClinicId: string): Promise<Service>
}