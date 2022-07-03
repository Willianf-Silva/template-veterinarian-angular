import { Status } from "../../enum/Status";
import { ClientResponseDTO } from "./ClientResponseDTO";
import { ItemServiceResponseDTO } from "./ItemServiceResponseDTO";

export class AppointmentResponseDTO{
    id: number;
    date: Date;
    total: number;
    status: Status;
    itemService: Set<ItemServiceResponseDTO>;
    client: ClientResponseDTO;
}