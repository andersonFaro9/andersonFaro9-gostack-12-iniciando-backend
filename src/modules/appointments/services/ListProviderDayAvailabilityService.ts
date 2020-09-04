import  IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import "reflect-metadata";
import {injectable, inject} from 'tsyringe';
import { getHours } from 'date-fns';
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
        @inject('AppoinmentsRepository')
        private appoinmentsRepository : IAppoinmentsRepository,
    ) {}

    public async execute ({provider_id,month, year, day} : IRequest) : Promise<IResponse> {
        const appointments  = await this.appoinmentsRepository.findAllInDayFromProvider( {
            provider_id,month, year, day
        });

        const hourStart = 8;

        const eachHourArray = Array.from (
            {length: 10},
            (_, index) => index + hourStart,

        );
        const availability = eachHourArray.map(hour => {
            const hasAppointmentHour = appointments.find(appointment =>
                getHours(appointment.date) === hour,
            );
            return {
                hour,
                available: !hasAppointmentHour,
            }
        });
        return availability;

    };

}

