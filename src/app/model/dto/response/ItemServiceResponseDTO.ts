import { ServiceResponseDTO } from "./ServiceResponseDTO";

export class ItemServiceResponseDTO{
    id: number;
    quantity: number;
    sum: number;
    service: ServiceResponseDTO;
}