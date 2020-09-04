import  IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import "reflect-metadata";
import {injectable, inject} from 'tsyringe';
import {getDaysInMonth, getDate} from 'date-fns';

interface IRequest{
    provider_id: string;
    month: number;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
    constructor(
        @inject('AppoinmentsRepository')
        private appoinmentsRepository : IAppoinmentsRepository,
    ) {

    }

    public async execute ({provider_id,month, year} : IRequest) : Promise<IResponse> {
        const appointments = await this.appoinmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        })
        const numberOfDaysInMonth = getDaysInMonth(new Date (year, month - 1));

        const eachDayArray =  Array.from(
            {length: numberOfDaysInMonth},
            (_, index) =>index + 1,
        );

        console.log(eachDayArray);

        const availability = eachDayArray.map ( day =>  {
                const appointmentsInDay = appointments.filter(appointment => {
                    return getDate(appointment.date) === day;
                });
                return {
                    day,
                    available: appointmentsInDay.length < 10,
                };


        });

        return availability;

    }

}