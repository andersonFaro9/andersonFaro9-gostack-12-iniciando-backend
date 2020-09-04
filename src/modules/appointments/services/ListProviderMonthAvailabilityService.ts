import "reflect-metadata";
import  IAppoinmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

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

    public async execute ({provider_id, month, year} : IRequest) : Promise<IResponse> {
        const appointments = await this.appoinmentsRepository.findAllInMonthFromProvider({
            provider_id,
            year,
            month,
        })


        console.log(appointments);
        // const numberOfDaysInMonth = getDaysInMonth(new Date (year, month - 1));

        // const eachDayArray =  Array.from(
        //     {length: numberOfDaysInMonth},
        //     (_, index) =>index + 1,
        // );


        // const availability = eachDayArray.map ( day =>  {
        //         const appointmentsInDay = appointments.filter(appointment => {
        //             return getDate(appointment.date) === day;
        //         });
        //         return {
        //             day,
        //             available: appointmentsInDay.length < 10,
        //         };


        // });

        return [{day: 1, available: false}];

    }

}
