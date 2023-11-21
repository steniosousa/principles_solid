import { Service } from "../../../entities/service";

export interface FindService {
    findService(service: Service, clinicId:string): Promise<Service>
}