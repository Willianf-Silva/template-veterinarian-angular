import { AppointmentResponseDTO } from "./AppointmentResponseDTO";

export class CalendarResponseDTO{
    id: number;
    appointments: Set<AppointmentResponseDTO>;
}