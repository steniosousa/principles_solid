import { Service } from "../../../entities/service";

export interface UpdateService {
    update(service: Service): Promise<null>
}