import axios from "axios";
import { Clinic } from "../../../entities/clinic";
import { List } from "../../contracts/clinic/list";

export class ListClinics implements List{
    async list(): Promise<Clinic[]> {
        const response = await axios.get(`${process.env.DATABASE_JSON_SERVER}/Clinic/`)
        const allClinics:Clinic[] = response.data
        return allClinics
    }


}