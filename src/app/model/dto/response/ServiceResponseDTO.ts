import { Situation } from "../../enum/Situation";
import { UnitMeasure } from "../../enum/UnitMeasure";

export class ServiceResponseDTO{
    id: number;
    name: string;
    value: number;
    unitMeasure: UnitMeasure;
    situation: Situation;
}