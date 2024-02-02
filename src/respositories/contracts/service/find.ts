import { Service } from "../../../entities/service";

export interface FindService {
    findService(name: string, clinicId:string): Promise<Service>
}