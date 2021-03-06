import  IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import "reflect-metadata";
import {injectable, inject} from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
//  import {getDaysInMonth, getDate} from 'date-fns';

interface IRequest{
    provider_id: string;
    month: number;
    day: number;
    year: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository : IAppoinmentsRepository,
    ) {}

    public async execute ({provider_id, day, month, year} : IRequest) : Promise<IResponse> {
        const appointments  = await this.appointmentsRepository.findAllInDayFromProvider( {
            provider_id,month, year, day,
        });

        const hourStart = 8;

        const eachHourArray = Array.from (
            {length: 10},
            (_, index) => index + hourStart,

        );
        const currentDate= new Date(Date.now())

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHour = appointments.find(appointment =>
                getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);
            return {
                hour,
                available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
            }
        });
        return availability;

    };

}

